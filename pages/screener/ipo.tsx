import { screenerDataState } from 'components/StockScreener/screenerdata.state'
import { screenerState } from 'components/StockScreener/screener.state'
import { SEO } from 'components/SEO'
import { Screener } from 'components/StockScreener/_Screener'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersIpos } from 'components/StockScreener/maps/presetFilters.map'

export default function IpoScreenerPage() {
	const type = screenerDataState((state) => state.type)
	const setType = screenerDataState((state) => state.setType)
	const setData = screenerDataState((state) => state.setData)
	const setLoaded = screenerDataState((state) => state.setLoaded)
	const clearFilters = screenerState((state) => state.clearFilters)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const setPresets = screenerState((state) => state.setPresets)

	if (type !== 'ipo') {
		setType('ipo')
		setLoaded(false)
		clearFilters()
		setResultsMenu('General')
		setData([])
		setPresets(PresetFiltersIpos)
	}

	return (
		<>
			<SEO
				title="IPO Screener: Search and Filter Upcoming IPOs"
				description="An IPO screening tool to search, filter and compare all upcoming IPOs on the US stock market."
				canonical="/screener/ipo/"
			/>
			<ScreenerLayout>
				<Screener />
			</ScreenerLayout>
		</>
	)
}
