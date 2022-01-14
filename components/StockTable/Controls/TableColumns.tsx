import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { stockTableState } from '../stockTableState'

export function TableColumns() {
	const main = stockTableState(state => state.main)
	const columns = stockTableState(state => state.columns)
	const columnOptions = stockTableState(state => state.columnOptions)

	let cols = columns.filter(c => c !== main)
	let colOptions = columnOptions.filter(c => c !== main)

	return <SelectColumns active={cols} options={colOptions} />
}
