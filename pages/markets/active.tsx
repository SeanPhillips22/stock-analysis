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

// the page's config and settings
const config: PageConfig = {
	path: '/markets/active/',
	title: 'Most Active Stocks',
	parentTitle: 'Market Movers',
	active: 'active',
	controls: {
		range: true,
		results: true,
		filter: false,
		export: true,
		columns: true
	},
	metaTitle: "Today's Most Active Stocks"
}

// the initial columns to show in the table
const columns: DataId[] = ['s', 'n', 'change', 'price', 'marketCap']

// the initial config for the page data
// this will be fetched from the select endpoint on the backend
const selectConfig: SelectConfig = {
	type: 'stocks',
	main: 'volume',
	count: 20,
	sort: 'desc',
	columns: columns,
	columnOptions: MoverColumns,
	filters: ['price-over-1', 'close-over-1']
}

export default function ActivePage({ data }: { data: any[] }) {
	const resetTableState = stockTableState(state => state.resetTableState)

	// reset the stable when the page is loaded
	useEffect(() => {
		resetTableState(selectConfig)
	}, [resetTableState])

	return (
		<MarketsLayout config={config}>
			<StockTable _data={data} config={config} />
		</MarketsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const data = await getSelect(selectConfig, true)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
	return data
}
