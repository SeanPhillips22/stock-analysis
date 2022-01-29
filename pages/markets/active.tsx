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
	path: '/markets/active/',
	title: 'Active Today',
	parentTitle: 'Most Active Stocks',
	active: 'active',
	metaTitle: "Today's Most Active Stocks",
	metaDescription:
		'A list of the stocks with the highest trading volume today. See stock price, price changes, market cap and more.'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'volume',
	count: 20,
	sort: [{ id: 'volume', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'change', 'price', 'marketCap'],
	filters: ['price-over-1', 'close-over-1']
}

type Props = {
	data: any[]
	updated: TableTimestamp
}

export default function ActivePage({ data, updated }: Props) {
	return (
		<PageContextProvider value={{ page, updated }}>
			<MarketsLayout>
				<TableContextProvider
					value={{
						type: 'stocks',
						tableId: 'active',
						fixed: {
							defaultSort: query.sort,
							controls: {
								range: false,
								results: true,
								filter: true,
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
