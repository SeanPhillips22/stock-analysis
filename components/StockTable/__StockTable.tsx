import { useMemo } from 'react'
import { getColumns } from './getColumns'
import { PageConfig } from 'types/PageConfig'
import { useTableData } from './useTableData'
import { StockTableBody } from './_StockTableBody'
import { stockTableState } from './stockTableState'

type Props = {
	_data: any[]
	config: PageConfig
}

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 * TODO make the columns update when new data is fetched
 * ? Add a wrapper component that can be used to fetch data and send it to the table
 */
export function StockTable({ _data, config }: Props) {
	const _columns = stockTableState((state) => state.columns)
	// add react query hook, pass data as initialData, then memoize the state from RQ
	// When columns change, react query makes a new api call and updates the table

	const query = useTableData(_data, config.path)

	const data = useMemo(() => query.data, [query.data])
	const columns = useMemo(() => getColumns(_columns), [_columns])

	console.log(query)

	return <StockTableBody data={data} columns={columns} config={config} />
}
