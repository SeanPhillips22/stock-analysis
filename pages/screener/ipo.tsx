import { screenerState } from 'components/Screener/screener.state'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersIpos } from 'components/Screener/maps/presetFilters.map'
import { useEffect } from 'react'
import { useFetchFullData } from 'components/Screener/functions/useFetchFullData'
import { initialIpoColumns } from 'components/Screener/maps/columns'
import { ScreenerContextProvider } from 'components/Screener/ScreenerContext'
import { IpoDataPoints } from 'components/Screener/maps/DataPoints/IpoDataPoints'
import { INITIAL_IPO_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialIpoScreenerState'
import dynamic from 'next/dynamic'

const Screener = dynamic(() => import('components/Screener/_Screener'), {
	ssr: false,
	loading: () => {
		return (
			<div className="contain py-5 xs:py-6">
				<h1 className="hh1">IPO Screener</h1>
				<div className="mt-6 flex h-[400px] items-center justify-center bg-gray-50 md:h-[800px]">
					Loading screener...
				</div>
			</div>
		)
	}
})

export default function IpoScreenerPage() {
	const type = screenerState(state => state.type)
	const setType = screenerState(state => state.setType)
	const setData = screenerState(state => state.setData)
	const setLoaded = screenerState(state => state.setLoaded)
	const clearVarFilters = screenerState(state => state.clearVarFilters)
	const setFetchedColumns = screenerState(state => state.setFetchedColumns)
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
				<Screener />
			</ScreenerContextProvider>
		</ScreenerLayout>
	)
}
