import { GetServerSideProps } from 'next'
import { News } from 'types/News'
import { IpoUpcoming, IpoRecent } from 'types/Ipos'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { NewsFeed } from 'components/News/_NewsFeed'
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin'
import { RecentTableMin } from 'components/IPOs/RecentTableMin'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: News[]
	upcoming: IpoUpcoming[]
	recent: IpoRecent[]
}

export const IpoNews = ({ data, upcoming, recent }: Props) => {
	return (
		<>
			<SEO
				title="Latest IPO News"
				description="The latest news about initial public offerings (IPOs) on the stock market, including both recent and upcoming IPOs."
				canonical="/ipos/news/"
			/>
			<Layout>
				<div className="contain pb-0">
					<Breadcrumbs url="/ipos/news/" />
					<h1 className="hh1">IPO News</h1>
					<IPONavigation path="news" />
				</div>

				<div className="sm:contain-content lg:right-sidebar">
					<div className="py-1">
						<NewsFeed data={data} related="Stocks" />
					</div>
					<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 pt-6">
						<CalendarTableMin upcoming={upcoming} />
						<Sidebar1 />
						<RecentTableMin recent={recent} />
						<Sidebar2 />
					</aside>
				</div>
			</Layout>
		</>
	)
}

export default IpoNews

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, upcoming, recent } = await getIpoData('news')

	res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return {
		props: {
			data,
			upcoming,
			recent
		}
	}
}
