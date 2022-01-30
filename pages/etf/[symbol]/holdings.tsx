import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { HoldingsType } from 'types/Holdings'
import { News } from 'types/News'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { HoldingsTable } from 'components/Holdings/_HoldingsTable'
import { NewsWidget } from 'components/News/NewsWidget'
import { HoldingsPaywall } from 'components/Holdings/HoldingsPaywall'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Sidebar2 } from 'components/Ads/AdSense/Sidebar2'

interface Props {
	info: Info
	data: HoldingsType
	news: News[]
}

const Holdings = ({ info, data, news }: Props) => {
	return (
		<Stock info={info} url={`/etf/${info.symbol}/holdings/`}>
			<SEO
				title={`${info.ticker} ETF Holdings - ${info.name}`}
				description={`A long list of holdings for ${info.ticker} (${info.name}) with details about each stock and its percentage weighting in the ETF.`}
				canonical={`/etf/${info.symbol}/holdings/`}
			/>
			<div className="contain-content mt-3 sm:mt-4 lg:mt-5">
				<div className="lg:right-sidebar">
					<div>
						{data.count ? (
							<>
								<HoldingsTable
									key={info.symbol}
									symbol={info.symbol}
									rawdata={data.list}
									fullCount={data.count}
								/>
								<div className="text-gray-700 text-small mt-1">
									As of {data.updated}
								</div>
								<HoldingsPaywall total={data.count} />
							</>
						) : (
							<div>
								<h2 className="text-xl bp:text-2xl sm:text-2xl font-bold mt-1 mb-0.5 bp:mb-1 sm:mb-1">
									{info.ticker} Holdings
								</h2>

								<span className="text-lg mt-2">
									No holdings were found for the {info.ticker} ETF
								</span>
							</div>
						)}
					</div>
					<aside className="mt-7 lg:mt-0 space-y-8">
						{data && data.count > 15 && <Sidebar1 />}
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`
							}}
						/>
						{data && data.count > 35 && news?.length > 4 && <Sidebar2 />}
					</aside>
				</div>
			</div>
		</Stock>
	)
}
export default Holdings

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('holdings', symbol)

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
