import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Overview } from 'types/Overview'
import { News } from 'types/News'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { InfoTable, QuoteTable } from 'components/Overview/TopTablesETF'
import { PriceChart } from 'components/PriceChart/_PriceChart'
import { Profile } from 'components/Overview/ProfileWidget'
import { NewsArea } from 'components/Overview/NewsArea'
import { HoldingsWidget } from 'components/Overview/HoldingsWidget'
import { DividendWidget } from 'components/Overview/DividendWidget'
import { Sidebar1Overview } from 'components/Ads/Snigel/Sidebar1Overview'
import { ChartDataPayload } from 'types/Charts'

interface Props {
	info: Info
	data: Overview
	news: { data: News[]; updated: number }
	chart: ChartDataPayload
}

const EtfOverview = ({ info, data, news, chart }: Props) => {
	return (
		<Stock info={info} url={`/etf/${info.symbol}/`}>
			<SEO
				title={`${info.ticker} ETF Stock Price, Quote & Overview`}
				description={`Get a real-time stock price quote for ${info.ticker} (${info.name}). Also includes news, ETF details and other investing information.`}
				canonical={`/etf/${info.symbol}/`}
			/>
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-4 mt-4">
				<div className="order-3 flex-grow overflow-auto">
					<PriceChart info={info} chart={chart} />
				</div>
				<div className="order-1 flex flex-row justify-between gap-4">
					<InfoTable data={data} />
					<QuoteTable data={data} info={info} />
				</div>
			</div>
			<div className="px-0 md:px-4 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar_wide lg:gap-x-10">
				<div className="px-4 md:px-0 lg:order-2 space-y-7">
					<Sidebar1Overview news={news.data} />
					<Profile info={info} data={data} />
					{data.holdingsTable && (
						<HoldingsWidget
							ticker={info.ticker}
							data={data.holdingsTable}
						/>
					)}
					{data.dividendTable && (
						<DividendWidget
							ticker={info.ticker}
							data={data.dividendTable}
						/>
					)}
				</div>
				<div className="lg:order-1">
					<NewsArea info={info} news={news.data} updated={news.updated} />
				</div>
			</div>
		</Stock>
	)
}
export default EtfOverview

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('overview', symbol, 'etf')

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
