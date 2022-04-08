import { GetStaticPaths, GetStaticProps } from 'next/types'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { PageConfig } from 'types/PageConfig'
import { TableDynamic, TableFixed } from 'components/StockTable/TableTypes'
import { StockListLayout } from 'components/Layout/StockListLayout'
import { SmallInfoBox } from 'components/InfoBoxes/SmallInfoBox'
import { RelatedStockLists } from 'components/StockLists/RelatedStockLists'
import { StockListStats } from 'components/StockLists/StockListStats'
import { BottomDisclaimer } from 'components/StockLists/BottomDisclaimer'
import { EtfDataPoints } from 'data/DataPointGroups/EtfDataPoints'
import { getData } from 'functions/apis/API'
import { translateFiltersForScreener } from 'components/StockLists/translateFiltersForScreener'

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

					{/* Stats Widget */}
					{query.columns.includes('revenue') && <StockListStats data={data.data} />}

					{/* Main Table */}
					<TableContextProvider
						value={{
							title: page.tableTitle,
							description: page.pageDescription,
							tableId: `${listId}-v2`,
							fixed: {
								...fixed,
								controls: {
									filter: true,
									export: true,
									columns: true,
									options: true
								},
								columnOrder: query.columns
							},
							dynamic: query
						}}
					>
						<StockTable _data={data} />
					</TableContextProvider>
					{page.disclaimer && <BottomDisclaimer text={page.disclaimer} />}
					{etfQuery || relatedLists ? (
						<div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
							{/* If list is set to show ETFs */}
							{etfQuery && (
								<TableContextProvider
									value={{
										title: page.etfTitle || 'Related ETFs',
										tableId: `${listId}-etf-v2`,
										fixed: {
											defaultSort: [{ id: 'aum', desc: true }],
											columnOptions: EtfDataPoints
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
					) : null}
				</StockListLayout>
			</PageContextProvider>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	// This is the object key used to get data from the backend
	const listId = params?.slug as string

	// Get the stock list object
	// If the list doesn't exist, return a 404
	let list = await getData('stocklists?type=path&path=' + listId)
	if (!list) {
		return {
			notFound: true
		}
	}

	// Populate the data to generate the page
	const main = list.main_data || 'marketCap'

	// Add the configs from StockLists to the props that are returned
	const page = {
		path: list.url_path ? `/list/${list.url_path}/` : `/list/${list.tag}/`,
		metaTitle: list.seo_title,
		metaDescription: list.seo_description || null,
		pageDescription: list.page_description || null,
		disclaimer: list.disclaimer || null,
		pageTitle: list.page_title || list.seo_title,
		tableTitleObject: ' Stocks',
		headingType: 'div',
		etfTitle: list.etf_title || null
	}

	const fixed = {
		defaultSort: [{ id: main, desc: true }],
		fixedColumns: ['rank', 's', main],
		screener: {
			type: 'stocks',
			filters: translateFiltersForScreener(list),
			sort: [{ id: main, desc: false }],
			showResultsMenu: main !== 'marketCap'
		}
	}

	if (['country', 'industry'].includes(fixed.screener.filters[0].id)) {
		fixed.screener.filters[1] = {
			id: main,
			value: 'notzero',
			filterType: 'numeric'
		}
	}

	const relatedLists = list.related || null

	// Get the main query config
	const query: TableDynamic = {
		index: list.index || 'allstocks',
		main: main,
		count: list.results_count ?? null,
		sort: [{ id: main, desc: list.sort_direction !== 'asc' }],
		sortDirection: list.sort_direction || 'desc',
		columns: list.columns || ['rank', 's', 'n', 'marketCap', 'price', 'change', 'revenue'],
		filters: list.filters
			? list.filters === 'null'
				? null
				: list.filters
			: [`tags-includes-${list.tag.replace('-', '=')}`]
	}

	// Get the ETF query config
	const etfQuery: TableDynamic | null = list.etfs
		? {
				index: 'etf',
				main: 'aum',
				count: null,
				sort: [{ id: 'aum', desc: true }],
				sortDirection: 'desc',
				columns: ['rank', 's', 'n', 'price', 'change', 'aum'],
				filters: [`tags-includes-${list.tag.replace('-', '=')}`]
		  }
		: null

	// Fetch the data
	let data
	let etfData
	if (etfQuery) {
		let res = await Promise.all([getSelect(query, false), getSelect(etfQuery)])
		data = res[0] || null
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
	return {
		paths: [],
		fallback: 'blocking'
	}
}
