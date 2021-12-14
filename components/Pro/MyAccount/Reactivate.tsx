import { useEffect } from 'react'
import { supabase } from 'functions/supabase'
import { formatDateToString } from 'functions/datetime/formatDateToString'
import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'

type Props = {
	email: string
	status: string | undefined
}

export function ReActivate({ email, status }: Props) {
	const { isPro, setIsPro } = useAuth()
	const router = useRouter()

	useEffect(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			window.Paddle.Setup({ vendor: 128917 })
		}
	}, [])

	async function upgradeComplete(data: any) {
		if (data.user.email && data.user.email === email) {
			await supabase.auth.update({
				data: {
					email: data?.user?.email,
					status: 'trialing',
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
			await supabase.auth.signUp(
				{
					email: data.user.email,
					password: Math.random().toString(36).substr(2, 10)
				},
				{
					data: {
						email: data?.user?.email,
						status: 'trialing',
						plan: data?.product?.name,
						currency:
							data?.checkout?.recurring_prices?.customer?.currency,
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
					className="bll font-medium cursor-pointer"
					onClick={() => {
						window.Paddle.Checkout.open({
							product: 649892,
							email: email,
							successCallback: upgradeComplete
						})
					}}
				>
					Start your free 30-day trial now.
				</div>
			</div>
		)
	}

	if (status === 'deleted' && !isPro) {
		return (
			<div>
				<p>Your subscription has been cancelled.</p>
				<div
					className="bll font-medium cursor-pointer"
					onClick={() => {
						window.Paddle.Checkout.open({
							product: 747289,
							email: email,
							successCallback: upgradeComplete
						})
					}}
				>
					Reactivate your Stock Analysis Pro subscription.
				</div>
			</div>
		)
	}

	return null
}
