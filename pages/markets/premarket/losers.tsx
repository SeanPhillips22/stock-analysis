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
import { InfoTutorial } from 'components/InfoTutorial/InfoTutorial'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/premarket/losers/',
	metaTitle: "Today's Premarket Losers",
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'premarketChangePercent',
	count: 20,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'asc',
	columns: ['rank', 's', 'n', 'premarketChangePercent', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['premarketChangePercent-under-0', 'price-over-1', 'close-over-1', 'marketCap-over-1000000'],
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
				<InfoTutorial
					text="Stocks with the highest percentage loss during pre-market trading, updated every five minutes between 4:15 and 9:30 am ET on Mon-Fri."
					docsLink="/docs/premarket-movers/"
					storageKey="premarket-movers-infobox"
					classes="mb-3"
				/>
				<TableContextProvider
					value={{
						title: 'Premarket Losers',
						tableId: 'premarket-losers-v2',
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
							excludeColumns: ['price', 'volume'],
							columnOrder: query.columns,
							fixedColumns: ['rank', 's', 'premarketChangePercent'],
							screener: {
								type: 'stocks',
								filters: [
									{
										id: 'premarketChangePercent',
										name: '',
										value: `under-0`,
										filterType: 'numeric',
										numberType: 'percentage'
									},
									{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
									{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
								],
								sort: [{ id: 'premarketChangePercent', desc: true }],
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
