import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Forecast } from 'types/Forecast'
import { Stock } from 'components/Layout/StockLayout'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Ratings } from 'components/Forecasts/Ratings/_Ratings'
import { PriceTarget } from 'components/Forecasts/PriceTarget/_PriceTarget'
import { ContentWide1 } from 'components/Ads/AdSense/ContentWide1'
import { Estimates } from 'components/Forecasts/Estimates/_Estimates'
import { EstimateChartArea } from 'components/Forecasts/Estimates/EstimateChartArea'

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
			title={`${info.nameFull} (${info.ticker}) Forecast & Price Targets`}
		>
			<div className="contain space-y-8 py-4">
				<PriceTarget />
				<ContentWide1 />
				<Ratings />
				<Estimates />
				<ContentWide1 />
				<EstimateChartArea />
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
