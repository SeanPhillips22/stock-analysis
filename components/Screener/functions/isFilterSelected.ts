import { DataId } from 'types/DataId'
import { FilterValue } from 'components/Screener/screener.types'

// Check if the selected filter is in the list of filters
export function isFilterSelected(id: DataId, filters: FilterValue[]) {
	if (filters.length === 0) return false
	const findFilter = filters.find(filter => filter.id === id)

	if (findFilter && findFilter.value) return findFilter.value
	else if (findFilter && findFilter.array) return findFilter.array[0]
	else return false
}
