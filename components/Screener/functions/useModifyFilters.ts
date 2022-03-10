import { screenerState } from 'components/Screener/screener.state'
import { DataId } from 'types/DataId'
import { FilterType, NumberType } from '../screener.types'
import { isFilterSelected } from './isFilterSelected'

/**
 * Hook to organize and simplify functions that modify the screener filters
 * @return {functions} The functions to modify the screener filters
 */
export function useModifyFilters() {
	const filters = screenerState(state => state.filters)
	const addFilter = screenerState(state => state.addFilter)
	const removeFilter = screenerState(state => state.removeFilter)
	const showColumns = screenerState(state => state.showColumns)
	const setShowColumns = screenerState(state => state.setShowColumns)
	const addFilteredColumn = screenerState(state => state.addFilteredColumn)
	const removeFilteredColumn = screenerState(
		state => state.removeFilteredColumn
	)
	const resultsMenu = screenerState(state => state.resultsMenu)
	const tablePage = screenerState(state => state.tablePage)
	const setTablePage = screenerState(state => state.setTablePage)

	// Add a filter
	function add(
		id: DataId,
		name: string,
		value: string,
		filterType: FilterType,
		numberType?: NumberType
	) {
		// If filter is already selected, remove the filter first
		if (isFilterSelected(id, filters)) {
			remove(id)
		}

		addFilteredColumn(id)

		// Add the filter
		addFilter({
			id,
			name,
			value,
			filterType,
			numberType
		})

		// If viewing the filtered columns, force them to update right away
		if (resultsMenu === 'Filtered') {
			const newColumns = [...showColumns] // Need to copy the array in order for state to update
			newColumns.push(id)
			setShowColumns(newColumns)
		}

		// If not on the first page, reset the pagination to the first page
		if (tablePage !== 0) setTablePage(0)
	}

	// Remove a filter
	function remove(id: DataId) {
		removeFilter(id)

		// Remove the column from the filtered columns
		if (id !== 'marketCap') {
			removeFilteredColumn(id)

			// If viewing the filtered columns, force them to update right away
			if (resultsMenu === 'Filtered') {
				const newColumns = showColumns.filter(c => c !== id)
				setShowColumns(newColumns)
			}
		}
	}

	// Clear all filters
	function clear() {
		filters.map(filter => {
			remove(filter.id)
		})
	}

	return { add, remove, clear }
}
