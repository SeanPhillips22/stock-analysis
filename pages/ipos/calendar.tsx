import { GetStaticProps } from 'next'
import { CalendarData, IpoRecent, FilingMin } from 'types/Ipos'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { CalendarTable } from 'components/IPOs/CalendarTable'
import { LaterExplanation } from 'components/IPOs/LaterExplanation'
import { IPOSources } from 'components/IPOs/IPOSources'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { RecentTableMin } from 'components/IPOs/RecentTableMin'
import { FilingTableMin } from 'components/IPOs/FilingTableMin'
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'

interface Props {
	data: CalendarData
	recent: IpoRecent[]
	filings: FilingMin[]
}

export const IpoCalendar = ({ data, recent, filings }: Props) => {
	const url = '/ipos/calendar/'

	return (
		<>
			<SEO
				title="IPO Calendar - All Upcoming IPOs"
				description="An IPO calendar with all upcoming initial public offerings (IPOs) on the stock market. Includes IPO dates, prices, how many shares are offered and more."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain">
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar">
						<div>
							<CalendarNavigation path="calendar" />
							<div className="flex flex-col space-y-4 py-2 xs:space-y-5 sm:space-y-7 lg:py-4">
								<CalendarTable
									title="This Week"
									data={data.thisweek}
									tableId="this-week"
									border={true}
								/>
								<CalendarTable
									title="Next Week"
									data={data.nextweek}
									tableId="next-week"
								/>
								{data.later.length ? (
									<CalendarTable
										title="After Next Week"
										data={data.later}
										tableId="later"
									/>
								) : (
									<LaterExplanation />
								)}
								<IPOSources />
							</div>
						</div>
						<div className="flex flex-col pt-3 lg:pt-4">
							<aside className="space-y-8 lg:space-y-10">
								<RecentTableMin recent={recent} />
								<Sidebar1 key={url} />
								<FilingTableMin
									filings={filings}
									count={data.counts.unscheduled}
								/>
							</aside>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default IpoCalendar

export const getStaticProps: GetStaticProps = async () => {
	const { data, recent, filings } = await getIpoData('calendar')

	return {
		props: {
			data,
			recent,
			filings
		}
	}
}
