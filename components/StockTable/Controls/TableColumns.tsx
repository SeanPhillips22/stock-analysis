import { SelectColumns } from 'components/Dropdown/SelectColumns/_SelectColumns'
import { getDataPointsArray } from 'data/StockDataPoints'
import { useMemo } from 'react'
import { DataId } from 'types/DataId'
import { useTableContext } from '../TableContext'

export function TableColumns() {
	const { fixed, dynamic, setState, clearState, enabled } = useTableContext()
	const { columnOptions, excludeColumns } = fixed
	const { main, columns, index } = dynamic

	// The columns that are currently selected or shown
	let cols = columns.filter(c => c !== main)

	// The columns that are available to select
	const colSelect = useMemo(() => {
		let raw = columnOptions ? columnOptions : getDataPointsArray(index)
		let exclude = excludeColumns ? excludeColumns : []
		let filterAway = [main, ...exclude]
		return raw.filter(c => !filterAway.includes(c))
	}, [columnOptions, excludeColumns, main, index])

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
