import { GetServerSideProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getMarketNews } from 'functions/apis/callBackEnd'
import { NewsNavigation } from 'components/News/NewsNavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { NewsFeed } from 'components/News/_NewsFeed'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: News[]
	other: News[]
}

export const MarketNews = ({ data, other }: Props) => {
	return (
		<>
			<SEO
				title="Today's Stock Market News and Breaking Stories"
				description="Get the latest stock market news and breaking stories from the world's best finance and investing websites."
				canonical="/news/"
			/>
			<Layout>
				<div className="contain pb-0">
					<Breadcrumbs url="/news/" />
					<h1 className="hh1">Stock Market News</h1>
					<NewsNavigation />
				</div>

				<div className="sm:contain-content lg:right-sidebar">
					<div className="py-1 sm:pt-0 sm:pb-3">
						<NewsFeed data={data} />
					</div>
					<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
						<Sidebar1 />
						<NewsWidget
							title="Stock News"
							news={other}
							button={{
								text: 'All Stock News',
								url: '/news/all-stocks/'
							}}
						/>
						<Sidebar2 />
					</aside>
				</div>
			</Layout>
		</>
	)
}

export default MarketNews

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, other } = await getMarketNews('market')

	res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return {
		props: {
			data,
			other
		}
	}
}
