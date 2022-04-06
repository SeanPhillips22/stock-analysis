import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { Features } from 'components/Layout/Sidebar/Features'
import { Layout } from 'components/Layout/_Layout'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { getSelect } from 'functions/apis/getSelect'

type Props = {
	data: TableData
	getTrendingTimestamp: string
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'stocks',
	main: 'views',
	count: 20,
	sort: [{ id: 'views', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'views', 'marketCap', 'change', 'volume']
}

export default function Trending(props: Props) {
	const url = '/trending/'

	return (
		<>
			<SEO
				title="Today's Top Trending Stocks"
				description="A list of the top 20 most popular stocks today based on pageviews. The list is updated throughout the day."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain py-5 xs:py-6" id="trending">
					<h1 className="hh1 mb-0 border-b-[3px] border-blue-brand_sharp pb-3">Trending Today</h1>

					<div className="lg:right-sidebar mt-3 sm:mt-4 lg:mt-5">
						<div>
							<TableContextProvider
								value={{
									tableId: 'trending',
									title: `Top Stocks`,
									fixed: {
										defaultSort: query.sort,
										controls: {
											export: true,
											columns: true,
											results: true
										},
										columnOrder: query.columns,
										fixedColumns: ['rank', 's', 'views']
									},
									dynamic: query
								}}
							>
								<StockTable _data={props.data} />
							</TableContextProvider>
							<div className="mt-1.5 text-sm text-gray-600">
								Updated: {props.getTrendingTimestamp}. Stocks are sorted by pageviews according to Google
								Analytics.
							</div>
						</div>
						<aside className="space-y-8 py-0">
							<Sidebar1 key={url} />
							<Features />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['getTrendingTimestamp']
	const response = await getSelect(query, false, extras)

	return {
		props: response,
		revalidate: 5 * 60
	}
}
