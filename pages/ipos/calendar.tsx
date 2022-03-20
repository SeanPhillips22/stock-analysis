import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { IPOSources } from 'components/IPOs/IPOSources'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { FutureIpoDataPoints } from 'data/DataPointGroups/FutureIpoDataPoints'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { LaterExplanation } from 'components/IPOs/LaterExplanation'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

type Props = {
	response: {
		data: TableData
		getIposRecentMin: SidebarTableProps
		getIpoFilingsMin: SidebarTableProps
		getFilingsCount: number
	}
	later: {
		data: TableData[]
	}
}

// the initial config for the select endpoint to fetch data
const queryWeek: TableDynamic = {
	index: 'futip',
	main: 'ipoDate',
	sort: [{ id: 'ipoDate', desc: false }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoDate-is-thisweek']
}

// the initial config for the select endpoint to fetch data
const queryLater: TableDynamic = {
	index: 'futip',
	main: 'ipoDate',
	sort: [{ id: 'ipoDate', desc: false }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoDate-is-nextweek']
}

export default function IpoCalendar(props: Props) {
	const url = '/ipos/calendar/'

	return (
		<>
			<SEO
				title="IPO Calendar - All Upcoming IPOs"
				description="An IPO calendar with all upcoming initial public offerings (IPOs) on the stock market. Includes IPO dates, prices, how many shares are offered and more."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain" id="ipos">
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar" id="calendar">
						<div>
							<CalendarNavigation path={url} />
							<div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7">
								<TableContextProvider
									value={{
										tableId: 'ipo-calendar',
										title: `This Week · ${props.response.data.length} IPOs`,
										fixed: {
											defaultSort: queryWeek.sort,
											controls: {
												filter: true,
												export: true,
												columns: true
											},
											columnOptions: FutureIpoDataPoints,
											columnOrder: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
											fallback: {
												title: 'This Week · 0 IPOs',
												text: 'There are no upcoming IPOs remaining for this week.'
											}
										},
										dynamic: queryWeek
									}}
								>
									<StockTable _data={props.response.data} />
								</TableContextProvider>
								<TableContextProvider
									value={{
										tableId: 'ipo-calendar-later',
										title: `Next Week · ${props.later.data.length} IPOs`,
										fixed: {
											defaultSort: queryLater.sort,
											controls: {
												filter: true,
												export: true,
												columns: true
											},
											columnOptions: FutureIpoDataPoints,
											columnOrder: ['ipoDate', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
											fallback: {
												title: 'Next Week · 0 IPOs',
												text: 'There are no IPOs scheduled for next week.'
											}
										},
										dynamic: queryLater
									}}
								>
									<StockTable _data={props.later.data} />
								</TableContextProvider>
								<LaterExplanation />
								<IPOSources />
							</div>
						</div>
						<div className="flex flex-col pt-4">
							<aside className="space-y-8 lg:space-y-10">
								<SidebarTable
									title="Latest IPOs"
									btnTitle="All Recent IPOs"
									btnUrl="/ipos/"
									data={props.response.getIposRecentMin}
								/>
								<Sidebar1 key={url} />
								<SidebarTable
									title="Unscheduled IPOs"
									btnTitle="All IPO Filings"
									btnUrl="/ipos/filings/"
									data={props.response.getIpoFilingsMin}
									count={props.response.getFilingsCount}
								/>
							</aside>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['getIposRecentMin', 'getIpoFilingsMin', 'getFilingsCount']
	const [response, later] = await Promise.all([getSelect(queryWeek, false, extras), getSelect(queryLater)])

	return {
		props: {
			response,
			later
		}
	}
}
