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

// the initial config for the select endpoint to fetch data
let query: TableDynamic = {
	index: 'stocks',
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'price', 'volume', 'marketCap'],
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000']
}

type Props = {
	data: any[]
	rangePath: string
	tradingTimestamps: TableTimestamp
}

export default function LosersPageRange({ data, rangePath, tradingTimestamps }: Props) {
	const { id, title, metaTitle } = rangeMap[rangePath]

	// the page's config and settings
	const page: PageConfig = {
		path: `/markets/losers/${rangePath}/`,
		metaTitle: `Top Stock Losers ${metaTitle}`,
		headingType: 'h1'
	}

	query = {
		...query,
		main: id,
		sort: [{ id: id, desc: false }]
	}

	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={LosersNav}>
				<TableContextProvider
					value={{
						title: `${title} Losers`,
						tableId: `losers-${rangePath}`,
						fixed: {
							defaultSort: query.sort,
							controls: {
								results: true,
								export: true,
								columns: true
							},
							columnOptions: MoverDataPoints,
							excludeColumns: ['premarketPrice', 'premarketChange', 'premarketChangePercent']
						},
						dynamic: {
							...query,
							main: id
						}
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

	query = {
		...query,
		main: id,
		sort: [{ id: id, desc: false }]
	}

	const data = await getSelect(query, true, extras)
	data.props.rangePath = rangePath

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
