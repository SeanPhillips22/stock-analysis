import { DataId } from 'types/Data'
import { FilterValue } from 'components/StockScreener/screener.types'

// Check if the selected filter is in the list of filters
export function isFilterSelected(id: DataId, filters: FilterValue[]) {
	if (filters.length === 0) return false
	const findFilter = filters.find((filter) => filter.id === id)
	return findFilter ? findFilter.value : false
}
