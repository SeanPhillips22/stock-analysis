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
	columns: ['s', 'n', 'change', 'price', 'marketCap'],
	filters: ['price-over-1', 'close-over-1']
}

type Props = {
	data: any[]
	tradingTimestamps: TableTimestamp
}

export default function ActivePage({ data, tradingTimestamps }: Props) {
	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout>
				<TableContextProvider
					value={{
						title: 'Active Today',
						tableId: 'active',
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
						dynamic: query
					}}
				>
					<StockTable _data={data} />
				</TableContextProvider>
			</MarketsLayout>
		</PageContextProvider>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['tradingTimestamps']
	const data = await getSelect(query, true, extras)
	return data
}
