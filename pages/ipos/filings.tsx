import { GetServerSideProps } from 'next'
import { News } from 'types/News'
import { IpoRecent, IpoUpcoming } from 'types/Ipos'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { CalendarTable } from 'components/IPOs/CalendarTable'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { RecentTableMin } from 'components/IPOs/RecentTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Sidebar2 } from 'components/Ads/AdSense/Sidebar2'
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: IpoUpcoming[]
	news: News[]
	recent: IpoRecent[]
}

export function IpoFilings({ data, news, recent }: Props) {
	const count = data.length

	return (
		<>
			<SEO
				title="IPO Filings"
				description="A list of all stocks that have filed for an initial public offering (IPO) on the US stock market, but have not set an estimated IPO date yet."
				canonical="/ipos/filings/"
			/>
			<Layout>
				<div className="contain">
					<Breadcrumbs url="/ipos/filings/" />
					<h1 className="hh1">IPO Filings</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar">
						<div>
							<CalendarNavigation path="filings" />
							<div className="py-2 lg:py-4">
								<CalendarTable
									title={`${count} IPOs`}
									data={data}
									tableId="filings"
									border={true}
									filter={true}
								/>
							</div>
						</div>
						<aside className="flex flex-col space-y-8 lg:space-y-10 pt-4 lg:pt-5">
							<RecentTableMin recent={recent} />
							<Sidebar1 />
							<NewsWidget
								title="IPO News"
								news={news}
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

export default IpoFilings

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, news, recent } = await getIpoData('filings')

	res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=600')

	return {
		props: {
			data,
			news,
			recent
		}
	}
}
