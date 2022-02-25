import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { IpoRecent, IpoUpcoming } from 'types/Ipos'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentTableMin } from 'components/IPOs/RecentTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'
import { TableDynamic } from 'components/StockTable/TableTypes'
import { getSelect } from 'functions/apis/getSelect'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { FutureIpoDataPoints } from 'data/DataPointGroups/FutureIpoDataPoints'
import { StockTable } from 'components/StockTable/__StockTable'

type Props = {
	data: IpoUpcoming[]
	getIposRecentMin: IpoRecent[]
	getIpoNewsMin: News[]
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'futip',
	main: 'withdrawnDateFB',
	sort: [{ id: 'withdrawnDateFB', desc: true }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoStatus-is-withdrawn']
}

export default function IposWithdrawn(props: Props) {
	const url = '/ipos/withdrawn/'
	const count = props.data.length

	return (
		<>
			<SEO
				title="Withdrawn IPOs"
				description="A list of companies that have withdrawn their U.S. stock market IPO within the last year."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain">
					<h1 className="hh1">Withdrawn IPOs</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar">
						<div>
							<CalendarNavigation path="withdrawn" />
							<div className="py-2 lg:py-4">
								<TableContextProvider
									value={{
										tableId: 'ipos-withdrawn',
										title: `${count} IPOs`,
										fixed: {
											defaultSort: query.sort,
											controls: {
												filter: true,
												export: true,
												columns: true
											},
											columnOptions: FutureIpoDataPoints,
											columnOrder: [
												'withdrawnDateFB',
												's',
												'n',
												'exchange',
												'ipoPriceRange',
												'sharesOffered'
											]
										},
										dynamic: query
									}}
								>
									<StockTable _data={props.data} />
								</TableContextProvider>
							</div>
						</div>
						<aside className="flex flex-col space-y-8 pt-4 lg:space-y-10 lg:pt-5">
							<RecentTableMin recent={props.getIposRecentMin} />
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
	let extras = ['getIposRecentMin', 'getIpoNewsMin']
	const response = await getSelect(query, true, extras)

	return response
}
