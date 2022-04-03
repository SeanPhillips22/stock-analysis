import { screenerState } from 'components/Screener/screener.state'
import { DataId } from 'types/DataId'
import { FilterType, NumberType } from '../screener.types'
import { useScreenerContext } from '../ScreenerContext'

/**
 * Hook to organize and simplify functions that modify the screener filters
 * @return {functions} The functions to modify the screener filters
 */
export function useModifyFilters() {
	const { state, dispatch } = useScreenerContext()
	const tablePage = screenerState(state => state.tablePage)
	const setTablePage = screenerState(state => state.setTablePage)

	// Add a filter
	function add(id: DataId, name: string, value: string, filterType: FilterType, numberType?: NumberType) {
		dispatch({
			type: 'ADD_FILTER',
			value: {
				id,
				name,
				value,
				filterType,
				numberType
			}
		})

		// If not on the first page, reset the pagination to the first page
		if (tablePage !== 0) setTablePage(0)
	}

	// Remove a filter
	function remove(id: DataId) {
		dispatch({ type: 'REMOVE_FILTER', value: id })

		// Remove the column from the filtered columns
		if (id !== 'marketCap') {
			dispatch({ type: 'REMOVE_FILTERED_COLUMN', value: id })
		}
	}

	// Clear all filters
	function clear() {
		state.filters.map(filter => {
			remove(filter.id)
		})
	}

	return { add, remove, clear }
}
