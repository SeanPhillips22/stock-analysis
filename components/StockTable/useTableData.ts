import { getSelect } from 'functions/apis/getSelect'
import { useQuery } from 'react-query'
import { stockTableState } from './stockTableState'

/**
 * Handle the data for the stock table via react-query
 * TODO reduce unnecesssary refetching
 */
export function useTableData(_data: any[], path: string) {
	// Get the params from the table state
	const { type, main, count, sort, columns } = stockTableState()

	// Add the params into an array to tell react-query when to update
	const queryObject = { type, main, count, sort, columns }

	const { data, isLoading, error } = useQuery(
		[path, queryObject],
		async () => await getSelect(queryObject),
		{
			initialData: _data,
			enabled: columns.length ? true : false // only fetch if columns are defined
		}
	)

	return {
		data,
		isLoading,
		error
	}
}
