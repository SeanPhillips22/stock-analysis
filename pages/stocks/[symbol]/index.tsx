import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Overview } from 'types/Overview'
import { News } from 'types/News'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { InfoTable, QuoteTable } from 'components/Overview/TopTables'
import { PriceChart } from 'components/PriceChart/_PriceChart'
import { Profile } from 'components/Overview/ProfileWidget'
import { NewsArea } from 'components/Overview/NewsArea'
import { FinancialsWidget } from 'components/Overview/FinancialsWidget'
import { AnalystWidget } from 'components/Overview/AnalystWidget'
import { Sidebar1Overview } from 'components/Ads/AdSense/Sidebar1Overview'

interface Props {
	info: Info
	data: Overview
	news: { data: News[]; updated: number }
}

const StockOverview = ({ info, data, news }: Props) => {
	let description = `Get a real-time ${info.nameFull} (${info.ticker}) stock price quote with breaking news, financials, statistics, charts and more.`
	if (info.state == 'upcomingipo') {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials, IPO details and other important investing information.`
	} else if (info.archived) {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials and other important investing information.`
	}

	const symbol = info.symbol.includes('.') ? info.symbol : `${info.symbol}/`

	return (
		<Stock info={info} url={`/stocks/${symbol}`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Stock Price, Quote & News`}
				description={description}
				canonical={`/stocks/${symbol}`}
			/>
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-4 mt-4">
				<div className="order-3 flex-grow overflow-auto">
					<PriceChart info={info} />
				</div>
				<div className="order-1 flex flex-row gap-4">
					<InfoTable data={data} />
					<QuoteTable data={data} info={info} />
				</div>
			</div>
			<div className="px-0 md:px-4 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar_wide lg:gap-x-10">
				<div className="px-4 lg:pt-1 md:px-0 lg:order-2 space-y-6">
					{news.data.length > 5 && <Sidebar1Overview />}
					<Profile info={info} data={data} />
					<FinancialsWidget info={info} data={data} />
					<AnalystWidget data={data} />
				</div>
				{news && (
					<div className="lg:order-1">
						<NewsArea
							info={info}
							news={news.data}
							updated={news.updated}
						/>
					</div>
				)}
			</div>
		</Stock>
	)
}

export default StockOverview

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('overview', symbol, 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
