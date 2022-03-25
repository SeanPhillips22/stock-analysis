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
import { GainersNav } from 'components/Markets/Navigation/GainersNav'
import { DataId } from 'types/DataId'

const rangeMap: any = {
	week: {
		id: 'ch1w',
		title: 'Week',
		metaTitle: 'In The Past Week'
	},
	month: {
		id: 'ch1m',
		title: 'Month',
		metaTitle: 'In The Past Month'
	},
	ytd: {
		id: 'chYTD',
		title: 'YTD',
		metaTitle: 'Year-to-Date'
	},
	year: {
		id: 'ch1y',
		title: '1 Year',
		metaTitle: 'In The Past Year'
	},
	'3y': {
		id: 'ch3y',
		title: '3 Year',
		metaTitle: 'In The Past 3 Years'
	},
	'5y': {
		id: 'ch5y',
		title: '5 Year',
		metaTitle: 'In The Past 5 Years'
	}
}

type Props = {
	data: any[]
	query: TableDynamic
	rangePath: string
	tradingTimestamps: TableTimestamp
	resultsCount: number
}

export default function GainersPageRange({ data, query, rangePath, tradingTimestamps, resultsCount }: Props) {
	const { id, title, metaTitle } = rangeMap[rangePath]

	// the page's config and settings
	const page: PageConfig = {
		path: `/markets/gainers/${rangePath}/`,
		metaTitle: `Top Stock Gainers ${metaTitle}`,
		headingType: 'h1'
	}

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={GainersNav} key={id}>
				<TableContextProvider
					value={{
						title: `${title} Gainers`,
						tableId: `gainers-${rangePath}-v2`,
						fixed: {
							defaultSort: query.sort,
							controls: {
								results: true,
								export: true,
								columns: true
							},
							pagination: true,
							resultsCount,
							columnOptions: MoverDataPoints,
							excludeColumns: ['premarketPrice', 'premarketChange', 'premarketChangePercent'],
							columnOrder: ['rank', 's', 'n', id, 'price', 'volume', 'marketCap'],
							fixedColumns: ['rank', 's', id]
						},
						dynamic: query
					}}
				>
					<StockTable _data={data} />
				</TableContextProvider>
			</MarketsLayout>
		</PageContextProvider>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const rangePath = params?.range as DataId
	const id = rangeMap[rangePath].id
	let extras = ['tradingTimestamps']

	let query: TableDynamic = {
		index: 'stocks',
		main: id,
		count: 20,
		sort: [{ id: id, desc: true }],
		sortDirection: 'desc',
		columns: ['rank', 's', 'n', 'price', 'volume', 'marketCap'],
		filters: ['price-over-1', 'close-over-1', 'volume-over-10000', 'marketCap-over-100000000', `${id}-over-0`],
		page: 1
	}

	const data = await getSelect(query, true, extras)
	data.props.rangePath = rangePath
	data.props.query = query

	return data
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
