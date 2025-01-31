import { supabase } from 'auth/supabase/supabase'
import { useAuth } from 'auth/useAuth'
import { formatDateToString } from 'functions/datetime/formatDateToString'
import { useRouter } from 'next/router'
import { UserPlans, UserStatus } from '../user.types'

/**
 * After a successful checkout, either update the current user or create a new user
 * with the payment details from Paddle. This is passed as a callback function to
 * the Paddle checkout.
 */
export function useModifyUser() {
	const { setIsPro } = useAuth()
	const router = useRouter()

	async function modifyOrCreateUser(
		data: any,
		status: UserStatus,
		plan: UserPlans,
		successUrl = '/pro/confirmation/',
		email?: string
	) {
		let oneYearLater = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
		let expiration = plan === 'Stock Analysis Pro - 1 Year Access' ? formatDateToString(oneYearLater) : null

		// If the user checked out with the same email as they are logged in with
		// Then we can just update their current details
		if (data.user.email && data.user.email === email) {
			await supabase
				.from('userdata')
				.update({
					email: data?.user?.email,
					status: status,
					plan: plan,
					currency: data?.checkout?.recurring_prices?.customer?.currency,
					unit_price: data?.checkout?.recurring_prices?.customer?.unit,
					country: data?.user?.country,
					cancelled_date: expiration // The date that the subscription should expire
				})
				.eq('email', data?.user?.email || email)

			setIsPro(true)
			router.push(successUrl, undefined, { shallow: true })
		} else {
			// If user uses a different email or changes it during checkout, then we need to create a
			// new user so that the webhook data from Paddle gets saved and the user can then login
			// with the new email
			await supabase.auth.signUp(
				{
					email: data.user.email,
					password: Math.random().toString(36).substr(2, 10)
				},
				{
					data: {
						email: data?.user?.email,
						status: status,
						plan: plan,
						currency: data?.checkout?.recurring_prices?.customer?.currency,
						unit_price: data?.checkout?.recurring_prices?.customer?.unit,
						country: data?.user?.country,
						registered_date: formatDateToString(),
						cancelled_date: expiration
					}
				}
			)

			setIsPro(true)
			router.push(successUrl, undefined, { shallow: true })
		}
	}

	return { modifyOrCreateUser }
}
