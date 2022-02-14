import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Ratings } from 'components/Forecasts/Ratings/_Ratings'
import { PriceTarget } from 'components/Forecasts/PriceTarget/_PriceTarget'
import ContentWideAd from 'components/Ads/Placeholders/ContentWideAd'
import { Earnings } from 'components/Forecasts/Earnings/Earnings'
import { RevenueGrowth } from 'components/Forecasts/Revenue/RevenueGrowth'
import { Revenue } from 'components/Forecasts/Revenue/Revenue'
import { EarningsGrowth } from 'components/Forecasts/Earnings/EarningsGrowth'
import ContentMobileAd from 'components/Ads/Placeholders/ContentMobileAd'
import { AnalystRatings } from 'components/Forecasts/Analysts/AnalystRatings'
import { Surprises } from 'components/Forecasts/Surprises/Surprises'

type Props = {
	info: Info
}

export default function Forecast({ info }: Props) {
	return (
		<Stock info={info} url={`/stocks/${info.symbol}/forecast/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Forecast`}
				description={`Forecast for ${info.name} (${info.ticker}), including stock price, revenue and earnings.`}
				canonical={`/stocks/${info.symbol}/forecast/`}
			/>
			<div className="contain py-2">
				<div className="space-y-8">
					<PriceTarget />
					<ContentWideAd />
					{/* TODO this should be a stacked bar chart */}
					{/* Can limit to 6 months, enable 4 years for pro users */}
					<Ratings />
					<ContentMobileAd />
					{/* IDEA: Add a financials table here with last X years plus the forecasted years */}
					{/* could have revenue, revenue growth -- eps, eps growth -- also ebitda, ebit */}
					<div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
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
						<AnalystRatings />
						<div className="mt-2 flex h-[100px] items-center justify-center border border-gray-200 bg-slate-200">
							Dianomi text-only ads
						</div>
					</div>
					<div>
						{/* TODO this should be a scatter plot chart */}
						<Surprises />
					</div>
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
