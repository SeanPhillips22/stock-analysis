import { GetStaticPaths, GetStaticProps } from 'next/types'
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
import { DataId } from 'types/DataId'
import { miniChartSymbols, BulkMiniChartWrapper } from 'components/Markets/Blocks/BulkMiniChartWrapper'
import { fetchBulkMiniCharts } from 'components/MiniChart/Wrappers/fetching/fetchBulkMiniCharts'
import { MiniChartData } from 'components/MiniChart/Wrappers/MiniChart.types'

const rangeMap: any = {
	week: {
		id: 'ch1w',
		fetchId: '5D',
		title: 'Week',
		indexTitle: '1 Week',
		metaTitle: 'In The Past Week'
	},
	month: {
		id: 'ch1m',
		title: 'Month',
		fetchId: '1M',
		indexTitle: '1 Month',
		metaTitle: 'In The Past Month'
	},
	ytd: {
		id: 'chYTD',
		fetchId: 'YTD',
		title: 'YTD',
		metaTitle: 'Year-to-Date'
	},
	year: {
		id: 'ch1y',
		fetchId: '1Y',
		title: '1 Year',
		metaTitle: 'In The Past Year'
	},
	'3y': {
		id: 'ch3y',
		fetchId: '3Y',
		title: '3 Year',
		indexTitle: '3 Years',
		metaTitle: 'In The Past 3 Years'
	},
	'5y': {
		id: 'ch5y',
		fetchId: '5Y',
		title: '5 Year',
		indexTitle: '5 Years',
		metaTitle: 'In The Past 5 Years'
	}
}

type Props = {
	data: {
		data: any[]
		query: TableDynamic
		rangePath: string
		tradingTimestamps: TableTimestamp
		resultsCount: number
	}
	chartData: MiniChartData[]
}

export default function LosersPageRange({ data, chartData }: Props) {
	const { query, rangePath, tradingTimestamps, resultsCount } = data
	const { id, fetchId, title, indexTitle, metaTitle } = rangeMap[rangePath]

	// the page's config and settings
	const page: PageConfig = {
		path: `/markets/losers/${rangePath}/`,
		metaTitle: `Top Stock Losers ${metaTitle}`,
		headingType: 'h1'
	}

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={LosersNav} key={id}>
				<BulkMiniChartWrapper range={fetchId} initialData={chartData} appendToTitle={indexTitle || title} />
				<TableContextProvider
					value={{
						title: `${title} Losers`,
						tableId: `losers-${rangePath}-v2`,
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
							columnOrder: ['rank', 's', 'n', id, 'price', 'volume', 'marketCap'],
							fixedColumns: ['rank', 's', id],
							screener: {
								type: 'stocks',
								filters: [
									{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'volume', name: '', value: `over-10K`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' },
									{ id: id, name: '', value: `under-0`, filterType: 'numeric', numberType: 'percentage' }
								],
								sort: [{ id: id, desc: true }],
								showResultsMenu: true
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	let rangePath = params?.range as DataId
	let id = rangeMap[rangePath].id
	let fetchId = rangeMap[rangePath].fetchId
	let extras = ['tradingTimestamps']

	let query: TableDynamic = {
		index: 'stocks',
		main: id,
		count: 20,
		sort: [{ id: id, desc: false }],
		sortDirection: 'asc',
		columns: ['rank', 's', 'n', 'price', 'volume', 'marketCap'],
		filters: ['price-over-1', 'close-over-1', 'volume-over-10000', 'marketCap-over-10000000', `${id}-under-0`],
		page: 1
	}

	let res = await Promise.all([
		getSelect(query, false, extras),
		fetchBulkMiniCharts({ symbols: miniChartSymbols, range: fetchId })
	])

	let data = res[0]
	let chartData = res[1]
	data.rangePath = rangePath
	data.query = query

	return {
		props: { data, chartData },
		revalidate: 30 * 60
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{ params: { range: 'week' } },
		{ params: { range: 'month' } },
		{ params: { range: 'ytd' } },
		{ params: { range: 'year' } },
		{ params: { range: '3y' } },
		{ params: { range: '5y' } }
	]

	return {
		paths,
		fallback: false
	}
}
