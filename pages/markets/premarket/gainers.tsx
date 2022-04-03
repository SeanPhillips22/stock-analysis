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
	path: '/markets/premarket/gainers/',
	metaTitle: "Today's Premarket Gainers",
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'premarketChangePercent',
	count: 20,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'premarketChangePercent', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['premarketChangePercent-over-0', 'price-over-1', 'close-over-1', 'marketCap-over-1000000'],
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
						title: 'Premarket Gainers',
						tableId: 'premarket-gainers-v2',
						// description:
						// 	'The stocks with the highest percentage gain during pre-market trading, updated every five minutes between 4:15 am and 9:30 am ET.',
						fixed: {
							defaultSort: query.sort,
							controls: {
								results: true,
								export: true,
								columns: true,
								options: true
							},
							pagination: true,
							resultsCount,
							columnOptions: MoverDataPoints,
							columnOrder: query.columns,
							fixedColumns: ['rank', 's', 'premarketChangePercent'],
							screener: {
								type: 'stocks',
								filters: [
									{
										id: 'premarketChangePercent',
										name: '',
										value: `over-0`,
										filterType: 'numeric',
										numberType: 'percentage'
									},
									{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
								],
								sort: [{ id: 'premarketChangePercent', desc: false }],
								showColumns: ['s', 'n', 'premarketChangePercent', 'premarketPrice', 'marketCap'],
								showResultsMenu: true
							}
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
	const data = await getSelect(query, false, extras)

	return {
		props: data,
		revalidate: 2 * 60
	}
}
