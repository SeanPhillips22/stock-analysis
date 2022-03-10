import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getMarketNews } from 'functions/apis/callBackEnd'
import { NewsNavigation } from 'components/News/NewsNavigation'
import { NewsFeed } from 'components/News/_NewsFeed'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Layout } from 'components/Layout/_Layout'

type Props = {
	data: News[]
	other: News[]
}

export default function AllStockNewsPage({ data, other }: Props) {
	const url = '/news/all-stocks/'

	return (
		<>
			<SEO
				title="All Stock News"
				description="The latest news on individual stocks on the US stock market, gathered from trusted finance and investing websites."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain pb-0">
					<h1 className="hh1">All Stock News</h1>
					<NewsNavigation />
				</div>

				<div className="sm:contain-content lg:right-sidebar">
					<div className="py-1 sm:pt-0 sm:pb-3">
						<NewsFeed data={data} related="Stocks" />
					</div>
					<aside className="contain sm:uncontain flex flex-col space-y-7 py-6 lg:space-y-10">
						<Sidebar1 key={url} />
						<NewsWidget
							title="Press Releases"
							news={other}
							button={{
								text: 'All Press Releases',
								url: '/news/press-releases/'
							}}
						/>
					</aside>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const { data, other } = await getMarketNews('stocks')

	return {
		props: {
			data,
			other
		}
	}
}
