import { SortProps } from 'components/StockScreener/screener.types'

/**
 * Prevent table sort state from resetting after clicking a stock and going back
 * Needs two properties: the default sort object and the setsort function
 */
export function useSort(sortProps: SortProps) {
	const { defaultSort, setSort } = sortProps
	// update the sort state
	// but wait for 100ms before setting the state to allow the "column" to be updated
	function updateSort(column: any) {
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
				if (defaultSort) setSort(defaultSort)
			}
		}, 200)
	}

	return { updateSort }
}
