import { GetServerSideProps } from 'next/types'
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
	path: '/markets/gainers/',
	pageTitle: 'Top Stock Gainers',
	active: 'gainers',
	metaTitle: "Today's Top Stock Gainers",
	metaDescription:
		'A list of the stocks with the highest percentage gain today. See stock price, volume, market cap and more.'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'price', 'volume', 'marketCap'],
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000']
}

type Props = {
	data: any[]
	tradingTimestamps: TableTimestamp
}

export default function GainersPage({ data, tradingTimestamps }: Props) {
	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout>
				<TableContextProvider
					value={{
						type: 'stocks',
						title: 'Gainers Today',
						tableId: 'gainers',
						fixed: {
							defaultSort: query.sort,
							controls: {
								range: true,
								results: true,
								filter: false,
								export: true,
								columns: true
							},
							columnOptions: MoverDataPoints,
							excludeColumns: [
								'premarketPrice',
								'premarketChange',
								'premarketChangePercent'
							]
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
