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
import { GainersNav } from 'components/Markets/Navigation/GainersNav'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/gainers/',
	metaTitle: "Today's Top Stock Gainers",
	metaDescription:
		'A list of the stocks with the highest percentage gain today. See stock price, volume, market cap and more.',
	headingType: 'h1'
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'change',
	count: 20,
	sort: [{ id: 'change', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'change', 'price', 'volume', 'marketCap'],
	filters: ['price-over-1', 'change-over-0', 'volume-over-10000'],
	page: 1
}

type Props = {
	data: any[]
	tradingTimestamps: TableTimestamp
	resultsCount: number
}

export default function GainersPage({ data, tradingTimestamps, resultsCount }: Props) {
	return (
		<PageContextProvider value={{ page, updated: tradingTimestamps }}>
			<MarketsLayout SubNav={GainersNav}>
				<TableContextProvider
					value={{
						title: 'Gainers Today',
						tableId: 'gainers-v2',
						// description:
						// 	'The stocks with the highest percentage gain today, updated every five minutes. Includes stocks traded on the NASDAQ and NYSE, with stock price over $1, price change over 2% and trading volume over 10,000.',
						fixed: {
							defaultSort: query.sort,
							controls: {
								results: true,
								export: true,
								columns: true
							},
							pagination: true,
							resultsCount,
							columnOptions: MoverDataPoints,
							excludeColumns: ['premarketPrice', 'premarketChange', 'premarketChangePercent'],
							columnOrder: query.columns,
							fixedColumns: ['rank', 's', 'change']
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
		revalidate: 120
	}
}
