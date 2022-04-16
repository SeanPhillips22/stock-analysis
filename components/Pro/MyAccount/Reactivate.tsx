import { useEffect } from 'react'
import { supabase } from 'auth/supabase/supabase'
import { formatDateToString } from 'functions/datetime/formatDateToString'
import { useAuth } from 'auth/useAuth'
import { useRouter } from 'next/router'
import { useEvent } from 'hooks/useEvent'

type Props = {
	email: string
	status: string | undefined
}

export function ReActivate({ email, status }: Props) {
	const { isPro, setIsPro } = useAuth()
	const { event } = useEvent()
	const router = useRouter()

	// Append the Paddle script to the page
	useEffect(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			window.Paddle.Setup({ vendor: 128917 })
		}
	}, [])

	// The new status to set after successful checkout
	// If previously active, set to active
	// If no previous subscription, set to trialing
	let newStatus = status && ['deleted', 'cancelled', 'paused'].includes(status) ? 'active' : 'trialing'

	// This function is called after a successful checkout
	// It updates the user's info in the database and re-enables
	// pro access. Then it redirects to the confirmation page.
	async function upgradeComplete(data: any) {
		if (data.user.email && data.user.email === email) {
			await supabase.auth.update({
				data: {
					email: data?.user?.email,
					status: newStatus,
					plan: data?.product?.name,
					currency: data?.checkout?.recurring_prices?.customer?.currency,
					unit_price: data?.checkout?.recurring_prices?.customer?.unit,
					country: data?.user?.country,
					registered_date: formatDateToString()
				}
			})

			setIsPro(true)
			router.push('/pro/confirmation/', undefined, { shallow: true })
		} else {
			// If user changes their email during checkout, then we need to create a new user
			// so that the webhook data from Paddle gets saved and the user can then login
			// with the new email
			await supabase.auth.signUp(
				{
					email: data.user.email,
					password: Math.random().toString(36).substr(2, 10)
				},
				{
					data: {
						email: data?.user?.email,
						status: newStatus,
						plan: data?.product?.name,
						currency: data?.checkout?.recurring_prices?.customer?.currency,
						unit_price: data?.checkout?.recurring_prices?.customer?.unit,
						country: data?.user?.country,
						registered_date: formatDateToString()
					}
				}
			)

			setIsPro(true)
			router.push('/pro/confirmation/', undefined, { shallow: true })
		}
	}

	if (!status) {
		return (
			<div>
				<p>There is no active subscription on this account.</p>
				<div
					className="bll cursor-pointer font-medium"
					onClick={() => {
						window.Paddle.Checkout.open({
							product: 649892,
							email: email,
							successCallback: upgradeComplete
						})
						event('Checkout', { type: 'Reactivate_No_Active_Subscription' })
					}}
				>
					Start your free 30-day trial now.
				</div>
			</div>
		)
	}

	if (['deleted', 'cancelled', 'paused'].includes(status) && !isPro) {
		return (
			<div
				className="bll cursor-pointer font-medium"
				onClick={() => {
					window.Paddle.Checkout.open({
						product: 747289,
						email: email,
						successCallback: upgradeComplete
					})
					event('Checkout', { type: 'Reactivate_Previously_Cancelled' })
				}}
			>
				Reactivate your Stock Analysis Pro subscription.
			</div>
		)
	}

	return null
}
