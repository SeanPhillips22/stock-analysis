import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { Screener } from 'components/StockScreener/_Screener'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersStocks } from 'components/StockScreener/maps/presetFilters.map'
import { useEffect } from 'react'

export default function StockScreenerPage() {
	const type = screenerState((state) => state.type)
	const setType = screenerState((state) => state.setType)
	const setData = screenerState((state) => state.setData)
	const setLoaded = screenerState((state) => state.setLoaded)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setPresets = screenerState((state) => state.setPresets)

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'stocks') {
			setType('stocks')
			setLoaded(false)
			clearFilters()
			setResultsMenu('General')
			setData([])
			setPresets(PresetFiltersStocks)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

	return (
		<>
			<SEO
				title="Stock Screener: Filter and Analyze Stocks"
				description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
				canonical="/screener/stock/"
			/>
			<ScreenerLayout>
				<Screener />
			</ScreenerLayout>
		</>
	)
}
