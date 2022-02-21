import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Forecast } from 'types/Forecast'
import { Stock } from 'components/Layout/StockLayout'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Ratings } from 'components/Forecasts/Ratings/_Ratings'
import { PriceTarget } from 'components/Forecasts/PriceTarget/_PriceTarget'
import { ContentWideAd } from 'components/Ads/Placeholders/ContentWideAd'

type Props = {
	info: Info
	data: Forecast
}

export default function ForecastPage({ info, data }: Props) {
	return (
		<Stock
			info={info}
			data={data}
			url={`/stocks/${info.symbol}/forecast/`}
			title={`${info.nameFull} (${info.ticker}) Forecast`}
		>
			<div className="contain space-y-8 py-4">
				<PriceTarget />
				<ContentWideAd />
				<Ratings />
				{/* <ContentMobileAd /> */}
				{/* IDEA: Add a financials table here with last X years plus the forecasted years */}
				{/* could have revenue, revenue growth -- eps, eps growth -- also ebitda, ebit */}
				{/* <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
						<Revenue />
						<RevenueGrowth />
						<ContentMobileAd />
						<Earnings />
						<EarningsGrowth />
					</div>
					<div>
						<ContentWideAd />
					</div>
					<div>
						<AnalystCalls />
						<div className="mt-2 flex h-[100px] items-center justify-center border border-gray-200 bg-slate-200">
							Dianomi text-only ads
						</div>
					</div>
					<div>
						TODO this should be a scatter plot chart
						<Surprises />
					</div> */}
			</div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('fc', symbol, 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=1800')

	return data
}
