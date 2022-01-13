import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { stockTableState } from '../stockTableState'

export function TableColumns() {
	const columns = stockTableState((state) => state.columns)

	return <SelectColumns active={columns} />
}
