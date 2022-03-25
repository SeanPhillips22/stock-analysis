import { GetStaticPaths, GetStaticProps } from 'next/types'
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// This is the object key used to get data from StockLists.tsx
	const listId = params?.slug as string

	// Add the configs from StockLists to the props that are returned
	// If undefined, add a default setting instead
	const page = StockLists[listId].page
	const fixed = StockLists[listId]?.fixed || {
		defaultSort: [{ id: 'marketCap', desc: true }]
	}
	const query = StockLists[listId].query

	// Fetch the data
	const data = await getSelect(query, false)

	return {
		props: {
			listId,
			data,
			page,
			fixed,
			query
		},
		revalidate: 3600 // Cache for 1 hour
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Object.keys(StockLists).map(key => ({ params: { slug: key } }))

	return {
		paths,
		fallback: false
	}
}
