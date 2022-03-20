import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { ClearFiltersButton } from './ClearFiltersButton'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function FiltersMenuHeader() {
	const { state, dispatch } = useScreenerContext()

	const count = state.filters.length || 0

	return (
		<>
			<div className="mb-1.5 mr-1 flex items-center">
				<div
					title={state.filtersShowing ? 'Hide Filter Area' : 'Show Filter Area'}
					className="flex cursor-pointer items-center text-lg font-semibold text-gray-800 hover:text-black"
					onClick={() => dispatch({ type: 'TOGGLE_FILTERS_SHOWING', value: null })}
					onKeyPress={e => {
						if (e.key === 'Enter') {
							dispatch({ type: 'TOGGLE_FILTERS_SHOWING', value: null })
						}
					}}
					tabIndex={0}
				>
					{state.filtersShowing ? (
						<ChevronDownIcon className="-mb-0.5 h-6 w-6" aria-hidden="true" />
					) : (
						<ChevronRightIcon className="-mb-0.5 h-6 w-6" aria-hidden="true" />
					)}
					Filters
				</div>
				{count > 0 && <ClearFiltersButton />}
			</div>
		</>
	)
}
