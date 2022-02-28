import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { NewsFeed } from 'components/News/_NewsFeed'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

interface Props {
	data: News[]
	upcoming: SidebarTableProps
	recent: SidebarTableProps
}

export const IpoNews = ({ data, upcoming, recent }: Props) => {
	const url = '/ipos/news/'

	return (
		<>
			<SEO
				title="Latest IPO News"
				description="The latest news about initial public offerings (IPOs) on the stock market, including both recent and upcoming IPOs."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain pb-0">
					<h1 className="hh1">IPO News</h1>
					<IPONavigation path="news" />
				</div>

				<div className="sm:contain-content lg:right-sidebar">
					<div className="py-1">
						<NewsFeed data={data} related="Stocks" />
					</div>
					<aside className="contain sm:uncontain flex flex-col space-y-7 pt-6 lg:space-y-10">
						<SidebarTable
							title="Upcoming IPOs"
							btnTitle="Full IPO Calendar"
							btnUrl="/ipos/calendar/"
							data={upcoming}
						/>
						<Sidebar1 key={url} />
						<SidebarTable
							title="Latest IPOs"
							btnTitle="All Recent IPOs"
							btnUrl="/ipos/"
							data={recent}
						/>
					</aside>
				</div>
			</Layout>
		</>
	)
}

export default IpoNews

export const getStaticProps: GetStaticProps = async () => {
	const { data, upcoming, recent } = await getIpoData('news')

	return {
		props: {
			data,
			upcoming,
			recent
		}
	}
}
