import { SEO } from 'components/SEO'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from 'auth/supabase/supabase'
import { formatDateToString } from 'functions/datetime/formatDateToString'
import { FocusedLayout } from 'components/Layout/FocusedLayout'
import { useEvent } from 'hooks/useEvent'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		Paddle: any
	}
}

export default function LandingPage() {
	const router = useRouter()
	const { event } = useEvent()

	useEffect(() => {
		const paddleJs = document.createElement('script')
		paddleJs.src = 'https://cdn.paddle.com/paddle/paddle.js'
		document.body.appendChild(paddleJs)

		paddleJs.onload = () => {
			// eslint-disable-next-line no-undef
			// eslint-disable-next-line new-cap
			window.Paddle.Setup({ vendor: 128917 })
		}
	}, [event])

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
						currency: data?.checkout?.recurring_prices?.customer?.currency,
						unit_price: data?.checkout?.recurring_prices?.customer?.unit,
						country: data?.user?.country,
						registered_date: formatDateToString()
					}
				}
			)

			event('Conversion', { type: 'Pro - Monthly' })
			router.push('/pro/confirmation/')
		}
	}

	return (
		<>
			<SEO
				title="Stock Analysis Pro: Free 30-Day Trial"
				description="Get unlimited access to all of our financial data, including full financial history, full ETF holdings, and more."
				canonical="/pro/"
			/>
			<FocusedLayout hideTrial={true} url="/pro/">
				<header className="border-b border-gray-200 bg-gray-100 py-12 px-4 shadow-sm md:py-32 landscape:border-t-2 landscape:md:border-t-0">
					<div className="mx-auto max-w-[850px] px-6 text-center sm:px-0">
						<h1 className="mb-5 text-3xl font-bold text-gray-800 xs:text-4xl sm:text-[60px]">
							Stock Analysis Pro
						</h1>

						<p className="text-lg leading-relaxed text-gray-900 sm:text-[21px]">
							Get unlimited access to all of our financial data while getting rid of ads and helping to support
							our mission of making the world&apos;s best investing website.
						</p>
					</div>
				</header>

				<section className="mx-auto mt-[-20px] max-w-screen-md flex-row justify-around sm:flex md:mt-[-65px]">
					<div className="mx-auto w-[90%] bg-white sm:max-w-[44%]">
						<table className="w-full border border-gray-200">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="p-3 text-left text-xl sm:px-4">Pro</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">
										Free for 30 days, then $9.99 a month. Cancel anytime.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Unlimited access to all available data.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Unlimited exports to excel and csv files.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Financial history: Up to 30 years and growing.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Full access to ETF holdings.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Full corporate actions data.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">More features coming soon.</td>
								</tr>
								<tr>
									<td className="p-3 text-lg sm:px-4">No ads.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-0">
										<button
											onClick={() => {
												// eslint-disable-next-line no-undef
												window.Paddle.Checkout.open({
													product: 649892,
													successCallback: checkoutComplete
												})
												event('Checkout', { type: 'Pro - Monthly' })
											}}
											id="start-trial"
											className="block w-full cursor-pointer bg-blue-brand_light p-4 text-center text-2xl text-white hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
										>
											Start Free Trial
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="mx-auto mt-14 w-[90%] bg-white sm:mt-0 sm:max-w-[44%]">
						<table className="w-full border border-gray-200">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="p-3 text-left text-xl sm:px-4">Free</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">No registration required.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Limited financial history.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Limited ETF holdings.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Limited corporate actions.</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 text-lg sm:px-4">Ad supported.</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section className="mt-16 border-t border-gray-200 bg-gray-100 py-8 px-5 sm:mt-24 md:py-10">
					<div className="mx-auto max-w-[750px]">
						<h2 className="mb-5 text-3xl font-bold text-gray-800 sm:text-4xl">Common Questions</h2>

						<h3 className="mb-5 text-2xl font-bold text-gray-800">How to sign up</h3>

						<p className="mb-5 text-lg">
							Click &quot;Start Free Trial&quot; above and enter your details. Then you will get access right
							away.
						</p>

						<h3 className="mb-5 text-2xl font-bold text-gray-800">How to get support?</h3>

						<p className="mb-5 text-lg">
							You can send an email directly to support@stockanalysis.com. You can also go to the contact page
							and send a message via the form.
						</p>

						<h3 className="mb-5 text-2xl font-bold text-gray-800">Can I cancel at any time?</h3>

						<p className="mb-5 text-lg">
							Of course. There is a &quot;Cancel subscription&quot; button in the my account area that you get
							access to after signing up. You can also send us a message and we will cancel for you.
						</p>

						<h3 className="mb-5 text-2xl font-bold text-gray-800">Will my card be charged?</h3>

						<p className="mb-5 text-lg">
							Your card will not be charged until after 30 days. If you cancel before the 30 days are over then
							you will not be charged at all. We will send you an email reminder a few days before the trial
							ends.
						</p>

						<h3 className="mb-5 text-2xl font-bold text-gray-800">What about the existing free site?</h3>

						<p className="mb-5 text-lg">
							We plan on making the world&apos;s best <em>free</em> investing website, and that includes building
							more useful features. But some features and data will only be available to &quot;Pro&quot;
							accounts.
						</p>
					</div>
				</section>
			</FocusedLayout>
		</>
	)
}
