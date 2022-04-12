import { useMemo } from 'react'
import { getColumns } from './getColumns'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { useTableContext } from './TableContext'
import { transientState } from './transient.state'
import { QueryError } from './QueryError'
import { Fallback } from './Fallback'

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data }: { _data: any[] }) {
	// Get the table contexts
	const { tableId, fixed, dynamic, setState, enabled, clearState } = useTableContext()
	const page = transientState(state => state.page)

	// Get the props
	const { defaultSort, columnOrder } = fixed
	const { columns: _columns, main, sort } = dynamic

	// pass initial data into react query
	const query = useTableData(tableId, dynamic, _data, enabled)

	// memoize the data and columns
	const data = useMemo(() => query?.data?.data || query?.data, [query.data])
	const columns = useMemo(() => getColumns(_columns, main), [_columns, main])

	// Memoize the sort props to insert into the table
	const sortProps = useMemo(
		() => ({ defaultSort, setSort: (sort: any) => setState({ sort }) }),
		[defaultSort, setState]
	)

	// If paginated and the table shows a rank/no column, then calculate the pagination offset
	const paginationOffset = useMemo(
		() =>
			fixed.pagination && _columns.includes('rank') && dynamic.count && page[tableId]
				? dynamic.count * (page[tableId] - 1)
				: 0,
		[fixed.pagination, _columns, dynamic.count, page, tableId]
	)

	// If no data, check for error or a fallback message
	if (!data?.length) {
		// If there is an error, display an error alert with a debug message
		// Also, reset the table state and ask the user to refresh
		// Log a "softError" event for further debugging
		if (query.error) return <QueryError error={query.error} dynamic={dynamic} clearState={clearState} />

		// If there's no data and a fallback is set
		if (fixed.fallback) return <Fallback title={fixed.fallback.title} text={fixed.fallback.text} />
	}

	// pass the data and columns into react table
	return (
		<StockTableBody
			data={data}
			columns={columns}
			isFetching={query.isFetching}
			type={dynamic.index === 'etf' ? 'etf' : 'stocks'}
			sortProps={sortProps}
			sort={sort}
			columnOrder={columnOrder}
			paginationOffset={paginationOffset}
		/>
	)
}
