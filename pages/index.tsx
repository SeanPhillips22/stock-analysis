import { GetServerSideProps } from 'next'
import { SEO } from 'components/SEO'
import { Hero } from 'components/HomePage/Hero'
import { Movers } from 'components/HomePage/Movers'
import { LatestNews } from 'components/HomePage/LatestNews'
import { IPOwidgets } from 'components/HomePage/IPOwidgets'
import { getHomePageData } from 'functions/callBackEnd'
import { LeftNav } from 'components/Layout/Navigation/LeftNav'
import { DisplayFooterAd } from 'components/Ads/Dianomi/DisplayFooterAd'

type Trending = {
	s: string
	n: string
	t: string
}

type IposMin = {
	date: string
	symbol: string
	name: string
}

type NewsMin = {
	t: string
	u: string
	n: string
	d: string
}

type Mover = {
	s: string
	n: string
	p: string
	c: string
}

interface FrontPageProps {
	data: {
		date: string
		marketStatus: string
		gainers: Mover[]
		losers: Mover[]
		ipoCalendar: IposMin[]
		recentIpos: IposMin[]
		news: NewsMin[]
		trending: Trending[]
	}
}

export default function FrontPage({ data }: FrontPageProps) {
	return (
		<>
			<SEO
				title="Stock Analysis | Free Online Stock Information for Investors"
				description="Stock Analysis has everything you need to analyze stocks, including detailed financial data, statistics, news and charts."
				canonical="/"
				schema={{
					'@context': 'https://schema.org',
					'@type': 'Organization',
					url: 'https://stockanalysis.com/',
					name: 'Stock Analysis',
					logo: 'https://stockanalysis.com/logo.png',
					sameAs: [
						'https://www.facebook.com/stockanalysisoff/',
						'https://twitter.com/stock_analysisx',
						'https://www.linkedin.com/company/stock-analysis/'
					]
				}}
			/>
			<main id="main">
				<Hero trending={data.trending} />
				<div className="xxl:grid xxl:grid-cols-leftnav max-w-screen-2xl mx-auto">
					<aside className="hidden xxl:block border-r border-gray-200">
						<LeftNav />
					</aside>
					<div>
						<Movers
							date={data.date}
							marketStatus={data.marketStatus}
							gainers={data.gainers}
							losers={data.losers}
						/>
						<div className="mx-auto flex flex-col space-y-6 lg:grid lg:grid-cols-3 lg:justify-evenly lg:gap-8 lg:px-5 lg:max-w-[1200px]">
							<LatestNews news={data.news} />
							<IPOwidgets
								recent={data.recentIpos}
								upcoming={data.ipoCalendar}
							/>
						</div>
						<DisplayFooterAd />
					</div>
				</div>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const data = await getHomePageData()

	res.setHeader(
		'Cache-Control',
		'no-cache, no-store, max-age=0, must-revalidate'
	)

	return {
		props: {
			data
		}
	}
}
