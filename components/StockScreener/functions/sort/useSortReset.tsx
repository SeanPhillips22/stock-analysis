import { screenerState } from 'components/StockScreener/screener.state'
import { useEffect } from 'react'

export function useSortReset() {
	const resetSort = screenerState(state => state.resetSort)
	const setResetSort = screenerState(state => state.setResetSort)

	useEffect(() => {
		if (resetSort) {
			setTimeout(() => {
				setResetSort(false)
			}, 500)
		}
	}, [resetSort, setResetSort])

	return resetSort
}
