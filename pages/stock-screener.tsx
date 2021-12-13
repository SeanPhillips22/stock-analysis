import { screenerDataState } from 'components/StockScreener/screenerdata.state'
import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { StockScreener } from 'components/StockScreener/_StockScreener'
import { Layout } from 'components/Layout/_Layout'

export default function StockScreenerPage() {
	const type = screenerDataState((state) => state.type)
	const setType = screenerDataState((state) => state.setType)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)

	if (type !== 'stocks') {
		clearFilters()
		setResultsMenu('General')
		setType('stocks')
	}

	return (
		<>
			<SEO
				title="Stock Screener: Filter and Analyze Stocks"
				description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
				canonical="/stock-screener/"
			/>
			<Layout>
				<div className="contain pt-5 xs:pt-6">
					<StockScreener />
				</div>
			</Layout>
		</>
	)
}
