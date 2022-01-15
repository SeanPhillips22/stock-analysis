import { useContext, useMemo } from 'react'
import { getColumns } from './getColumns'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { stockTableState } from './stockTableState'
import { TableContext } from './TableContext'

type Props = {
	_data: any[]
}

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data }: Props) {
	const context = useContext(TableContext)
	const _columns = stockTableState(state => state.columns)
	const main = stockTableState(state => state.main)

	// pass initial data into react query
	const query = useTableData(_data, context.config.path)

	// memoize the data and columns
	const data = useMemo(() => query.data.data || query.data, [query.data])
	const columns = useMemo(() => getColumns(_columns, main), [_columns, main])

	// pass the data and columns into react table
	return <StockTableBody data={data} columns={columns} />
}
