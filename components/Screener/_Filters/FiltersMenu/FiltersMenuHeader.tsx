import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { ClearFiltersButton } from './ClearFiltersButton'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { screenerState } from 'components/Screener/screener.state'

export function FiltersMenuHeader() {
	const { state } = useScreenerContext()
	const filtersShown = screenerState(state => state.filtersShown)
	const setFiltersShown = screenerState(state => state.setFiltersShown)

	const count = state.filters.length || 0

	return (
		<>
			<div className="mb-1.5 mr-1 flex items-center">
				<div
					title={filtersShown ? 'Hide Filter Area' : 'Show Filter Area'}
					className="flex cursor-pointer items-center text-lg font-semibold text-gray-800 hover:text-black"
					onClick={() => setFiltersShown(!filtersShown)}
					onKeyPress={e => {
						if (e.key === 'Enter') setFiltersShown(!filtersShown)
					}}
					tabIndex={0}
				>
					{filtersShown ? (
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
