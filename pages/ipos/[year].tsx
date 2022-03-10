import { GetStaticPaths, GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation'
import { InfoBox } from 'components/InfoBox'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { RecentIpoDataPoints } from 'data/DataPointGroups/RecentIpoDataPoints'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

type Props = {
	year: string
	data: TableData
	info: string
	getIpoNewsMin: News[]
	getIpoCalendarDataMin: SidebarTableProps
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	index: 'histip',
	main: 'ipoDate',
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'desc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export default function IpoYear(props: Props) {
	const { year } = props
	const url = `/ipos/${year}/`

	const title =
		year === '2022'
			? 'All 2022 IPOs (so far)'
			: `All ${year} IPOs - A Complete List`

	const description =
		year === '2022'
			? 'A list of all the stocks that have gone public with an IPO on the US stock market in the year 2022, so far.'
			: `A list of all the initial public offerings (IPOs) on the US stock market in the year ${year}. Includes detailed information about each stock.`

	return (
		<>
			<SEO title={title} description={description} canonical={url} />
			<Layout url={url}>
				<div className="contain ipos-recent" id="ipos">
					<h1 className="hh1">All {year} IPOs</h1>
					<IPONavigation path="" />
					<div className="lg:right-sidebar">
						<div>
							<RecentNavigation path={url} />
							<div className="mt-4 mb-2 lg:mb-3">
								<InfoBox text={props.info} />
							</div>
							<TableContextProvider
								value={{
									tableId: 'ipos-' + year,
									title: props.data.length + ' IPOs',
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
									dynamic: {
										...query,
										filters: ['ipoDate-year-' + year]
									}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const year = params?.year as string
	if (!['2022', '2021', '2020', '2019'].includes(year)) {
		return {
			notFound: true
		}
	}

	// Assemble the SSR request
	let extraFn = 'getIpoInfo' + year
	let extras = ['getIpoCalendarDataMin', 'getIpoNewsMin', extraFn]
	let ssrQuery = query
	ssrQuery.filters = ['ipoDate-year-' + year]

	// Fetch the data
	const response = await getSelect(ssrQuery, true, extras)
	response.props.year = year
	response.props.info = response.props[extraFn]
	delete response.props[extraFn]

	// Return the data to the page
	return response
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{ params: { year: '2022' } },
		{ params: { year: '2021' } },
		{ params: { year: '2020' } },
		{ params: { year: '2019' } }
	]

	return {
		paths,
		fallback: false
	}
}
