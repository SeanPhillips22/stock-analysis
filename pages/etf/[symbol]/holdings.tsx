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

interface Props {
	info: Info
	data: HoldingsType
	news: News[]
}

const Holdings = ({ info, data, news }: Props) => {
	const url = `/etf/${info.symbol}/holdings/`

	return (
		<Stock info={info} url={url}>
			<SEO
				title={`${info.ticker} ETF Holdings - ${info.name}`}
				description={`A long list of holdings for ${info.ticker} (${info.name}) with details about each stock and its percentage weighting in the ETF.`}
				canonical={url}
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
								<div className="mt-1 text-small text-gray-700">As of {data.updated}</div>
								<HoldingsPaywall total={data.count} />
							</>
						) : (
							<div>
								<h2 className="mt-1 mb-0.5 text-xl font-bold bp:mb-1 bp:text-2xl sm:mb-1 sm:text-2xl">
									{info.ticker} Holdings
								</h2>

								<span className="mt-2 text-lg">No holdings were found for the {info.ticker} ETF</span>
							</div>
						)}
					</div>
					<aside className="mt-7 space-y-8 lg:mt-0">
						{data && data.count > 15 && <Sidebar1 key={url} />}
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`
							}}
						/>
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

	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=3600')

	return data
}
