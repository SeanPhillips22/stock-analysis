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
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: IpoUpcoming[]
	news: News[]
	recent: IpoRecent[]
}

export const IposWithdrawn = ({ data, news, recent }: Props) => {
	const count = data.length

	return (
		<>
			<SEO
				title="Withdrawn IPOs"
				description="A list of companies that have withdrawn their U.S. stock market IPO within the last year."
				canonical="/ipos/withdrawn/"
			/>
			<Layout>
				<div className="contain">
					<Breadcrumbs url="/ipos/withdrawn/" />
					<h1 className="hh1">Withdrawn IPOs</h1>
					<IPONavigation path="calendar" />
					<div className="lg:right-sidebar">
						<div>
							<CalendarNavigation path="withdrawn" />
							<div className="py-2 lg:py-4">
								<CalendarTable
									title={`${count} IPOs`}
									data={data}
									tableId="withdrawn"
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
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default IposWithdrawn

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, news, recent } = await getIpoData('withdrawn')

	res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return {
		props: {
			data,
			news,
			recent
		}
	}
}
