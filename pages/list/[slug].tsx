import { GetServerSideProps } from 'next/types'
import { StockLists } from 'data/StockLists'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { PageConfig } from 'types/PageConfig'
import { TableDynamic, TableFixed } from 'components/StockTable/TableTypes'
import { StockListLayout } from 'components/Layout/StockListLayout'

type Props = {
	listId: string
	data: any
	page: PageConfig
	fixed: TableFixed
	query: TableDynamic
}

export default function StockList({ listId, data, page, fixed, query }: Props) {
	return (
		<>
			<PageContextProvider value={{ page, count: data.data.length }}>
				<StockListLayout key={page.path}>
					<TableContextProvider
						value={{
							title: page.tableTitle,
							description: page.pageDescription,
							tableId: listId,
							fixed: {
								...fixed,
								columnOrder: query.columns
							},
							dynamic: query
						}}
					>
						<StockTable _data={data} />
					</TableContextProvider>
				</StockListLayout>
			</PageContextProvider>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const listId = context?.params?.slug as string

	// If list ID is not in StocksLists, return not found
	if (!StockLists[listId]) {
		return {
			notFound: true
		}
	}

	// Add the configs from StockLists to the props that are returned
	const page = StockLists[listId].page
	const fixed = StockLists[listId].fixed
	const query = StockLists[listId].query

	// Fetch the data
	const data = await getSelect(query, false)

	// Set the page cache to 10 minutes
	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=600')

	return {
		props: {
			listId,
			data,
			page,
			fixed,
			query
		}
	}
}
