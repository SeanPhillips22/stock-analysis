import { screenerState } from 'components/StockScreener/screener.state'

/**
 * Prevent the sort state from resetting after clicking a stock and going back
 */
export function useSortState() {
	const setSort = screenerState((state) => state.setSort)

	// update the sort state
	// but wait for 100ms before setting the state to allow the "column" to be updated
	function updateSortState(column: any) {
		setTimeout(() => {
			if (column.isSorted) {
				setSort([
					{
						id: column.id,
						desc: column.isSortedDesc ? true : false
					}
				])
			} else {
				// If the column is not sorted, reset the sort state
				setSort([
					{ id: 'marketCap', desc: false },
					{ id: 'aum', desc: false }
				])
			}
		}, 200)
	}

	return { updateSortState }
}
