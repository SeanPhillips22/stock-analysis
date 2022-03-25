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
import { PremarketNav } from 'components/Markets/Navigation/PremarketNav'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/premarket/losers/',
	metaTitle: "Today's Premarket Losers",
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'premarketChangePercent',
	count: 20,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'asc',
	columns: ['rank', 's', 'n', 'premarketChangePercent', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000'],
	page: 1
}

type Props = {
	data: any[]
	tradingTimestamps: TableTimestamp
	resultsCount: number
}

export default function PreMarket({ data, tradingTimestamps, resultsCount }: Props) {
	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={PremarketNav}>
				<TableContextProvider
					value={{
						title: 'Premarket Losers',
						tableId: 'premarket-losers-v2',
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
							columnOrder: query.columns,
							fixedColumns: ['rank', 's', 'premarketChangePercent']
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
