import { useMemo } from 'react'
import { getColumns } from './getColumns'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { useTableContext } from './TableContext'
import { TableTitle } from './Controls/TableTitle'

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data }: { _data: any[] }) {
	// Get the table contexts
	const { tableId, fixed, dynamic, setState, enabled, description } = useTableContext()

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

	// If there's no data, display a fallback with title and text
	// Completely skip rendering the stock table
	if (!data.length && fixed.fallback) {
		return (
			<div className="controls fallback">
				<TableTitle title={fixed.fallback.title} />
				<p>{fixed.fallback.text}</p>
			</div>
		)
	}

	// pass the data and columns into react table
	return (
		<StockTableBody
			data={data}
			columns={columns}
			sortProps={sortProps}
			sort={sort}
			columnOrder={columnOrder}
			tableId={tableId}
			description={description}
		/>
	)
}
