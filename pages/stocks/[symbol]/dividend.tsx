import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { DividendI } from 'types/Dividend'
import { News } from 'types/News'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { InfoBox } from 'components/InfoBox'
import { InfoTable } from 'components/Dividend/InfoTable'
import { HistoryTable } from 'components/Dividend/HistoryTable'
import { NewsWidget } from 'components/News/NewsWidget'
import { DividendChart } from 'components/Dividend/DividendChart'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'

interface Props {
	info: Info
	data: DividendI
	news: News[]
}

export default function Dividend({ info, data, news }: Props) {
	const title = info.name.length < 12 ? info.name : info.ticker

	return (
		<Stock info={info} url={`/stocks/${info.symbol}/dividend/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Dividend History, Dates & Yield`}
				description={`Get the latest dividend data for ${info.name} (${info.ticker}), including dividend history, yield, key dates, growth and other metrics.`}
				canonical={`/stocks/${info.symbol}/dividend/`}
			/>
			<div className="contain-content mt-3 sm:mt-4">
				<div className="lg:right-sidebar py-1 gap-8">
					<div>
						<h2 className="text-xl bp:text-2xl font-bold">
							{title} Dividend Information
						</h2>
						{data.infoBox && (
							<div className="mt-4 mb-2 lg:mb-3">
								<InfoBox text={data.infoBox} />
							</div>
						)}
						<InfoTable data={data.infoTable} />
						{data.history.length > 0 && (
							<HistoryTable rawdata={data.history} disclaimer={true} />
						)}
						<DividendChart
							data={data.chartData}
							options={data.chartOptions}
							ticker={info.ticker}
						/>
					</div>
					<aside className="mt-7 lg:mt-0 space-y-8">
						{data.history.length > 0 && <Sidebar1 />}
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/stocks/${info.symbol}/`
							}}
						/>
					</aside>
				</div>
			</div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('dividend', symbol, 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=1800')

	return data
}
