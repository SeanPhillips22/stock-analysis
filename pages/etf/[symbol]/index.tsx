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
import { Sidebar1All } from 'components/Ads/AdSense/Sidebar1All'
import { InitialData } from 'types/Charts'

type Props = {
	info: Info
	data: Overview
	news: { data: News[]; updated: number }
	chart: InitialData
}

export default function EtfOverview({ info, data, news, chart }: Props) {
	const url = `/etf/${info.symbol}`

	return (
		<Stock info={info} url={url}>
			<SEO
				title={`${info.ticker} ETF Stock Price, Quote & Overview`}
				description={`Get a real-time stock price quote for ${info.ticker} (${info.name}). Also includes news, ETF details and other investing information.`}
				canonical={url}
				preconnect="https://api.stockanalysis.com"
			/>
			<div className="mt-4 flex-row gap-4 px-3 xs:px-4 lg:flex lg:px-6">
				<div className="order-3 grow overflow-auto">
					<PriceChart info={info} initial={chart} />
				</div>
				<div className="order-1 flex flex-row justify-between gap-4">
					<InfoTable data={data} />
					<QuoteTable data={data} info={info} />
				</div>
			</div>
			<div className="mt-6 px-0 md:px-4 lg:grid lg:grid-cols-sidebar_wide lg:gap-x-10 lg:px-6">
				<div className="space-y-7 px-4 md:px-0 lg:order-2">
					{news.data.length > 5 && <Sidebar1All key={url} />}
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

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('overview', symbol, 'etf')

	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=60')

	return data
}
