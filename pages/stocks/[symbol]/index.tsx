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
import { Sidebar1Overview } from 'components/Ads/Snigel/Sidebar1Overview'
import { Chart } from 'components/AnalystChart/AnalystChart'

interface Props {
	info: Info
	data: Overview
	news: { data: News[]; updated: number }
}

const chartData = {
	price: [
		{ t: '2020-12-1', c: '132.69' },
		{ t: '2021-01-1', c: '131.96' },
		{ t: '2021-02-1', c: '121.26' },
		{ t: '2021-03-1', c: '122.15' },
		{ t: '2021-04-1', c: '131.46' },
		{ t: '2021-05-1', c: '124.61' },
		{ t: '2021-06-1', c: '136.96' },
		{ t: '2021-07-1', c: '145.86' },
		{ t: '2021-08-1', c: '151.83' },
		{ t: '2021-09-1', c: '141.50' },
		{ t: '2021-10-1', c: '149.80' },
		{ t: '2021-11-1', c: '165.30' },
		{ t: '2021-12-1', c: '177.57' },
		{ t: '2022-12-1', c: undefined }
	],
	targets: {
		low: '90',
		average: '175.28',
		high: '210'
	}
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
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-8 mt-8">
				<div className="order-1 h-[240px] sm:h-[200px] flex-grow overflow-auto">
					<Chart chartData={chartData} />
				</div>
			</div>
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
					<Sidebar1Overview news={news.data} />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('overview', symbol, 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
