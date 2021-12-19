import { screenerDataState } from 'components/StockScreener/screenerdata.state'
import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { Screener } from 'components/StockScreener/_Screener'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersETFs } from 'components/StockScreener/maps/presetFilters.map'

export default function ETFScreenerPage() {
	const type = screenerDataState((state) => state.type)
	const setType = screenerDataState((state) => state.setType)
	const setData = screenerDataState((state) => state.setData)
	const setLoaded = screenerDataState((state) => state.setLoaded)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setPresets = screenerState((state) => state.setPresets)

	if (type !== 'etf') {
		setType('etf')
		setLoaded(false)
		clearFilters()
		setResultsMenu('General')
		setData([])
		setPresets(PresetFiltersETFs)
	}

	return (
		<>
			<SEO
				title="ETF Screener: Search and Filter ETFs"
				description="An ETF screening tool to search, filter and compare all ETFs listed on the US stock market."
				canonical="/screener/etf/"
			/>
			<ScreenerLayout>
				<Screener />
			</ScreenerLayout>
		</>
	)
}
