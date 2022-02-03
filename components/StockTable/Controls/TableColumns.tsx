import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { getDataPointsArray } from 'data/StockDataPoints'
import { DataId } from 'types/DataId'
import { useTableContext } from '../TableContext'

export function TableColumns() {
	const { type, fixed, dynamic, setState, clearState, enabled } =
		useTableContext()
	const { columnOptions, excludeColumns } = fixed
	const { main, columns } = dynamic

	let cols = columns.filter(c => c !== main)
	let colSelect = columnOptions
		? columnOptions?.filter(c => c !== main)
		: excludeColumns
		? getDataPointsArray(type, [main, ...excludeColumns])
		: cols

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
			options={colSelect}
			toggle={toggle}
			clear={clearState}
			enabled={enabled}
		/>
	)
}
