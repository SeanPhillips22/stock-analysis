import { getSelect } from 'functions/apis/getSelect'
import { useQuery } from 'react-query'
import { IndexType } from 'types/Tables'
import { TableDynamic } from './TableTypes'

/**
 * Handle the data for the stock table via react-query
 */
export function useTableData(
	tableId: string,
	type: IndexType,
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
			placeholderData: _data,
			enabled: enabled,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 60000,
			notifyOnChangeProps: 'tracked'
		}
	)

	return {
		data
	}
}
