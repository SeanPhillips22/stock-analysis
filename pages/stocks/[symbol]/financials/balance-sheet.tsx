import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialsType } from 'types/Financials'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { SubNavigation } from 'components/FinancialTable/SubNavigation'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/apis/callBackEnd'
import { MAP_BALANCE_SHEET } from 'data/financials/map_balance_sheet'

interface Props {
	info: Info
	data: FinancialsType
	counts: {
		annual: number
		quarterly: number
		trailing: number
	}
}

export default function BalanceSheet({ info, data, counts }: Props) {
	return (
		<Stock
			info={info}
			url={`/stocks/${info.symbol}/financials/balance-sheet/`}
		>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Balance Sheet`}
				description={`Detailed balance sheet for ${info.nameFull} (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
				canonical={`/stocks/${info.symbol}/financials/balance-sheet/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation info={info} statement="balance_sheet" />
				<FinancialTable
					key={`${info.symbol}-balance_sheet`}
					statement="balance_sheet"
					financials={data}
					map={MAP_BALANCE_SHEET}
					info={info}
					counts={counts}
				/>
			</div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getStockFinancialsSSR('balance_sheet', symbol)

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
