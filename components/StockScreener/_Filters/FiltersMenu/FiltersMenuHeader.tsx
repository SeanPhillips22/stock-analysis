import { screenerState } from 'components/StockScreener/screener.state'
import { CloseCircleIcon } from 'components/Icons/CloseCircle'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ChevronRightIcon } from '@heroicons/react/solid'

export function FiltersMenuHeader() {
	const filters = screenerState((state) => state.filters)
	const clearFilters = screenerState((state) => state.clearFilters)
	const filtersShown = screenerState((state) => state.filtersShown)
	const setFiltersShown = screenerState((state) => state.setFiltersShown)

	const count = filters.length

	return (
		<>
			<div className="mb-1.5 flex items-center w-[120px]">
				<div
					title={filtersShown ? 'Hide Filter Area' : 'Show Filter Area'}
					className="flex items-center text-lg font-semibold text-gray-800 hover:text-black cursor-pointer"
					onClick={() => setFiltersShown(!filtersShown)}
					onKeyPress={(e) => {
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
				{count > 0 && (
					<div
						className="text-gray-600 hover:text-red-500 cursor-pointer flex items-center font-semibold text-small"
						title="Clear All Filters"
						onClick={() => {
							clearFilters()
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								clearFilters()
							}
						}}
						tabIndex={0}
					>
						<CloseCircleIcon classes="w-4 h-4 ml-1 lg:ml-2 -mb-0.5" />
						<div className="ml-[1.5px]">Clear</div>
					</div>
				)}
			</div>
		</>
	)
}
