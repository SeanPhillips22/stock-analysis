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
			<div className="mb-2.5 md:mb-1.5 md:flex md:items-end md:justify-between">
				<div className="flex items-end">
					<h1 className="hh1 mb-3.5 md:mb-2">{typeTitle + ' Screener'}</h1>
					{filterCount > 0 && (
						<span className="ml-2.5 mb-4 text-sm font-semibold text-gray-600 md:mb-2.5">
							{resultsCount} matches
						</span>
					)}
				</div>
				<div className="flex items-center space-x-2">
					<PresetFilters />
					<SavedFilters />
				</div>
			</div>
		</>
	)
}
