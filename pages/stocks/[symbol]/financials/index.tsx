import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialReport, Range } from 'types/Financials'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/apis/callBackEnd'
import { MAP_INCOME_STATEMENT } from 'data/financials/map_income_statement'
import { FinancialsLayout } from 'components/Layout/FinancialsLayout'

type Props = {
	info: Info
	data: FinancialReport
	count: number
	range: Range
}

export default function IncomeStatement({ info, data, count, range }: Props) {
	return (
		<FinancialsLayout
			info={info}
			url={`/stocks/${info.symbol}/financials/`}
			title={`${info.nameFull} (${info.ticker}) Financial Statements: Income`}
			description={`Detailed financial statements for ${info.nameFull} (${info.ticker}), including the income statement, balance sheet, and cash flow statement.`}
			statement="income-statement"
			range={range}
		>
			<FinancialTable
				key={`${info.symbol}-income-statement`}
				statement="income-statement"
				financials={data}
				map={MAP_INCOME_STATEMENT}
				info={info}
				count={count}
				range={range}
			/>
		</FinancialsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getStockFinancialsSSR(
		'income-statement',
		symbol,
		'annual'
	)

	context.res.setHeader('Cache-Control', 'public, max-age=1800')

	return data
}
