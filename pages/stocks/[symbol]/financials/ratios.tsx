import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { FinancialsType } from 'types/Financials'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { SubNavigation } from 'components/FinancialTable/SubNavigation'
import { FinancialTable } from 'components/FinancialTable/_FinancialTable'
import { getStockFinancialsSSR } from 'functions/callBackEnd'
import { MAP_RATIOS } from 'data/financials/map_ratios'

interface Props {
	info: Info
	data: FinancialsType
	counts: {
		annual: number
		quarterly: number
		trailing: number
	}
}

export default function Ratios({ info, data, counts }: Props) {
	return (
		<Stock info={info} url={`/stocks/${info.symbol}/financials/ratios/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Financial Ratios and Metrics`}
				description={`Financial ratios and metrics for ${info.nameFull} (${info.ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`}
				canonical={`/stocks/${info.symbol}/financials/ratios/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation info={info} statement="ratios" />
				<FinancialTable
					statement="ratios"
					financials={data}
					map={MAP_RATIOS}
					info={info}
					counts={counts}
				/>
			</div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getStockFinancialsSSR('ratios', symbol)

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
