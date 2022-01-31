import { GetServerSideProps } from 'next/types'
import { StockTable } from 'components/StockTable/__StockTable'
import { MarketsLayout } from 'components/Markets/_MarketsLayout'
import { PageConfig } from 'types/PageConfig'
import { getSelect } from 'functions/apis/getSelect'
import { TableTimestamp } from 'types/Tables'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { TableDynamic } from 'components/StockTable/TableTypes'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/premarket/',
	pageTitle: 'Premarket Movers',
	active: 'premarket',
	metaTitle: "Today's Premarket Stock Movers",
	metaDescription:
		'Stocks that are moving in the premarket trading period from 4:00 AM to 9:30 AM. See top gainers and top losers.'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'premarketChangePercent',
	count: 20,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000']
}

type Props = {
	data: any[]
	tradingTimestamps: TableTimestamp
}

export default function PreMarket({ data, tradingTimestamps }: Props) {
	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout>
				<TableContextProvider
					value={{
						type: 'stocks',
						title: 'Top Gainers',
						tableId: 'premarket',
						fixed: {
							defaultSort: query.sort,
							controls: {
								range: false,
								results: true,
								filter: false,
								export: true,
								columns: true,
								moverType: true
							},
							excludeColumns: ['ch3y', 'ch5y', 'volume']
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

export const getServerSideProps: GetServerSideProps = async context => {
	let extras = ['tradingTimestamps']
	const data = await getSelect(query, 'stocks', true, extras)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
	return data
}
