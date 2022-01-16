import Link from 'next/link'
import { SiteSearch } from 'components/Search/SiteSearch'

type Trending = {
	s: string
	n: string
	t: string
}

export function Hero({ trending }: { trending: Trending[] }) {
	return (
		<>
			<section className="bg-gray-100 py-12 border-b border-gray-200 shadow-sm px-4 landscape:border-t-2 landscape:md:border-t-0 md:py-24 lg:py-40">
				<div className="mx-auto max-w-[850px] text-center">
					<h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-[42px] font-bold mb-5 lg:mb-7">
						Search for a stock to start your analysis
					</h1>
					<p className="text-base xs:text-lg md:text-xl lg:text-[22px] mb-4 md:mb-5 lg:mb-7">
						Detailed information on 5000+ stocks, including all the
						companies in the S&P500 index. See stock price quotes, news,
						financial statements and more.
					</p>
					<form action="/search/" method="get" role="search">
						<div className="flex items-center relative mx-auto text-left mb-5 max-w-[95%] md:max-w-[75%] lg:max-w-lg">
							<SiteSearch classes="border border-gray-200 placeholder-gray-700 text-sm xs:text-base py-1.5 md:py-2 pl-7 tiny:pl-8 xs:pl-10 flex-grow focus:ring-0 focus:border-gray-200 focus:outline-none focus:shadow-lg rounded-sm lg:text-[17px]" />
						</div>
					</form>
					<div className="text-sm xs:text-base md:text-lg lg:text-[19px]">
						{`Trending: `}
						{trending.map((t, index) => {
							if (index > 0) {
								return (
									<span key={t.s}>
										,{' '}
										<Link
											href={`/stocks/${t.s.toLowerCase()}/`}
											prefetch={false}
										>
											<a className="bll">{t.s}</a>
										</Link>
									</span>
								)
							}
							return (
								<span key={t.s}>
									<Link
										href={`/stocks/${t.s.toLowerCase()}/`}
										prefetch={false}
									>
										<a className="bll">{t.s}</a>
									</Link>
								</span>
							)
						})}
					</div>
				</div>
			</section>
		</>
	)
}
