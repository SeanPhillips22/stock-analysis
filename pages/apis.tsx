/* eslint-disable react/no-unescaped-entities */
import { FocusedLayout } from 'components/Layout/FocusedLayout'
import { SEO } from 'components/SEO'
import Link from 'next/link'

const ExampleJSON = {
	symbol: 'GFS',
	name: 'GlobalFoundries Inc.',
	exchange: 'NASDAQ',
	ipoDate: '2021-10-28',
	ipoPriceLow: 42,
	ipoPriceHigh: 47,
	ipoPriceFinal: 47,
	sharesOffered: 55000000,
	sharesOutstanding: 534685393,
	marketCap: 25130213471,
	country: 'United States',
	sector: 'Information Technology',
	industry: 'Semiconductors & Semiconductor Equipment',
	employees: 15000,
	description:
		'GlobalFoundries is one of the world’s leading semiconductor foundries. We manufacture complex, feature-rich integrated circuits [....more text in API]',
	revenueTTM: 5191208000,
	netIncomeTTM: -1114729000,
	epsTTM: -2.085,
	peRatio: null,
	psRatio: 4.841
}

const faqs = [
	{
		question: "What's the difference between the free and paid plan?",
		answer:
			"The free plan only shows the current week's IPOs. It also shows fewer data points and the data is delayed by 1-2 hours."
	},
	{
		question: 'How often is the data updated?',
		answer:
			'The data is updated multiple times throughout the day. The free version updates in 1-2 hours while the paid plan updates in near real-time (within 10 minutes).'
	},
	{
		question: 'How to subscribe',
		answer:
			"This API is currently offered through RapidAPI, the world's biggest API marketplace. They provide the API keys and handle billing, invoicing and everything related to that."
	}
	// More questions...
]

export default function ApisPage() {
	return (
		<>
			<SEO
				title="APIs & Data"
				description="We have partnered with Rapid API to offer our comprehensive upcoming IPO calendar as an API. There are both free and paid plans available."
				canonical="/apis/"
			/>
			<FocusedLayout url="/apis/">
				<div className="border-b border-gray-200 bg-gray-100 shadow-sm">
					<div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
								IPO Calendar API
							</h1>
							<p className="mx-auto mt-6 max-w-xl text-xl text-gray-600">
								We have partnered with Rapid API to offer our
								comprehensive upcoming IPO calendar as an API. There are
								both free and paid plans available.
							</p>
							<a
								href="https://rapidapi.com/stock-analysis-stock-analysis-default/api/upcoming-ipo-calendar"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="mt-10 inline-flex max-w-sm items-center justify-center rounded-md border border-transparent bg-blue-brand_light px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
									Get started for free
								</div>
							</a>
						</div>
					</div>
				</div>
				<div>
					<div className="mx-auto max-w-xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="mt-1 text-left text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">
								Example JSON response
							</h2>
							<div className="mt-4 text-left text-xl text-gray-600">
								This shows what an individual IPO data point looks like
								in the API response.
							</div>
							<div className="mx-auto mt-5 overflow-x-auto text-left text-xl text-gray-600">
								<pre className="whitespace-pre-wrap">
									{JSON.stringify(ExampleJSON, null, 2)}
								</pre>
							</div>
						</div>
					</div>
				</div>
				<div className="border-t border-b border-gray-200 bg-gray-100 shadow-sm">
					<div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
						<div className="lg:grid lg:grid-cols-3 lg:gap-8">
							<div>
								<h2 className="text-3xl font-extrabold text-gray-900">
									Frequently asked questions
								</h2>
								<p className="mt-4 text-lg text-gray-600">
									If you have any other questions, reach out to our{' '}
									<Link href="/contact/">
										<a className="bll font-medium">
											customer support
										</a>
									</Link>{' '}
									team.
								</p>
							</div>
							<div className="mt-12 lg:col-span-2 lg:mt-0">
								<dl className="space-y-12">
									{faqs.map(faq => (
										<div key={faq.question}>
											<dt className="text-lg font-medium leading-6 text-gray-900">
												{faq.question}
											</dt>
											<dd className="mt-2 text-base text-gray-600">
												{faq.answer}
											</dd>
										</div>
									))}
								</dl>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white">
					<div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="mt-1 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
								How to get started
							</h2>
							<div className="mx-auto mt-6 max-w-xl space-y-3 text-left text-lg text-gray-700 bp:text-xl">
								<div>
									1. Go to the{' '}
									<a
										href="https://rapidapi.com/stock-analysis-stock-analysis-default/api/upcoming-ipo-calendar"
										target="_blank"
										rel="noopener noreferrer"
										className="bll"
									>
										Rapid API
									</a>{' '}
									website.
								</div>
								<div>2. Click "Test Endpoint".</div>
								<div>3. Follow the steps to create an account.</div>
								<div>
									4. Click "Subscribe to Test" to start working with
									the API.
								</div>
							</div>
						</div>
					</div>
				</div>
			</FocusedLayout>
		</>
	)
}
