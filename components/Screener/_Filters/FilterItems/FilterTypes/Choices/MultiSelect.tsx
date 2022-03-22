// import { screenerState } from 'components/Screener/screener.state'
import { FilterOption, FilterProps } from 'components/Screener/screener.types'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	filter: FilterProps
	option: FilterOption
}

/**
 * A filter option with multiple choices as checkboxes. If there are over 5 options then a search bar is also shown at the top.
 */
export function MultiSelect({ filter, option }: Props) {
	const { state, dispatch } = useScreenerContext()
	// const setOpenFilter = screenerState(state => state.setOpenFilter)
	const { id, filterType, numberType } = filter
	const { name, value } = option

	function handleSelection() {
		// Check if the filter is already selected
		let isFiltered = state.filters.find(filter => filter.id === id)

		// Get the currently filtered values
		// If they are undefined, make an empty array
		let filterArray = isFiltered?.array ? [...isFiltered.array] : []

		if (filterArray.includes(value)) {
			// If the value is already selected, remove it
			filterArray = filterArray.filter(filter => filter !== value)
		} else {
			// If the value is not selected, add it
			filterArray.push(value)
		}

		// If the filter has at least one option selected, add the filter
		if (filterArray.length) {
			let newFilter = { id, name, array: filterArray, filterType, numberType }
			dispatch({ type: 'ADD_FILTER', value: newFilter })
		} else {
			// If there are no options selected, remove the filter
			dispatch({ type: 'REMOVE_FILTER', value: id })
		}
	}

	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id={value}
				defaultChecked={state.filters.find(filter => filter.id === id)?.array?.includes(value)}
				onClick={handleSelection}
				className="h-4 w-4 rounded border border-gray-500 text-blue-600 focus:ring-blue-500"
			/>
			<label htmlFor={value} className="ml-2 text-gray-800">
				{name}
			</label>
		</div>
	)
}
