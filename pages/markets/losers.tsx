import { GetServerSideProps } from 'next/types'
import { StockTable } from 'components/StockTable/__StockTable'
import { MarketsLayout } from 'components/Markets/_MarkeysLayout'
import { PageConfig } from 'types/PageConfig'
import { DataId } from 'types/Data'
import { getSelect } from 'functions/apis/getSelect'
import { SelectConfig } from 'types/SelectConfig'
import { MoverColumns } from 'data/column-groups/movers.columns'
import { useEffect } from 'react'
import { stockTableState } from 'components/StockTable/stockTableState'
import { TableTimestamp } from 'types/Tables'
import { TableContextProvider } from 'components/StockTable/TableContext'

// the page's config and settings
const config: PageConfig = {
	path: '/markets/losers/',
	title: 'Losers Today',
	parentTitle: 'Top Stock Losers',
	active: 'losers',
	controls: {
		range: true,
		results: true,
		filter: false,
		export: true,
		columns: true
	},
	metaTitle: "Today's Top Stock Losers",
	metaDescription:
		'A list of the stocks with the highest percentage loss today. See stock price, volume, market cap and more.'
}

// the initial columns to show in the table
const columns: DataId[] = ['s', 'n', 'price', 'volume', 'marketCap']

// the initial config for the page data
// this will be fetched from the select endpoint on the backend
const selectConfig: SelectConfig = {
	type: 'stocks',
	active: 'losers',
	main: 'change',
	count: 20,
	sort: 'asc',
	defaultSort: [{ id: 'change', desc: false }],
	columns: columns,
	columnOptions: MoverColumns,
	filters: ['price-over-1', 'close-over-1', 'volume-over-1000']
}

type Props = {
	data: any[]
	updated: TableTimestamp
}

export default function LosersPage({ data, updated }: Props) {
	const resetTableState = stockTableState(state => state.resetTableState)

	// reset the stable when the page is loaded
	useEffect(() => {
		resetTableState(selectConfig)
	}, [resetTableState])

	return (
		<MarketsLayout config={config}>
			<TableContextProvider value={{ config, updated }}>
				<StockTable _data={data} />
			</TableContextProvider>
		</MarketsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const data = await getSelect(selectConfig, true)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
	return data
}
