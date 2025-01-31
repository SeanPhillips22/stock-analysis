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
import { GainersNav } from 'components/Markets/Navigation/GainersNav'
import { fetchBulkMiniCharts } from 'components/MiniChart/Wrappers/fetching/fetchBulkMiniCharts'
import { MiniChartData } from 'components/MiniChart/Wrappers/MiniChart.types'
import { miniChartSymbols, BulkMiniChartWrapper } from 'components/Markets/Blocks/BulkMiniChartWrapper'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/gainers/',
	metaTitle: "Today's Top Stock Gainers",
	metaDescription:
		'A list of the stocks with the highest percentage gain today. See stock price, volume, market cap and more.',
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'change', 'price', 'volume', 'marketCap'],
	filters: ['price-over-1', 'change-over-0', 'volume-over-10000', 'marketCap-over-1000000'],
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

export default function GainersPage({ data, chartData }: Props) {
	const { tradingTimestamps, resultsCount } = data

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={GainersNav}>
				<BulkMiniChartWrapper range="1D" initialData={chartData} appendToTitle={tradingTimestamps.last} />
				<TableContextProvider
					value={{
						title: 'Gainers Today',
						tableId: 'gainers-v2',

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
									{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
									{
										id: 'change',
										name: '',
										value: `over-0`,
										filterType: 'numeric',
										numberType: 'percentage'
									},
									{ id: 'volume', name: '', value: `over-10K`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
								],
								sort: [{ id: 'change', desc: false }]
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

// description:
// 	'The stocks with the highest percentage gain today, updated every five minutes. Includes stocks traded on the NASDAQ and NYSE, with stock price over $1, price change over 2% and trading volume over 10,000.',
