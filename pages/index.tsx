import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { Hero } from 'components/HomePage/Hero'
import { Movers } from 'components/HomePage/Movers'
import { LatestNews } from 'components/HomePage/LatestNews'
import { IPOwidgets } from 'components/HomePage/IPOwidgets'
import { getHomePageData } from 'functions/apis/callBackEnd'
import { Layout } from 'components/Layout/_Layout'

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
			<Layout fullWidth={true} url="/">
				<Hero trending={data.trending} />
				<Movers
					date={data.date}
					marketStatus={data.marketStatus}
					gainers={data.gainers}
					losers={data.losers}
				/>
				<div className="mx-auto flex flex-col space-y-6 lg:grid lg:max-w-[1200px] lg:grid-cols-3 lg:justify-evenly lg:gap-8 lg:px-5">
					<LatestNews news={data.news} />
					<IPOwidgets
						recent={data.recentIpos}
						upcoming={data.ipoCalendar}
					/>
				</div>
			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getHomePageData()

	return {
		props: {
			data
		}
	}
}
