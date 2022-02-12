import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { getPageDataSSR } from 'functions/apis/callBackEnd'

type Props = {
	info: Info
}

export default function Forecast({ info }: Props) {
	const title = info.name.length < 12 ? info.name : info.ticker

	return (
		<Stock info={info} url={`/stocks/${info.symbol}/forecast/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Forecast`}
				description={`Forecast for ${info.name} (${info.ticker}), including stock price, revenue and earnings.`}
				canonical={`/stocks/${info.symbol}/forecast/`}
			/>
			<div className="mt-3 bg-gray-100 sm:mt-4">
				<h2 className="hh2">{title} Forecast</h2>
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
