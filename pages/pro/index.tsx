import { SEO } from 'components/SEO'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from 'functions/supabase'
import { formatDateToString } from 'functions/datetime/formatDateToString'
import { FocusedLayout } from 'components/Layout/FocusedLayout'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		Paddle: any
	}
}

export default function LandingPage() {
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
				title="Stock Analysis Pro: Free 30-Day Trial"
				description="Get unlimited access to all of our financial data, including full financial history, full ETF holdings, and more."
				canonical="/pro/"
			/>
			<FocusedLayout hideTrial={true} url="/pro/">
				<header className="bg-gray-100 py-12 md:py-32 border-b border-gray-200 shadow-sm px-4 landscape:border-t-2 landscape:md:border-t-0">
					<div className="max-w-[850px] mx-auto text-center px-6 sm:px-0">
						<h1 className="text-3xl xs:text-4xl sm:text-[60px] font-bold mb-5 text-gray-800">
							Stock Analysis Pro
						</h1>

						<p className="text-lg sm:text-[21px] text-gray-900 leading-relaxed">
							Get unlimited access to all of our financial data while
							getting rid of ads and helping to support our mission of
							making the world&apos;s best investing website.
						</p>
					</div>
				</header>

				<section className="max-w-screen-md mx-auto sm:flex flex-row justify-around mt-[-20px] md:mt-[-65px]">
					<div className="bg-white mx-auto w-[90%] sm:max-w-[44%]">
						<table className="border border-gray-200 w-full">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="text-left p-3 sm:px-4 text-xl">
										Pro
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Free for 30 days, then $9.99 a month. Cancel
										anytime.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Unlimited access to all available data.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Unlimited exports to excel and csv files.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Financial history: Up to 30 years and growing.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Full access to ETF holdings.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Full corporate actions data.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										More features coming soon.
									</td>
								</tr>
								<tr>
									<td className="p-3 sm:px-4 text-lg">No ads.</td>
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
											}}
											id="start-trial"
											className="block w-full p-4 text-2xl bg-blue-brand_light hover:bg-blue-brand_sharp text-white text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										>
											Start Free Trial
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="bg-white mx-auto w-[90%] sm:max-w-[44%] mt-14 sm:mt-0">
						<table className="border border-gray-200 w-full">
							<thead>
								<tr className="border-b border-gray-200">
									<th className="text-left p-3 sm:px-4 text-xl">
										Free
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										No registration required.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Limited financial history.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Limited ETF holdings.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Limited corporate actions.
									</td>
								</tr>
								<tr className="border-b border-gray-200">
									<td className="p-3 sm:px-4 text-lg">
										Ad supported.
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section className="bg-gray-100 mt-16 sm:mt-24 py-8 md:py-10 border-t border-gray-200 px-5">
					<div className="max-w-[750px] mx-auto">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-5">
							Common Questions
						</h2>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							How to sign up
						</h3>

						<p className="text-lg mb-5">
							Click &quot;Start Free Trial&quot; above and enter your
							details. Then you will get access right away.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							How to get support?
						</h3>

						<p className="text-lg mb-5">
							You can send an email directly to
							support@stockanalysis.com. You can also go to the contact
							page and send a message via the form.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							Can I cancel at any time?
						</h3>

						<p className="text-lg mb-5">
							Of course. There is a &quot;Cancel subscription&quot;
							button in the my account area that you get access to after
							signing up. You can also send us a message and we will
							cancel for you.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							Will my card be charged?
						</h3>

						<p className="text-lg mb-5">
							Your card will not be charged until after 30 days. If you
							cancel before the 30 days are over then you will not be
							charged at all. We will send you an email reminder a few
							days before the trial ends.
						</p>

						<h3 className="text-2xl font-bold mb-5 text-gray-800">
							What about the existing free site?
						</h3>

						<p className="text-lg mb-5">
							We plan on making the world&apos;s best <em>free</em>{' '}
							investing website, and that includes building more useful
							features. But some features and data will only be available
							to &quot;Pro&quot; accounts.
						</p>
					</div>
				</section>
			</FocusedLayout>
		</>
	)
}
