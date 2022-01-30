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
	path: '/markets/losers/',
	pageTitle: 'Top Stock Losers',
	active: 'losers',
	metaTitle: "Today's Top Stock Losers",
	metaDescription:
		'A list of the stocks with the highest percentage loss today. See stock price, volume, market cap and more.'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'price', 'volume', 'marketCap'],
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000']
}

type Props = {
	data: any[]
	updated: TableTimestamp
}

export default function LosersPage({ data, updated }: Props) {
	return (
		<PageContextProvider value={{ page, updated }}>
			<MarketsLayout>
				<TableContextProvider
					value={{
						type: 'stocks',
						title: 'Losers Today',
						tableId: 'losers',
						fixed: {
							defaultSort: query.sort,
							controls: {
								range: true,
								results: true,
								filter: false,
								export: true,
								columns: true
							},
							excludeColumns: ['ch3y', 'ch5y']
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
	const data = await getSelect(query, 'stocks', true)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
	return data
}
