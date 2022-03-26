/* eslint-disable react/jsx-no-undef */
import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'
import { getSelect } from 'functions/apis/getSelect'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { FutureIpoDataPoints } from 'data/DataPointGroups/FutureIpoDataPoints'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

type Props = {
	data: TableData
	getIposRecentMin: SidebarTableProps
	getIpoNewsMin: News[]
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'futip',
	main: 'filingDateFB',
	sort: [{ id: 'filingDateFB', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
	filters: ['ipoDate-is-null', 'ipoStatus-isnot-withdrawn']
}

export default function IpoFilings(props: Props) {
	const url = '/ipos/filings/'
	const count = props.data.length

	return (
		<>
			<SEO
				title="IPO Filings"
				description="A list of all stocks that have filed for an initial public offering (IPO) on the US stock market, but have not set an estimated IPO date yet."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain" id="ipos">
					<h1 className="hh1">IPO Filings</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar">
						<div>
							<CalendarNavigation path={url} />
							<TableContextProvider
								value={{
									tableId: 'ipo-filings-v2',
									title: `${count} Filings`,
									fixed: {
										defaultSort: query.sort,
										controls: {
											filter: true,
											export: true,
											columns: true
										},
										columnOptions: FutureIpoDataPoints,
										excludeColumns: ['withdrawnDateFB', 'ipoDate'],
										columnOrder: ['filingDateFB', 's', 'n', 'exchange', 'ipoPriceRange', 'sharesOffered'],
										fixedColumns: ['filingDateFB', 's']
									},
									dynamic: query
								}}
							>
								<StockTable _data={props.data} />
							</TableContextProvider>
						</div>
						<aside className="flex flex-col space-y-8 pt-4 lg:space-y-10 lg:pt-5">
							<SidebarTable
								title="Latest IPOs"
								btnTitle="All Recent IPOs"
								btnUrl="/ipos/"
								data={props.getIposRecentMin}
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
	let extras = ['getIposRecentMin', 'getIpoNewsMin']
	const response = await getSelect(query, false, extras)

	return {
		props: response,
		revalidate: 5 * 60
	}
}
