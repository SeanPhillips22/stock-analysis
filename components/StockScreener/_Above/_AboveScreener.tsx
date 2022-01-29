import { screenerState } from '../screener.state'
import { PresetFilters } from './PresetFilters'
import { SavedFilters } from './SavedFilters/_SavedFilters'

export function AboveScreener() {
	const type = screenerState(state => state.type)
	const filters = screenerState(state => state.filters)
	const resultsCount = screenerState(state => state.resultsCount)

	const filterCount = filters.length

	let typeTitle = type === 'stocks' ? 'Stock' : type.toUpperCase()

	return (
		<>
			<div className="mb-2.5 md:flex md:mb-1.5 md:justify-between md:items-end">
				<div className="flex items-end">
					<h1 className="hh1 mb-3.5 md:mb-2">{typeTitle + ' Screener'}</h1>
					{filterCount > 0 && (
						<span className="ml-2.5 mb-4 md:mb-2.5 text-sm text-gray-600 font-semibold">
							{resultsCount} matches
						</span>
					)}
				</div>
				<div className="flex space-x-2 items-center">
					<PresetFilters />
					<SavedFilters />
				</div>
			</div>
		</>
	)
}
