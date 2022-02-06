import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialReport, Range } from 'types/Financials'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/apis/callBackEnd'
import { MAP_BALANCE_SHEET } from 'data/financials/map_balance_sheet'
import { FinancialsLayout } from 'components/Layout/FinancialsLayout'

interface Props {
	info: Info
	data: FinancialReport
	count: number
	range: Range
}

export default function BalanceSheet({ info, data, count, range }: Props) {
	return (
		<FinancialsLayout
			info={info}
			url={`/stocks/${info.symbol}/financials/balance-sheet/`}
			title={`${info.nameFull} (${info.ticker}) Balance Sheet`}
			description={`Detailed balance sheet for ${info.nameFull} (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
			statement="balance-sheet"
			range={range}
		>
			<FinancialTable
				key={`${info.symbol}-balance-sheet`}
				statement="balance-sheet"
				financials={data}
				map={MAP_BALANCE_SHEET}
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
	const data = await getStockFinancialsSSR('balance-sheet', symbol, range)

	context.res.setHeader('Cache-Control', 'public, max-age=1800')

	return data
}
