import { ScreenerSortProps } from 'components/Screener/screener.types'

/**
 * Prevent table sort state from resetting after clicking a stock and going back
 * Needs two properties: the default sort object and the setsort function
 */
export function useScreenerSort(sortProps: ScreenerSortProps) {
	const { defaultSort, dispatch } = sortProps
	// update the sort state
	// but wait for 200ms before setting the state to allow the "column" to be updated
	function updateSort(column: any) {
		setTimeout(() => {
			if (column.isSorted) {
				dispatch({
					type: 'SET_SORT',
					value: [
						{
							id: column.id,
							desc: column.isSortedDesc ? true : false
						}
					]
				})
			} else {
				if (defaultSort) dispatch({ type: 'RESET_SORT', value: null })
			}
		}, 200)
	}

	return { updateSort }
}
