/* eslint-disable react-hooks/exhaustive-deps */
import { screenerState } from 'components/StockScreener/screener.state'
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns'
import { getDataPoints } from 'components/StockScreener/maps/dataPoints'
import { DataId } from 'types/DataId'
import { ScreenerTypes } from 'components/StockScreener/screener.types'
import { ColumnItem } from './ColumnItem'
import { useMemo } from 'react'

type ColumnProperties = {
	id: DataId
	name: string
}

type Props = {
	search: string
	type: ScreenerTypes
}
/**
 * Wrapper that contains all the individual checkboxes to select columns for the results table
 * @param {string} search - The search term to filter the results
 * @return {JSX.Element}
 */
export function ColumnItemWrap({ search, type }: Props) {
	const { isShowing } = useModifyColumns()
	const columnDropdownOpen = screenerState(state => state.columnDropdownOpen)
	const DataPoints = getDataPoints(type)

	const activeArray: ColumnProperties[] = []
	const inactiveArray: ColumnProperties[] = []

	DataPoints.map(filter => {
		if (isShowing(filter.id)) {
			if (search === '' || filter.name.toLowerCase().includes(search)) {
				activeArray.push({ id: filter.id, name: filter.name })
			}
		} else {
			if (search === '' || filter.name.toLowerCase().includes(search)) {
				inactiveArray.push({ id: filter.id, name: filter.name })
			}
		}
	})

	const active = useMemo(() => activeArray, [columnDropdownOpen, search])
	const inactive = useMemo(() => inactiveArray, [columnDropdownOpen, search])

	return (
		<div className="thin-scroll max-h-80 space-y-2 overflow-y-auto overscroll-contain p-2 text-sm">
			{active.map(item => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					type={type}
				/>
			))}
			{inactive.map(item => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					type={type}
				/>
			))}
			{active.length === 0 && inactive.length === 0 && (
				<div>No columns found.</div>
			)}
		</div>
	)
}
