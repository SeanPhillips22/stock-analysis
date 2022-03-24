import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { getDataPointsArray } from 'data/StockDataPoints'
import { useMemo } from 'react'
import { DataId } from 'types/DataId'
import { useTableContext } from '../TableContext'

export function TableColumns() {
	const { fixed, dynamic, setState, clearState, enabled } = useTableContext()
	const { columnOptions, includeColumns, excludeColumns } = fixed
	const { columns, index } = dynamic

	// The columns that are available to select
	const colSelect = useMemo(() => {
		let raw = columnOptions ? columnOptions : getDataPointsArray(index)
		if (includeColumns) raw = [...includeColumns, ...raw]
		let exclude = excludeColumns ? excludeColumns : []
		return raw.filter(c => !exclude.includes(c))
	}, [columnOptions, excludeColumns, includeColumns, index])

	function toggle(id: DataId) {
		setState({
			columns: dynamic.columns.includes(id) ? dynamic.columns.filter(c => c !== id) : [...dynamic.columns, id]
		})
	}

	return (
		<SelectColumns
			active={columns}
			options={colSelect}
			toggle={toggle}
			clear={clearState}
			enabled={enabled}
			fixedColumns={fixed.fixedColumns}
		/>
	)
}
