import { useContext, useMemo } from 'react'
import { getColumns } from './getColumns'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { stockTableState } from './stockTableState'
import { TableContext } from './TableContext'
import { SortObject } from 'components/StockScreener/screener.types'

type Props = {
	_data: any[]
	sort?: SortObject[]
}

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data, sort }: Props) {
	const context = useContext(TableContext)
	const _columns = stockTableState(state => state.columns)
	const main = stockTableState(state => state.main)
	const defaultSort = stockTableState(state => state.defaultSort)
	const setSorted = stockTableState(state => state.setSorted)

	// pass initial data into react query
	const query = useTableData(_data, context.config.path)

	// memoize the data and columns
	const data = useMemo(() => query.data.data || query.data, [query.data])
	const columns = useMemo(() => getColumns(_columns, main), [_columns, main])

	const sortProps = { defaultSort, setSort: setSorted }

	// pass the data and columns into react table
	return (
		<StockTableBody
			data={data}
			columns={columns}
			sort={sort}
			sortProps={sortProps}
		/>
	)
}
