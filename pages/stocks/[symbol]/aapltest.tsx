import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Overview } from 'types/Overview'
import { News } from 'types/News'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { InfoTable, QuoteTable } from 'components/Overview/TopTables'
import { PriceChart } from 'components/PriceChart/_PriceChart'
import { Profile } from 'components/Overview/ProfileWidget'
import { NewsArea } from 'components/Overview/NewsArea'
import { FinancialsWidget } from 'components/Overview/FinancialsWidget'
import { AnalystWidget } from 'components/Overview/AnalystWidget'
import { Sidebar1Overview } from 'components/Ads/Snigel/Sidebar1Overview'
import Script from 'next/script'

interface Props {
	info: Info
	data: Overview
	news: { data: News[]; updated: number }
}

const StockTestOverview = ({ info, data, news }: Props) => {
	let description = `Get a real-time ${info.nameFull} (${info.ticker}) stock price quote with breaking news, financials, statistics, charts and more.`
	if (info.state == 'upcomingipo') {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials, IPO details and other important investing information.`
	} else if (info.archived) {
		description = `Get the latest ${info.nameFull} (${info.ticker}) stock price quote with news, financials and other important investing information.`
	}

	const symbol = info.symbol.includes('.') ? info.symbol : `${info.symbol}/`

	return (
		<Stock info={info} url={`/stocks/${symbol}`}>
			<Script
				id="gpt"
				strategy="beforeInteractive"
				src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
			/>
			<Script
				id="gpt-ads"
				strategy="beforeInteractive"
				dangerouslySetInnerHTML={{
					__html: `window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
    googletag.defineSlot('/21976450666/Sidebar_Vertical_Bottom_300x600', [[300, 600], [300, 250]], 'div-gpt-ad-1641290361391-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });`
				}}
			/>

			<SEO
				title={`${info.nameFull} (${info.ticker}) Stock Price, Quote & News`}
				description={description}
				canonical={`/stocks/${symbol}`}
				noindex={true}
			/>
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-4 mt-4">
				<div className="order-3 flex-grow overflow-auto">
					<PriceChart info={info} />
				</div>
				<div className="order-1 flex flex-row gap-4">
					<InfoTable data={data} />
					<QuoteTable data={data} info={info} />
				</div>
			</div>
			<div className="px-0 md:px-4 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar_wide lg:gap-x-10">
				<div className="px-4 lg:pt-1 md:px-0 lg:order-2 space-y-6">
					<Sidebar1Overview news={news.data} />
					<Profile info={info} data={data} />
					<FinancialsWidget info={info} data={data} />
					<AnalystWidget data={data} />
					<div id="div-gpt-ad-1641290361391-0">
						<Script
							id="gpt-ads"
							strategy="beforeInteractive"
							dangerouslySetInnerHTML={{
								__html: `googletag.cmd.push(function() { googletag.display('div-gpt-ad-1641290361391-0'); });`
							}}
						/>
					</div>
				</div>
				{news && (
					<div className="lg:order-1">
						<NewsArea
							info={info}
							news={news.data}
							updated={news.updated}
						/>
					</div>
				)}
			</div>
		</Stock>
	)
}

export default StockTestOverview

export const getServerSideProps: GetServerSideProps = async (context) => {
	const data = await getPageDataSSR('overview', 'aapl', 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
