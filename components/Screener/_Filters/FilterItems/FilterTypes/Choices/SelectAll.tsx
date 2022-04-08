import { FilterProps } from 'components/Screener/screener.types'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { memo } from 'react'

type Props = {
	filter: FilterProps
}

export function SelectAllComponent({ filter }: Props) {
	const { dispatch } = useScreenerContext()
	const { id, name, filterType, numberType } = filter

	// Select All
	function select() {
		let allOptionsSelected = filter.options.map(f => f.value)
		let newFilter = { id, name, array: allOptionsSelected, filterType, numberType }
		dispatch({ type: 'ADD_FILTER', value: newFilter })
	}

	// Deselect All
	function deselect() {
		dispatch({ type: 'REMOVE_FILTER', value: id })
	}

	return (
		<div className="flex space-x-4 border-t border-gray-200 px-3 pt-1 pb-0.5 text-sm font-semibold text-gray-700">
			<span className="cursor-pointer hover:text-blue-link" onClick={select}>
				Select All
			</span>
			<span className="cursor-pointer hover:text-blue-link" onClick={deselect}>
				Deselect All
			</span>
		</div>
	)
}

export const SelectAll = memo(SelectAllComponent)
