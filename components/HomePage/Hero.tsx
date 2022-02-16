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
			<section className="home-hero border-b border-gray-200 bg-gray-100 py-12 px-4 shadow-sm md:py-24 lg:py-40 landscape:border-t-2 landscape:md:border-t-0">
				<div className="mx-auto max-w-[850px] text-center">
					<h1 className="mb-5 text-2xl font-bold xs:text-3xl md:text-4xl lg:mb-7 lg:text-[42px]">
						Search for a stock to start your analysis
					</h1>
					<p className="mb-4 text-base xs:text-lg md:mb-5 md:text-xl lg:mb-7 lg:text-[22px]">
						Detailed information on 5000+ stocks, including all the
						companies in the S&P500 index. See stock price quotes, news,
						financial statements and more.
					</p>
					<form action="/search/" method="get" role="search">
						<div className="relative mx-auto mb-5 flex max-w-[95%] items-center text-left md:max-w-[75%] lg:max-w-lg">
							<SiteSearch />
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
