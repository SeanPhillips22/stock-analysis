import { screenerState } from 'components/Screener/screener.state'
import { FilterOption, FilterProps } from 'components/Screener/screener.types'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	option: FilterOption
	filter: FilterProps
	active: string | false
}

/**
 * A preset filter option, as opposed to custom.
 * This is a list of named filters that can be screened for, like "PE under 10"
 */
export function PresetChoice({ option, filter }: Props) {
	const { dispatch } = useScreenerContext()
	const setOpenFilter = screenerState(state => state.setOpenFilter)
	const { id, filterType, numberType } = filter

	function handleSelection(name: string, value: string) {
		if (id) {
			// Add the new filter
			let newFilter = { id, name, value, filterType, numberType }
			dispatch({ type: 'ADD_FILTER', value: newFilter })

			// Close the dropdown
			setOpenFilter('')
		}
	}

	function handleKeyPress(e: React.KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSelection(option.name, option.value)
		}
		if (e.key === 'Escape') {
			e.preventDefault()
			setOpenFilter('')
		}
	}

	return (
		<div className="border-b border-gray-100 last:border-0">
			<div
				className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-blue-100 focus:text-gray-900 focus:outline-none"
				onClick={() => handleSelection(option.name, option.value)}
				onKeyDown={e => handleKeyPress(e)}
				tabIndex={0}
			>
				{option.name}
			</div>
		</div>
	)
}
