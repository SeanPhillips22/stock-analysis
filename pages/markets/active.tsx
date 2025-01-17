import { GetStaticProps } from 'next/types'
import { StockTable } from 'components/StockTable/__StockTable'
import { MarketsLayout } from 'components/Markets/_MarketsLayout'
import { PageConfig } from 'types/PageConfig'
import { getSelect } from 'functions/apis/getSelect'
import { TableTimestamp } from 'types/Tables'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { TableDynamic } from 'components/StockTable/TableTypes'
import { MoverDataPoints } from 'data/DataPointGroups/MoverDataPoints'
import { miniChartSymbols, BulkMiniChartWrapper } from 'components/Markets/Blocks/BulkMiniChartWrapper'
import { fetchBulkMiniCharts } from 'components/MiniChart/Wrappers/fetching/fetchBulkMiniCharts'
import { MiniChartData } from 'components/MiniChart/Wrappers/MiniChart.types'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/active/',
	metaTitle: "Today's Most Active Stocks",
	metaDescription:
		'A list of the stocks with the highest trading volume today. See stock price, price changes, market cap and more.',
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'volume',
	count: 20,
	sort: [{ id: 'volume', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'volume', 'change', 'price', 'marketCap'],
	filters: ['price-over-1', 'volume-over-0', 'marketCap-over-1000000'],
	page: 1
}

type Props = {
	data: {
		data: any[]
		tradingTimestamps: TableTimestamp
		resultsCount: number
	}
	chartData: MiniChartData[]
}

export default function ActivePage({ data, chartData }: Props) {
	const { tradingTimestamps, resultsCount } = data

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout>
				<BulkMiniChartWrapper range="1D" initialData={chartData} appendToTitle={data.tradingTimestamps.last} />
				<TableContextProvider
					value={{
						title: 'Active Today',
						tableId: 'active-v2',
						fixed: {
							defaultSort: query.sort,
							controls: {
								results: true,
								export: true,
								columns: true,
								options: true
							},
							pagination: true,
							resultsCount,
							columnOptions: MoverDataPoints,
							excludeColumns: ['premarketPrice', 'premarketChange', 'premarketChangePercent'],
							columnOrder: query.columns,
							fixedColumns: ['rank', 's', 'volume'],
							screener: {
								type: 'stocks',
								filters: [
									{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'volume', name: '', value: `over-0`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1000000`, filterType: 'numeric' }
								],
								sort: [{ id: 'volume', desc: false }]
							}
						},
						dynamic: query
					}}
				>
					<StockTable _data={data.data} />
				</TableContextProvider>
			</MarketsLayout>
		</PageContextProvider>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['tradingTimestamps']

	let res = await Promise.all([
		getSelect(query, false, extras),
		fetchBulkMiniCharts({ symbols: miniChartSymbols, range: '1D' })
	])

	let data = res[0]
	let chartData = res[1]

	return {
		props: { data, chartData },
		revalidate: 2 * 60
	}
}
