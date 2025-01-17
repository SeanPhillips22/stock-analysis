import { useEvent } from 'hooks/useEvent'
import Link from 'next/link'
import { FooterOptin } from './FooterOptin'

const navigation = {
	sections: [
		{ name: 'Stocks', href: '/stocks/' },
		{ name: 'IPOs', href: '/ipos/' },
		{ name: 'ETFs', href: '/etf/' }
	],
	company: [
		{ name: 'About', href: '/about/' },
		{ name: 'Sitemap', href: '/sitemap/' }
	],
	legal: [
		{ name: 'Privacy Policy', href: '/privacy-policy/' },
		{ name: 'Terms of Use', href: '/terms-of-use/' },
		{ name: 'Data Disclaimer', href: '/data-disclaimer/' }
	]
}

export function Footer() {
	const { event } = useEvent()

	return (
		<>
			<footer className="clear-both bg-gray-800">
				<div className="mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-8 lg:pt-16 lg:pb-8">
					<div className="xl:grid xl:grid-cols-3 xl:gap-8">
						<div className="grid grid-cols-2 gap-8 xl:col-span-2">
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Sections</h4>
									<ul className="mt-4 space-y-4">
										{navigation.sections.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">{item.name}</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h4>
									<ul className="mt-4 space-y-4">
										<li>
											<Link href="/contact/" prefetch={false}>
												<a className="text-base text-gray-300 hover:text-white">Contact Us</a>
											</Link>
										</li>
										<li>
											<Link href="/login/" prefetch={false}>
												<a className="text-base text-gray-300 hover:text-white">Login</a>
											</Link>
										</li>
										<li>
											<Link href="/pro/" prefetch={false}>
												<a
													className="text-base text-gray-300 hover:text-white"
													onClick={() => event('Free_Trial_Click', { location: 'Footer_Links' })}
												>
													Free Trial
												</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="md:grid md:grid-cols-2 md:gap-8">
								<div>
									<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h4>
									<ul className="mt-4 space-y-4">
										{navigation.company.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">{item.name}</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className="mt-12 md:mt-0">
									<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h4>
									<ul className="mt-4 space-y-4">
										{navigation.legal.map(item => (
											<li key={item.name}>
												<Link href={item.href} prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">{item.name}</a>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<FooterOptin />
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
								onClick={() => event('Social_Media_Click', { type: 'Facebook' })}
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="pointer-events-none h-8 w-8"
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
								onClick={() => event('Social_Media_Click', { type: 'Twitter' })}
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="pointer-events-none h-8 w-8"
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
								onClick={() => event('Social_Media_Click', { type: 'Github' })}
							>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									className="pointer-events-none h-8 w-8"
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
						<p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
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
