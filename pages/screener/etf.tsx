import { screenerState } from 'components/Screener/screener.state'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersETFs } from 'components/Screener/maps/presetFilters.map'
import { useEffect } from 'react'
import { useFetchFullData } from 'components/Screener/functions/useFetchFullData'
import { initialEtfColumns } from 'components/Screener/maps/columns'
import { ScreenerContextProvider } from 'components/Screener/ScreenerContext'
import { EtfDataPoints } from 'components/Screener/maps/DataPoints/EtfDataPoints'
import { ScreenerState } from 'components/Screener/screener.types'
import dynamic from 'next/dynamic'

const Screener = dynamic(() => import('components/Screener/_Screener'), {
	ssr: false,
	loading: () => {
		return <div className="mt-6 h-[1000px]">Loading...</div>
	}
})

const INITIAL_STATE: ScreenerState = {
	resultsMenu: 'General',
	filtersMenu: 'Active',
	filtersShowing: true,
	activePreset: '',
	columns: {
		all: initialEtfColumns,
		filtered: initialEtfColumns.Filtered,
		default: initialEtfColumns.General
	},
	filters: []
}

export default function ETFScreenerPage() {
	const type = screenerState(state => state.type)
	const setType = screenerState(state => state.setType)
	const setData = screenerState(state => state.setData)
	const setLoaded = screenerState(state => state.setLoaded)
	const clearVarFilters = screenerState(state => state.clearVarFilters)
	const setFetchedColumns = screenerState(state => state.setFetchedColumns)
	const fetchFullData = useFetchFullData()

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'etf') {
			setType('etf')
			setLoaded(false)
			clearVarFilters()
			setData([])
			fetchFullData('etfscreener')
			setFetchedColumns(initialEtfColumns.General)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

	return (
		<ScreenerLayout
			url="/screener/etf/"
			title="ETF Screener: Search and Filter ETFs"
			description="An ETF screening tool to search, filter and compare all ETFs listed on the US stock market."
		>
			<ScreenerContextProvider
				value={{
					id: 'etf-screener',
					endpoint: 'etfscreener',
					type: 'etf',
					title: 'ETF Screener',
					presets: PresetFiltersETFs,
					dataPoints: EtfDataPoints,
					initial: INITIAL_STATE
				}}
			>
				<Screener />
			</ScreenerContextProvider>
		</ScreenerLayout>
	)
}
