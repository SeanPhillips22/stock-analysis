/* eslint-disable react-hooks/exhaustive-deps */
import { screenerState } from 'components/Screener/screener.state'
import { useModifyColumns } from 'components/Screener/functions/useModifyColumns'
import { DataId } from 'types/DataId'
import { ColumnItem } from './ColumnItem'
import { useMemo } from 'react'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type ColumnProperties = {
	id: DataId
	name: string
}

type Props = {
	search: string
}
/**
 * Wrapper that contains all the individual checkboxes to select columns for the results table
 * @param {string} search - The search term to filter the results
 * @return {JSX.Element}
 */
export function ColumnItemWrap({ search }: Props) {
	const { endpoint, dataPoints } = useScreenerContext()
	const { isShowing } = useModifyColumns(endpoint)
	const columnDropdownOpen = screenerState(state => state.columnDropdownOpen)

	const activeArray: ColumnProperties[] = []
	const inactiveArray: ColumnProperties[] = []

	dataPoints.map(filter => {
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
				<ColumnItem key={item.id} id={item.id} name={item.name} />
			))}
			{inactive.map(item => (
				<ColumnItem key={item.id} id={item.id} name={item.name} />
			))}
			{active.length === 0 && inactive.length === 0 && <div>No columns found.</div>}
		</div>
	)
}
