import { GetServerSideProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getMarketNews } from 'functions/apis/callBackEnd'
import { NewsNavigation } from 'components/News/NewsNavigation'
import { NewsFeed } from 'components/News/_NewsFeed'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: News[]
	other: News[]
}

export const MarketNews = ({ data, other }: Props) => {
	const url = '/news/'

	return (
		<>
			<SEO
				title="Today's Stock Market News and Breaking Stories"
				description="Get the latest stock market news and breaking stories from the world's best finance and investing websites."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain pb-0">
					<h1 className="hh1">Stock Market News</h1>
					<NewsNavigation />
				</div>

				<div className="sm:contain-content lg:right-sidebar">
					<div className="py-1 sm:pt-0 sm:pb-3">
						<NewsFeed data={data} />
					</div>
					<aside className="contain sm:uncontain flex flex-col space-y-7 py-6 lg:space-y-10">
						<Sidebar1 key={url} />
						<NewsWidget
							title="Stock News"
							news={other}
							button={{
								text: 'All Stock News',
								url: '/news/all-stocks/'
							}}
						/>
					</aside>
				</div>
			</Layout>
		</>
	)
}

export default MarketNews

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, other } = await getMarketNews('market')

	res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=60')

	return {
		props: {
			data,
			other
		}
	}
}
