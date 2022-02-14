import { GetServerSideProps } from 'next'
import { IpoRecent, IpoUpcoming } from 'types/Ipos'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation'
import { InfoBox } from 'components/InfoBox'
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'
import { TableDynamic } from 'components/StockTable/TableTypes'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { StockTable } from 'components/StockTable/__StockTable'
import { getSelect } from 'functions/apis/getSelect'
import { RecentIpoDataPoints } from 'data/DataPointGroups/RecentIpoDataPoints'

type Props = {
	year: string
	data: IpoRecent[]
	info: string
	getIpoNewsMin: News[]
	getIpoCalendarDataMin: IpoUpcoming[]
}

// the initial config for the select endpoint to fetch data
const query: TableDynamic = {
	main: 'ipoDate',
	sort: [{ id: 'ipoDate', desc: true }],
	sortDirection: 'asc',
	columns: ['s', 'n', 'ipp', 'ippc', 'ipr']
}

export default function IpoYear(props: Props) {
	const { year } = props

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
			<SEO
				title={title}
				description={description}
				canonical={`/ipos/${year}/`}
			/>
			<Layout url={`/ipos/${year}/`}>
				<div className="contain ipos-recent">
					<h1 className="hh1">All {year} IPOs</h1>
					<IPONavigation path="" />
					<div className="lg:right-sidebar">
						<div>
							<RecentNavigation path={year} />
							<div className="mt-4 mb-2 lg:mb-3">
								<InfoBox text={props.info} />
							</div>
							<TableContextProvider
								value={{
									type: 'histip',
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
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const year = context?.params?.year as string
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
	const response = await getSelect(ssrQuery, 'histip', true, extras)
	response.props.year = year
	response.props.info = response.props[extraFn]
	delete response.props[extraFn]

	// Cache on the edge
	let cache =
		year === '2022'
			? 'public, max-age=0, s-max-age=300'
			: 'public, max-age=0, s-max-age=1800'
	context.res.setHeader('Cache-Control', cache)

	// Return the data to the page
	return response
}
