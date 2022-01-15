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
	// add react query hook, pass data as initialData, then memoize the state from RQ
	// When columns change, react query makes a new api call and updates the table

	const query = useTableData(_data, context.config.path)

	const data = useMemo(() => query.data, [query.data])
	const columns = useMemo(() => getColumns(_columns, main), [_columns, main])

	return <StockTableBody data={data} columns={columns} />
}
