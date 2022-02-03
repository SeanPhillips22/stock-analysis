import { GetServerSideProps } from 'next'
import { IpoRecent, IpoUpcoming } from 'types/Ipos'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Sidebar2 } from 'components/Ads/AdSense/Sidebar2'
import { Layout } from 'components/Layout/_Layout'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { TableDynamic } from 'components/StockTable/TableTypes'
import { RecentIpoDataPoints } from 'data/DataPointGroups/RecentIpoDataPoints'

type Props = {
	data: IpoRecent[]
	getIpoNewsMin: News[]
	getIpoCalendarDataMin: IpoUpcoming[]
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'ipoDate',
	count: 200,
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export default function RecentIpos(props: Props) {
	return (
		<>
			<SEO
				title="200 Most Recent IPOs"
				description="Detailed information the last 200 IPOs (initial public offerings) on the stock market. Includes IPO prices, dates, total returns and more."
				canonical="/ipos/"
			/>
			<Layout>
				<div className="contain ipos-recent">
					<Breadcrumbs url="/ipos/" />
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation path="" />

					<div className="lg:right-sidebar">
						<div>
							<RecentNavigation path="" />
							<TableContextProvider
								value={{
									type: 'histip',
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
							<CalendarTableMin upcoming={props.getIpoCalendarDataMin} />
							<Sidebar1 />
							<NewsWidget
								title="IPO News"
								news={props.getIpoNewsMin}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/'
								}}
							/>
							<Sidebar2 />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin']
	const response = await getSelect(query, 'histip', true, extras)

	res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
	return response
}
