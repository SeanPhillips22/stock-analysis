import { Filter } from 'components/Controls/Filter'
import { FilterObject } from 'types/Filters'

type Props = {
	filter: FilterObject
}

export function TableFilter({ filter }: Props) {
	const { useAsyncDebounce, setGlobalFilter, setFilterState, globalFilter } =
		filter

	if (useAsyncDebounce && setGlobalFilter) {
		return (
			<Filter
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				setFilterState={setFilterState}
			/>
		)
	}
	return null
}
