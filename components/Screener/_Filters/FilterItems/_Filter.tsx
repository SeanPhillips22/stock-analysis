import { screenerState } from 'components/Screener/screener.state'
import { useEffect, useRef } from 'react'
import { FilterProps } from 'components/Screener/screener.types'
import { isFilterSelected } from 'components/Screener/functions/isFilterSelected'
import { FilterButton } from './FilterButton'
import { CloseCircleIcon } from 'components/Icons/CloseCircle'
import { NumericFilter } from './FilterTypes/NumericFilter'
import { StringFilter } from './FilterTypes/StringFilter'
import { SelectFilter } from './FilterTypes/SelectFilter'
import { useModifyFilters } from 'components/Screener/functions/useModifyFilters'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

/**
 * SingleFilter
 * The wrapper component for an individual filter with button + dropdown (such as PE ratio)
 * @param {FilterProps} filter The properties for the filter
 * @return Component
 */

export function Filter({ filter }: { filter: FilterProps }) {
	const { state } = useScreenerContext()
	const ref = useRef<HTMLDivElement>(null)
	const openFilter = screenerState(state => state.openFilter)
	const setOpenFilter = screenerState(state => state.setOpenFilter)
	const { remove } = useModifyFilters()

	const { id, filterType } = filter
	const active = isFilterSelected(id, state.filters)

	// Close dropdown if clicked outside of filter dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpenFilter('')
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}

		if (id === openFilter) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [id, openFilter, ref, setOpenFilter])

	let Filter

	if (filterType === 'numeric' || filterType === 'numericRange') {
		Filter = NumericFilter
	} else if (filterType === 'multiselect' || filterType === 'multiselectarray') {
		Filter = SelectFilter
	} else {
		Filter = StringFilter
	}

	return (
		<div ref={ref} className="relative inline-block text-left">
			<div className="flex items-center">
				{active && (
					<div
						className="mr-1.5 cursor-pointer text-gray-500 hover:text-red-500 focus:text-red-500 focus:outline-none"
						title="Clear Filter"
						tabIndex={0}
						onClick={() => remove(id)}
						onKeyPress={e => e.key === 'Enter' && remove(id)}
					>
						<CloseCircleIcon classes="w-[1.2rem] h-[1.2rem]" />
					</div>
				)}
				<FilterButton active={active} id={id} />
			</div>

			<div
				className={`absolute right-0 z-50 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-150 focus:outline-none xs:right-2 lg:absolute lg:right-0 w-[260px]${
					id === openFilter
						? ' visible translate-y-0 transform opacity-100'
						: ' invisible -translate-y-2 transform opacity-0'
				}`}
				onKeyDown={e => e.key === 'Escape' && setOpenFilter('')}
			>
				<Filter filter={filter} active={active} open={openFilter ? openFilter : undefined} />
			</div>
		</div>
	)
}
