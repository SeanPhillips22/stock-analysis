import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { DataId } from 'types/DataId'
import { useTableContext } from '../TableContext'

export function TableColumns() {
	const { fixed, dynamic, setState } = useTableContext()
	const { columnOptions } = fixed
	const { main, columns } = dynamic

	let cols = columns.filter(c => c !== main)
	let colOptions = columnOptions?.filter(c => c !== main)

	function toggle(id: DataId) {
		setState({
			columns: dynamic.columns.includes(id)
				? dynamic.columns.filter(c => c !== id)
				: [...dynamic.columns, id]
		})
	}

	return (
		<SelectColumns
			active={cols}
			options={colOptions || cols}
			toggle={toggle}
		/>
	)
}
