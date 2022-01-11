import { GetServerSideProps } from 'next/types'
import { getSSR } from 'functions/apis/callBackEnd'
import { StockTable } from 'components/StockTable/_StockTable'
import { MarketsLayout } from 'components/Markets/_MarkeysLayout'
import { PageConfig } from 'types/PageConfig'

const columns = ['s', 'n', 'price', 'change', 'volume', 'marketCap']
const config: PageConfig = {
	title: 'Top Stock Losers',
	parentTitle: 'Market Movers',
	active: 'losers',
	controls: {
		range: true,
		results: true,
		filter: true,
		export: true,
		columns: true
	}
}

export default function GainersPage({ data }: { data: any[] }) {
	return (
		<MarketsLayout config={config}>
			<StockTable _data={data} _columns={columns} config={config} />
		</MarketsLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let cols = columns.join(',')

	const data = await getSSR(
		'select?type=stocks&main=change&count=20&sort=asc&columns=' + cols
	)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}

// ? Fetch from the select endpoint via SSR, but pass the timestamp to React Query for revalidation
// ? make it posssible to select 1D/1W/1M/3M/6M/YTD/1Y/3Y/5Y/10Y
