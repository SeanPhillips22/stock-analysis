import { screenerState } from 'components/Screener/screener.state'
import { ScreenerLayout } from 'components/Layout/ScreenerLayout'
import { PresetFiltersStocks } from 'components/Screener/maps/presetFilters.map'
import { useEffect } from 'react'
import { useFetchFullData } from 'components/Screener/functions/useFetchFullData'
import { initialStockColumns } from 'components/Screener/maps/columns'
import { ScreenerContextProvider } from 'components/Screener/ScreenerContext'
import { StockDataPoints } from 'components/Screener/maps/DataPoints/StockDataPoints'
import { INITIAL_STOCK_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialStockScreenerState'
import dynamic from 'next/dynamic'

const Screener = dynamic(() => import('components/Screener/_Screener'), {
	ssr: false,
	loading: () => {
		return (
			<div className="contain py-5 xs:py-6">
				<h1 className="hh1">Stock Screener</h1>
				<div className="mt-6 flex h-[400px] items-center justify-center bg-gray-50 md:h-[800px]">
					Loading screener...
				</div>
			</div>
		)
	}
})

export default function StockScreenerPage() {
	const type = screenerState(state => state.type)
	const setType = screenerState(state => state.setType)
	const setData = screenerState(state => state.setData)
	const setLoaded = screenerState(state => state.setLoaded)
	const clearVarFilters = screenerState(state => state.clearVarFilters)
	const setFetchedColumns = screenerState(state => state.setFetchedColumns)
	const fetchFullData = useFetchFullData()

	// Reset everything when switching between screeners
	useEffect(() => {
		if (type !== 'stocks') {
			setType('stocks')
			setLoaded(false)
			setData([])
			clearVarFilters()
			fetchFullData('screener')
			setFetchedColumns(initialStockColumns.General)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type])

	return (
		<ScreenerLayout
			url="/screener/stock/"
			title="Stock Screener: Filter and Analyze Stocks"
			description="A free stock screening tool to search, filter and analyze stocks by almost 100 different indicators and metrics."
			key="stock-screener"
		>
			<ScreenerContextProvider
				value={{
					id: 'stocks-screener',
					endpoint: 'screener',
					type: 'stocks',
					title: 'Stock Screener',
					presets: PresetFiltersStocks,
					dataPoints: StockDataPoints,
					initial: INITIAL_STOCK_SCREENER_STATE
				}}
			>
				<Screener />
			</ScreenerContextProvider>
		</ScreenerLayout>
	)
}
