import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from 'functions/supabase'
import { formatDateToString } from 'functions/datetime/formatDateToString'

export default function FreeTrial() {
	const router = useRouter()

	useEffect(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			// eslint-disable-next-line no-undef
			// eslint-disable-next-line new-cap
			window.Paddle.Setup({ vendor: 128917 })
		}
	}, [])

	async function checkoutComplete(data: any) {
		if (data.user.email) {
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

			router.push('/pro/confirmation/')
		}
	}

	return (
		<>
			<SEO
				title="1-Year Subscription to Stock Analysis Pro"
				canonical="/pro/one-year-access/"
				noindex={true}
			/>
			<UserLayout url="/pro/confirmation/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">
						1-Year Subscription to Stock Analysis Pro
					</h1>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Use the checkout link below to purchase your 1-year
						subscription to Stock Analysis Pro.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						The price is $79.00 for the full year, just a one-time payment
						with no rebill.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						This is a 33% discount off of the full price of $9.99 per
						month.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						If you have any questions or problems, please send a message
						to support@stockanalysis.com.
					</p>
					<button
						onClick={() => {
							// eslint-disable-next-line no-undef
							window.Paddle.Checkout.open({
								product: 760591,
								successCallback: checkoutComplete
							})
						}}
						id="start-trial"
						className="block w-full cursor-pointer bg-blue-brand_light p-4 text-center text-2xl text-white hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Purchase 1-Year Subscription
					</button>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Best,
						<br />
						The Stock Analysis Team
					</p>
				</div>
			</UserLayout>
		</>
	)
}
