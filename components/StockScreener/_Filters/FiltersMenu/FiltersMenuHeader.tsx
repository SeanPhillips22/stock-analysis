import { screenerState } from 'components/StockScreener/screener.state'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { ClearFiltersButton } from '../ClearFiltersButton'

export function FiltersMenuHeader() {
	const filters = screenerState(state => state.filters)
	const filtersShown = screenerState(state => state.filtersShown)
	const setFiltersShown = screenerState(state => state.setFiltersShown)

	const count = filters.length

	return (
		<>
			<div className="mb-1.5 flex items-center mr-1">
				<div
					title={filtersShown ? 'Hide Filter Area' : 'Show Filter Area'}
					className="flex items-center text-lg font-semibold text-gray-800 hover:text-black cursor-pointer"
					onClick={() => setFiltersShown(!filtersShown)}
					onKeyPress={e => {
						if (e.key === 'Enter') {
							setFiltersShown(!filtersShown)
						}
					}}
					tabIndex={0}
				>
					{filtersShown ? (
						<ChevronDownIcon
							className="h-6 w-6 -mb-0.5"
							aria-hidden="true"
						/>
					) : (
						<ChevronRightIcon
							className="h-6 w-6 -mb-0.5"
							aria-hidden="true"
						/>
					)}
					Filters
				</div>
				{count > 0 && <ClearFiltersButton />}
			</div>
		</>
	)
}
