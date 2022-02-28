import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { RecentIpoDataPoints } from 'data/DataPointGroups/RecentIpoDataPoints'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

type Props = {
	data: TableData
	getIpoNewsMin: News[]
	getIpoCalendarDataMin: SidebarTableProps
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'histip',
	main: 'ipoDate',
	count: 200,
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export default function RecentIpos(props: Props) {
	const url = '/ipos/'

	return (
		<>
			<SEO
				title="200 Most Recent IPOs"
				description="Detailed information the last 200 IPOs (initial public offerings) on the stock market. Includes IPO prices, dates, total returns and more."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain ipos-recent" id="ipos">
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation path="" />

					<div className="lg:right-sidebar">
						<div>
							<RecentNavigation path={url} />
							<TableContextProvider
								value={{
									tableId: 'ipos-recent',
									title: 'Last 200 IPOs',
									fixed: {
										defaultSort: query.sort,
										controls: {
											filter: true,
											export: true,
											columns: true
										},
										columnOptions: RecentIpoDataPoints,
										columnOrder: [
											'ipoDate',
											's',
											'n',
											'ipp',
											'ippc',
											'ipr'
										]
									},
									dynamic: query
								}}
							>
								<StockTable _data={props.data} />
							</TableContextProvider>
						</div>
						<aside className="flex flex-col space-y-10 pt-6">
							<SidebarTable
								title="Upcoming IPOs"
								btnTitle="Full IPO Calendar"
								btnUrl="/ipos/calendar/"
								data={props.getIpoCalendarDataMin}
							/>
							<Sidebar1 key={url} />
							<NewsWidget
								title="IPO News"
								news={props.getIpoNewsMin}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/'
								}}
							/>
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin']
	const response = await getSelect(query, true, extras)

	return response
}
