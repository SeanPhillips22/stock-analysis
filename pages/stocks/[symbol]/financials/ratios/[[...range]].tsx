import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialReport, Range } from 'types/Financials'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/apis/callBackEnd'
import { MAP_RATIOS } from 'data/financials/map_ratios'
import { FinancialsLayout } from 'components/Layout/FinancialsLayout'

type Props = {
	info: Info
	data: FinancialReport
	count: number
	range: Range
}

export default function Ratios({ info, data, count, range }: Props) {
	return (
		<FinancialsLayout
			info={info}
			url={`/stocks/${info.symbol}/financials/ratios/`}
			title={`${info.nameFull} (${info.ticker}) Financial Ratios and Metrics`}
			description={`Financial ratios and metrics for ${info.nameFull} (${info.ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`}
			statement="ratios"
			range={range}
		>
			<FinancialTable
				key={`${info.symbol}-ratios`}
				statement="ratios"
				financials={data}
				map={MAP_RATIOS}
				info={info}
				count={count}
				range={range}
			/>
		</FinancialsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const range = (context?.params?.range as Range) || 'annual'
	const data = await getStockFinancialsSSR('ratios', symbol, range)

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
