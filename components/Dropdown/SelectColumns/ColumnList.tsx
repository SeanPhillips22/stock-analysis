/* eslint-disable react-hooks/exhaustive-deps */
import { DataPoints, DataPointType } from 'data/StockDataPoints'
import { useMemo } from 'react'
import { DataId } from 'types/Data'
import { ColumnItem } from './ColumnItem'

type Props = {
	_active: DataId[]
	options: DataId[]
	search: string
}

export function ColumnList({ _active, options, search }: Props) {
	let active: DataPointType[] = []
	let inactive: DataPointType[] = []

	// check which data points are active vs. inactive
	options.forEach(item => {
		let { id, name } = DataPoints[item]
		if (id !== 's' && id !== 'n') {
			if (_active.includes(item)) active.push({ id, name })
			else inactive.push({ id, name })
		}
	})

	// filter the data points based on the search term
	if (search && search !== '') {
		active = active.filter(i => i.name.toLowerCase().includes(search))
		inactive = inactive.filter(i => i.name.toLowerCase().includes(search))
	}

	// memoize the active/inactive so that it only changes the order when the dropdown is opened
	const activeItems = useMemo(() => active, [search])
	const inactiveItems = useMemo(() => inactive, [search])

	return (
		<div className="column-list">
			{/* render the active items (box is checked) */}
			{activeItems.map(i => (
				<ColumnItem key={i.id} id={i.id} name={i.name} checked={true} />
			))}
			{/* render the inactive items */}
			{inactiveItems.map(i => (
				<ColumnItem key={i.id} id={i.id} name={i.name} checked={false} />
			))}
		</div>
	)
}
