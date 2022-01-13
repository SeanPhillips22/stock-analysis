import { GetServerSideProps } from 'next/types'
import { StockTable } from 'components/StockTable/_StockTable'
import { MarketsLayout } from 'components/Markets/_MarkeysLayout'
import { PageConfig } from 'types/PageConfig'
import { DataId } from 'types/Data'
import { getSelect } from 'functions/apis/getSelect'
import { SelectConfig } from 'types/SelectConfig'
import { useEffect } from 'react'
import { stockTableState } from 'components/StockTable/stockTableState'

// the page's config and settings
const config: PageConfig = {
	path: '/markets/gainers/',
	title: 'Top Stock Gainers',
	parentTitle: 'Market Movers',
	active: 'gainers',
	controls: {
		range: true,
		results: true,
		filter: false,
		export: true,
		columns: true
	},
	metaTitle: "Today's Top Stock Gainers"
}

// the initial columns to show in the table
const columns: DataId[] = ['s', 'n', 'price', 'change', 'volume', 'marketCap']

// the initial config for the page data
// this will be fetched from the select endpoint on the backend
const selectConfig: SelectConfig = {
	type: 'stocks',
	main: 'change',
	count: 20,
	sort: 'desc',
	columns: columns
}

export default function GainersPage({ data }: { data: any[] }) {
	const resetTableState = stockTableState((state) => state.resetTableState)

	// reset the stable when the page is loaded
	useEffect(() => {
		resetTableState(selectConfig)
	}, [resetTableState])

	return (
		<MarketsLayout config={config}>
			<StockTable _data={data} _columns={columns} config={config} />
		</MarketsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const data = await getSelect(selectConfig, true)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}

// ? Fetch from the select endpoint via SSR, but pass the timestamp to React Query for revalidation
// ? make it posssible to select 1D/1W/1M/3M/6M/YTD/1Y/3Y/5Y/10Y
