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
import { LosersNav } from 'components/Markets/Navigation/LosersNav'
import { miniChartSymbols, BulkMiniChartWrapper } from 'components/Markets/Blocks/BulkMiniChartWrapper'
import { fetchBulkMiniCharts } from 'components/MiniChart/Wrappers/fetching/fetchBulkMiniCharts'
import { MiniChartData } from 'components/MiniChart/Wrappers/MiniChart.types'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/losers/',
	metaTitle: "Today's Top Stock Losers",
	metaDescription:
		'A list of the stocks with the highest percentage loss today. See stock price, volume, market cap and more.',
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'asc',
	columns: ['rank', 's', 'n', 'change', 'price', 'volume', 'marketCap'],
	filters: ['close-over-1', 'change-under-0', 'volume-over-10000', 'marketCap-over-1000000'],
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

export default function LosersPage({ data, chartData }: Props) {
	const { tradingTimestamps, resultsCount } = data

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={LosersNav}>
				<BulkMiniChartWrapper range="1D" initialData={chartData} appendToTitle={data.tradingTimestamps.last} />
				<TableContextProvider
					value={{
						title: 'Losers Today',
						tableId: 'losers-v2',
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
							fixedColumns: ['rank', 's', 'change'],
							screener: {
								type: 'stocks',
								filters: [
									{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
									{
										id: 'change',
										name: '',
										value: `under-0`,
										filterType: 'numeric',
										numberType: 'percentage'
									},
									{ id: 'volume', name: '', value: `over-10K`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
								],
								sort: [{ id: 'change', desc: true }]
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
