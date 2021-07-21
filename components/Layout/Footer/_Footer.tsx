/* eslint-disable react/display-name */
import { useUserInfo } from 'hooks/useUserInfo';
import Link from 'next/link';

interface IconProps {
	className: string;
}

const navigation = {
	sections: [
		{ name: 'Stocks', href: '/stocks/' },
		{ name: 'IPOs', href: '/ipos/' },
		{ name: 'ETFs', href: '/etf/' },
	],
	company: [
		{ name: 'About', href: '/about/' },
		{ name: 'Archives', href: '/archives/' },
	],
	legal: [
		{ name: 'Privacy Policy', href: '/privacy-policy/' },
		{ name: 'Terms of Use', href: '/terms-of-use/' },
		{ name: 'Data Disclaimer', href: '/data-disclaimer/' },
	],
	social: [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/stockanalysisoff/',
			icon: (props: IconProps) => (
				<svg
					fill="currentColor"
					viewBox="0 0 24 24"
					{...props}
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: 'Twitter',
			href: 'https://twitter.com/stock_analysisx',
			icon: (props: IconProps) => (
				<svg
					fill="currentColor"
					viewBox="0 0 24 24"
					{...props}
					aria-hidden="true"
				>
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			),
		},
		{
			name: 'GitHub',
			href: 'https://github.com/stockanalysisdev',
			icon: (props: IconProps) => (
				<svg
					fill="currentColor"
					viewBox="0 0 24 24"
					{...props}
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
	],
};

export const Footer = () => {
	const { isLoggedIn } = useUserInfo();

	return (
		<footer
			className="bg-gray-800 clear-both"
			aria-labelledby="footerHeading"
		>
			<h2 id="footerHeading" className="sr-only">
				Footer
			</h2>
			<div className="max-w-7xl mx-auto pt-12 px-5 sm:px-6 lg:pt-16 lg:pb-8 lg:px-8">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="grid grid-cols-2 gap-8 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
									Sections
								</h3>
								<ul className="mt-4 space-y-4">
									{navigation.sections.map((item) => (
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
								<h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
									Support
								</h3>
								<ul className="mt-4 space-y-4">
									<li>
										<Link href="/contact/" prefetch={false}>
											<a className="text-base text-gray-300 hover:text-white">
												Contact
											</a>
										</Link>
									</li>
									{isLoggedIn ? (
										<>
											<li>
												<Link href="/login/" prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">
														Log out
													</a>
												</Link>
											</li>
											<li>
												<Link href="/my-account/" prefetch={false}>
													<a className="text-base text-gray-300 hover:text-white">
														My Account
													</a>
												</Link>
											</li>
										</>
									) : (
										<>
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
										</>
									)}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
									Company
								</h3>
								<ul className="mt-4 space-y-4">
									{navigation.company.map((item) => (
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
								<h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
									Legal
								</h3>
								<ul className="mt-4 space-y-4">
									{navigation.legal.map((item) => (
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
						<h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
							Subscribe to the newsletter
						</h3>
						<p className="mt-4 text-base text-gray-300">
							The latest updates, straight to your inbox.
						</p>
						<form className="mt-4 sm:flex sm:max-w-md">
							<label htmlFor="emailAddress" className="sr-only">
								Email address
							</label>
							<input
								type="email"
								name="emailAddress"
								id="emailAddress"
								autoComplete="email"
								required
								className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
								placeholder="Enter your email"
							/>
							<div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
								<button
									type="submit"
									className="w-full bg-blue-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
								>
									Subscribe
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
					<div className="flex space-x-6 md:order-2">
						{navigation.social.map((item) => (
							<a
								key={item.name}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-gray-300"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon className="h-8 w-8" />
							</a>
						))}
					</div>
					<p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
						&copy; 2021 Stock Analysis. All rights reserved.
					</p>
				</div>
				<div className="mt-8 border-t border-gray-700 pt-8 pb-6 text-center text-sm text-gray-400">
					Real-time quotes provided by IEX Cloud. Other market data is
					delayed by at least 15 minutes.
				</div>
			</div>
		</footer>
	);
};