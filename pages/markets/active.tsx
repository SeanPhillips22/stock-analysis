import { GetServerSideProps } from 'next/types'
import { StockTable } from 'components/StockTable/__StockTable'
import { MarketsLayout } from 'components/Markets/_MarkeysLayout'
import { PageConfig } from 'types/PageConfig'
import { DataId } from 'types/Data'
import { getSelect } from 'functions/apis/getSelect'
import { SelectConfig } from 'types/SelectConfig'
import { useEffect } from 'react'
import { stockTableState } from 'components/StockTable/stockTableState'
import { MoverColumns } from 'data/column-groups/movers.columns'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { TableTimestamp } from 'types/Tables'

// the page's config and settings
const config: PageConfig = {
	path: '/markets/active/',
	title: 'Active Today',
	parentTitle: 'Most Active Stocks',
	active: 'active',
	controls: {
		range: false,
		results: true,
		filter: true,
		export: true,
		columns: true
	},
	metaTitle: "Today's Most Active Stocks",
	metaDescription:
		'A list of the stocks with the highest trading volume today. See stock price, price changes, market cap and more.'
}

// the initial columns to show in the table
const columns: DataId[] = ['s', 'n', 'change', 'price', 'marketCap']

// the initial config for the page data
// this will be fetched from the select endpoint on the backend
const selectConfig: SelectConfig = {
	type: 'stocks',
	active: 'active',
	main: 'volume',
	count: 20,
	sort: 'desc',
	columns: columns,
	columnOptions: MoverColumns,
	filters: ['price-over-1', 'close-over-1']
}

type Props = {
	data: any[]
	updated: TableTimestamp
}

export default function ActivePage({ data, updated }: Props) {
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
