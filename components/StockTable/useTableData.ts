import { getSelect } from 'functions/apis/getSelect'
import { useQuery } from 'react-query'
import { TableDynamic } from './TableTypes'

/**
 * Handle the data for the stock table via react-query
 */
export function useTableData(
	tableId: string,
	type: 'stocks' | 'etf',
	dynamic: TableDynamic,
	_data: any[],
	enabled?: boolean
) {
	// The params that  tell react-query when to update
	const { main, count, columns, filters, sortDirection } = dynamic
	const queryObject = {
		main,
		count,
		columns,
		filters,
		sortDirection,
		type,
		tableId
	}

	const { data } = useQuery(
		[tableId, queryObject],
		async () => await getSelect(dynamic, type, false),
		{
			initialData: _data,
			enabled: enabled,
			staleTime: 60000,
			refetchOnWindowFocus: false,
			notifyOnChangeProps: 'tracked'
		}
	)

	return {
		data
	}
}
