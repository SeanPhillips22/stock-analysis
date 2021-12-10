import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialsType } from 'types/Financials'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { SubNavigation } from 'components/FinancialTable/SubNavigation'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/callBackEnd'
import { MAP_INCOME_STATEMENT } from 'data/financials/map_income_statement'

interface Props {
	info: Info
	data: FinancialsType
	counts: {
		annual: number
		quarterly: number
		trailing: number
	}
}

export default function IncomeStatement({ info, data, counts }: Props) {
	return (
		<Stock info={info} url={`/stocks/${info.symbol}/financials/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Financial Statements: Income`}
				description={`Detailed financial statements for ${info.nameFull} (${info.ticker}), including the income statement, balance sheet, and cash flow statement.`}
				canonical={`/stocks/${info.symbol}/financials/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation info={info} statement="income_statement" />
				<FinancialTable
					statement="income_statement"
					financials={data}
					map={MAP_INCOME_STATEMENT}
					info={info}
					counts={counts}
				/>
			</div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getStockFinancialsSSR('income_statement', symbol)

	context.res.setHeader(
		'Cache-Control',
		'no-cache, no-store, max-age=0, must-revalidate'
	)

	return data
}
