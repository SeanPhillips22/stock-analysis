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
				<StockListLayout>
					<TableContextProvider
						value={{
							tableId: listId,
							fixed,
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
	const listId = params?.slug as string

	const page = StockLists[listId].page
	const fixed = StockLists[listId].fixed
	const query = StockLists[listId].query

	const data = await getSelect(query, false)

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

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{ params: { slug: 'biggest-companies' } },
		{ params: { slug: 'monthly-dividend-stocks' } }
	]

	return {
		paths,
		fallback: false
	}
}
