import { GetStaticPaths, GetStaticProps } from 'next/types'
import { getStockList, StockLists } from 'data/StockLists'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { PageConfig } from 'types/PageConfig'
import { TableDynamic, TableFixed } from 'components/StockTable/TableTypes'
import { StockListLayout } from 'components/Layout/StockListLayout'
import { SmallInfoBox } from 'components/InfoBoxes/SmallInfoBox'
import { RelatedStockLists } from 'components/StockLists/RelatedStockLists'
import { BottomDisclaimer } from 'components/StockLists/BottomDisclaimer'

type Props = {
	listId: string
	data: any
	page: PageConfig
	fixed: TableFixed
	query: TableDynamic
	etfQuery?: TableDynamic
	etfData?: any
	relatedLists?: { name: string; url: string }[]
}

export default function StockList({ listId, data, page, fixed, query, etfQuery, etfData, relatedLists }: Props) {
	return (
		<>
			<PageContextProvider value={{ page, count: data.data.length }}>
				<StockListLayout key={page.path}>
					{/* Info Box */}
					{page.pageDescription && <SmallInfoBox text={page.pageDescription} classes="mb-4 sm:mb-5" />}

					{/* Main Table */}
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
					{page.disclaimer && <BottomDisclaimer text={page.disclaimer} />}

					<div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
						{/* If list is set to show ETFs */}
						{etfQuery && (
							<TableContextProvider
								value={{
									title: page.etfTitle || 'Related ETFs',
									tableId: `${listId}-etf`,
									fixed: {
										defaultSort: [{ id: 'aum', desc: true }]
									},
									dynamic: etfQuery
								}}
							>
								<StockTable _data={etfData} />
							</TableContextProvider>
						)}

						{/* Related Lists */}
						{relatedLists && <RelatedStockLists lists={relatedLists} />}
					</div>
				</StockListLayout>
			</PageContextProvider>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// This is the object key used to get data from StockLists.tsx
	const listId = params?.slug as string

	// Get the stock list object
	// If the list doesn't exist, return a 404
	const list = getStockList(listId)
	if (!list) {
		return {
			notFound: true
		}
	}

	// Add the configs from StockLists to the props that are returned
	const page = list.page
	const fixed = list.fixed
	const relatedLists = list.relatedLists || null

	// Get the main query config
	const query = list.query

	// Get the ETF query config
	const etfQuery = list.etfQuery || null

	// Fetch the data
	let data
	let etfData
	if (etfQuery) {
		let res = await Promise.all([getSelect(query, false), getSelect(etfQuery)])
		data = res[0]
		etfData = res[1]
	} else {
		data = await getSelect(query, false)
		etfData = null
	}

	return {
		props: {
			listId,
			data,
			page,
			fixed,
			query,
			etfQuery,
			etfData,
			relatedLists
		},
		revalidate: 2 * 60
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Object.keys(StockLists).map(key => ({ params: { slug: key } }))

	return {
		paths,
		fallback: false
	}
}
