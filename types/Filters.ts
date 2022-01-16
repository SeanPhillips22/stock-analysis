import { FilterValue } from 'react-table'

export type FilterObject = {
	useAsyncDebounce?: (value: any, wait: number) => any
	globalFilter?: any
	setGlobalFilter?: (filterValue: FilterValue) => void
}
