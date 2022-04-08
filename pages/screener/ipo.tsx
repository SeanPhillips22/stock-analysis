import { screenerState } from 'components/Screener/screener.state'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersIpos } from 'components/Screener/maps/presetFilters.map'
import { useEffect } from 'react'
import { useFetchFullData } from 'components/Screener/functions/useFetchFullData'
import { initialIpoColumns } from 'components/Screener/maps/columns'
import { ScreenerContextProvider } from 'components/Screener/ScreenerContext'
import { IpoDataPoints } from 'components/Screener/maps/DataPoints/IpoDataPoints'
import { INITIAL_IPO_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialIpoScreenerState'
import { Screener } from 'components/Screener/_Screener'

export default function IpoScreenerPage() {
	const type = screenerState(state => state.type)
	const setType = screenerState(state => state.setType)
	const setData = screenerState(state => state.setData)
	const setLoaded = screenerState(state => state.setLoaded)
	const clearVarFilters = screenerState(state => state.clearVarFilters)
	const setFetchedColumns = screenerState(state => state.setFetchedColumns)
	const setFilterMenu = screenerState(state => state.setFilterMenu)
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const fetchFullData = useFetchFullData()

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'ipo') {
			setType('ipo')
			setLoaded(false)
			clearVarFilters()
			setData([])
			fetchFullData('iposcreener')
			setFetchedColumns(initialIpoColumns.General)
			setFilterMenu('Active')
			setResultsMenu('General')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

	return (
		<ScreenerLayout
			url="/screener/ipo/"
			title="IPO Screener: Search and Filter Upcoming IPOs"
			description="An IPO screening tool to search, filter and compare all upcoming IPOs on the US stock market."
			key="ipo-screener"
		>
			<ScreenerContextProvider
				key="ipo-screener"
				value={{
					id: 'ipo-screener',
					endpoint: 'iposcreener',
					type: 'ipo',
					title: 'IPO Screener',
					presets: PresetFiltersIpos,
					dataPoints: IpoDataPoints,
					initial: INITIAL_IPO_SCREENER_STATE
				}}
			>
				<Screener key="ipo-screener" />
			</ScreenerContextProvider>
		</ScreenerLayout>
	)
}
