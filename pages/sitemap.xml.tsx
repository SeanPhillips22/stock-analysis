import { getData } from 'functions/apis/API'
import { GetServerSideProps } from 'next'

const Sitemap = () => {
	/* Do nothing */
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const pages = [
		'about/',
		'contact/',
		'privacy-policy/',
		'terms-of-use/',
		'data-disclaimer/',
		'sitemap/',
		'pro/',
		'apis/',
		'stocks/',
		'etf/',
		'ipos/',
		'ipos/calendar/',
		'ipos/2022/',
		'ipos/2021/',
		'ipos/2020/',
		'ipos/2019/',
		'ipos/news/',
		'ipos/statistics/',
		'ipos/filings/',
		'ipos/withdrawn/',
		'news/',
		'news/all-stocks/',
		'news/press-releases/',
		'trending/',
		'screener/stock/',
		'screener/ipo/',
		'screener/etf/',
		'markets/gainers/',
		'markets/losers/',
		'markets/active/',
		'markets/premarket/',
		'markets/premarket/gainers/',
		'markets/premarket/losers/',
		'actions/',
		'actions/listed/',
		'actions/delisted/',
		'actions/splits/',
		'actions/changes/',
		'actions/spinoffs/',
		'actions/bankruptcies/',
		'actions/acquisitions/',
		'stock-market-hours/',
		'berkshire-class-a-and-class-b-stock/',
		'safe-low-risk-investments/',
		'can-you-beat-the-market/',
		'stocks-vs-bonds/',
		'youtube-stock/',
		'etf-vs-mutual-fund/',
		'stocks-in-bankruptcy/',
		'warren-buffett-money/',
		'recession-vs-depression/',
		'how-to-short-stocks/',
		'who-determines-recessions/',
		'voo-vs-vti/',
		'revenue-vs-income/',
		'negative-pe-ratio/',
		'how-facebook-makes-money/',
		'analyst-ratings-explained/',
		'how-often-are-dividends-paid/',
		'goog-vs-googl-stock/',
		'average-monthly-stock-returns/',
		'how-to-buy-stocks-online/',
		'what-is-the-best-sp500-etf/',
		'5-ways-stock-buybacks-can-be-bad/',
		'why-stock-buybacks-are-good/',
		'where-to-park-cash/',
		'peg-ratio/',
		'term/dividend/',
		'term/operating-income/',
		'term/roe-return-on-equity/',
		'term/cash-flow-statement/',
		'term/balance-sheet/',
		'term/gross-profit/',
		'term/income-statement/',
		'term/ttm-trailing-twelve-months/',
		'term/net-income/',
		'term/revenue/',
		'term/pe-ratio/',
		'term/enterprise-value/',
		'term/market-capitalization/',
		'term/free-cash-flow/',
		'term/eps-earnings-per-share/',
		'term/market-to-book-ratio/',
		'term/yoy-year-over-year/'
	]

	const symbols = await getData('index?type=sitemap')
	const allPages = pages.concat(symbols)

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://stockanalysis.com/</loc></url>${allPages
		.map((item: string) => {
			return `<url><loc>https://stockanalysis.com/${item}</loc></url>`
		})
		.join('')}</urlset>`

	res.setHeader('Cache-Control', 's-maxage=1800')
	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {}
	}
}

export default Sitemap
