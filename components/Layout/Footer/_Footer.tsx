import Link from 'next/link'

const navigation = {
	sections: [
		{ name: 'Stocks', href: '/stocks/' },
		{ name: 'IPOs', href: '/ipos/' },
		{ name: 'ETFs', href: '/etf/' }
	],
	company: [
		{ name: 'About', href: '/about/' },
		{ name: 'Sitemap', href: '/sitemap/' },
		{ name: 'APIs & Data', href: '/apis/' }
	],
	legal: [
		{ name: 'Privacy Policy', href: '/privacy-policy/' },
		{ name: 'Terms of Use', href: '/terms-of-use/' },
		{ name: 'Data Disclaimer', href: '/data-disclaimer/' }
	]
}

export const Footer = () => {
	return (
		<>
			<footer className="bg-gray-800 clear-both">
				<div className="max-w-7xl mx-auto pt-12 px-5 sm:px-6 lg:pt-16 lg:pb-8 lg:px-8">
					<div className="xl:grid xl:grid-cols-3 xl:gap-8">
						<div className="grid grid-cols-2 gap-8 xl:col-span-2">
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
										Sections
									</h4>
									<ul className="mt-4 space-y-4">
										{navigation.sections.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">
														{item.name}
													</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
										Support
									</h4>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href="/contact/" prefetch={false}>
												<a className="text-base text-gray-300 hover:text-white">
													Contact Us
												</a>
											</Link>
										</li>
										<li>
											<Link href="/login/" prefetch={false}>
												<a className="text-base text-gray-300 hover:text-white">
													Login
												</a>
											</Link>
										</li>
										<li>
											<Link href="/pro/" prefetch={false}>
												<a className="text-base text-gray-300 hover:text-white">
													Free Trial
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
										Company
									</h4>
									<ul className="mt-4 space-y-4">
										{navigation.company.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">
														{item.name}
													</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
										Legal
									</h4>
									<ul className="mt-4 space-y-4">
										{navigation.legal.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">
														{item.name}
													</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="mt-8 xl:mt-0">
							<h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
								Subscribe to the newsletter
							</h4>
							<p className="mt-4 text-base text-gray-300">
								The latest updates, straight to your inbox.
							</p>
							<form
								className="mt-4 sm:flex sm:max-w-md"
								method="post"
								acceptCharset="UTF-8"
								action="https://www.aweber.com/scripts/addlead.pl"
							>
								<input
									type="hidden"
									name="meta_web_form_id"
									value="734113215"
								/>
								<input
									type="hidden"
									name="listname"
									value="awlist5254312"
								/>
								<input
									type="hidden"
									name="redirect"
									value="https://stockanalysis.com/subscribe/thank-you/"
									id="redirect_756a76620e2e180d07c2981f91a5fa1e"
								/>
								<input
									type="hidden"
									name="meta_adtracking"
									value="Footer"
								/>
								<label htmlFor="email-footer" className="sr-only">
									Email address
								</label>
								<input
									type="email"
									name="email"
									id="email-footer"
									autoComplete="email"
									className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
									placeholder="Enter your email"
								/>
								<div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
									<input
										name="submit"
										type="submit"
										className="w-full bg-blue-brand_light border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-brand_sharp transition duration-200 cursor-pointer"
										value="Subscribe"
									/>
								</div>
							</form>
						</div>
					</div>
					<div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
						<div className="flex space-x-6 md:order-2">
							<a
								href="https://www.facebook.com/stockanalysisoff/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-gray-300"
								id="tag-social-footer-facebook"
								aria-label="Follow on Facebook"
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="h-8 w-8 pointer-events-none"
									aria-hidden="true"
									style={{ maxWidth: '40px' }}
								>
									<path
										fillRule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
							<a
								href="https://twitter.com/stock_analysisx"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-gray-300"
								id="tag-social-footer-twitter"
								aria-label="Follow on Twitter"
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="h-8 w-8 pointer-events-none"
									aria-hidden="true"
									style={{ maxWidth: '40px' }}
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a
								href="https://github.com/stockanalysisdev"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-gray-300"
								id="tag-social-footer-github"
								aria-label="View our GitHub page"
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="h-8 w-8 pointer-events-none"
									aria-hidden="true"
									style={{ maxWidth: '40px' }}
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</div>
						<p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
							&copy; 2022 Stock Analysis. All rights reserved.
						</p>
					</div>
					<div className="mt-8 border-t border-gray-700 pt-8 pb-6 text-center text-sm text-gray-400">
						Real-time quotes provided by{' '}
						<a
							href="https://iexcloud.io/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-300 hover:text-white"
						>
							IEX Cloud
						</a>
						. Other market data may be delayed by 15 minutes or more.
					</div>
				</div>
			</footer>
		</>
	)
}
