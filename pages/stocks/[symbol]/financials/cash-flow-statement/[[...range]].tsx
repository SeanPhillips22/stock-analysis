import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialReport, Range } from 'types/Financials'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/apis/callBackEnd'
import { MAP_CASH_FLOW_STATEMENT } from 'data/financials/map_cash_flow_statement'
import { FinancialsLayout } from 'components/Layout/FinancialsLayout'

type Props = {
	info: Info
	data: FinancialReport
	count: number
	range: Range
}

export default function CashFlowStatement({ info, data, count, range }: Props) {
	return (
		<FinancialsLayout
			info={info}
			url={`/stocks/${info.symbol}/financials/cash-flow-statement/`}
			title={`${info.nameFull} (${info.ticker}) Cash Flow Statement`}
			description={`Detailed cash flow statements for ${info.nameFull} (${info.ticker}), including operating cash flow, capex and free cash flow.`}
			statement="cash-flow-statement"
			range={range}
		>
			<FinancialTable
				key={`${info.symbol}-cash-flow-statement`}
				statement="cash-flow-statement"
				financials={data}
				map={MAP_CASH_FLOW_STATEMENT}
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
	const data = await getStockFinancialsSSR(
		'cash-flow-statement',
		symbol,
		range
	)

	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=1800')

	return data
}
