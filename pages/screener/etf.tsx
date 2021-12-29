import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { Screener } from 'components/StockScreener/_Screener'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersETFs } from 'components/StockScreener/maps/presetFilters.map'
import { useEffect } from 'react'
import { useFetchFullData } from 'components/StockScreener/functions/useFetchFullData'
import { defaultColumnsETFs } from 'components/StockScreener/maps/resultColumns.map'

export default function ETFScreenerPage() {
	const type = screenerState((state) => state.type)
	const setType = screenerState((state) => state.setType)
	const setData = screenerState((state) => state.setData)
	const setLoaded = screenerState((state) => state.setLoaded)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setPresets = screenerState((state) => state.setPresets)
	const setShowColumns = screenerState((state) => state.setShowColumns)
	const setFetchedColumns = screenerState((state) => state.setFetchedColumns)
	const fetchFullData = useFetchFullData()

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'etf') {
			setType('etf')
			setLoaded(false)
			clearFilters()
			setResultsMenu('General')
			setData([])
			setPresets(PresetFiltersETFs)
			fetchFullData('etf')
			setShowColumns(defaultColumnsETFs)
			setFetchedColumns(defaultColumnsETFs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

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
