import { GetServerSideProps } from 'next/types'
import { Layout } from 'components/Layout/_Layout'
import { getSSR } from 'functions/apis/callBackEnd'
import { StockTable } from 'components/StockTable/_StockTable'
import { createContext } from 'react'

export const TableContext = createContext<any>([])

export default function GainersPage({ data }: { data: any[] }) {
	const state = {
		data,
		columns: ['s', 'n', 'price', 'change', 'volume', 'marketCap', 'industry']
	}

	return (
		<Layout>
			<div className="contain">
				<h1 className="hh1">Top Stock Gainers</h1>
				<TableContext.Provider value={state}>
					<StockTable />
				</TableContext.Provider>
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const data = await getSSR(
		'select?type=stocks&main=change&columns=price,volume,marketCap,industry&count=20'
	)
	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}

// ? Fetch from the select endpoint via SSR, but pass the timestamp to React Query for revalidation
// ? make it posssible to select 1D/1W/1M/3M/6M/YTD/1Y/3Y/5Y/10Y
