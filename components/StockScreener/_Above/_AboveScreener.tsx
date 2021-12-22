import { screenerState } from '../screener.state'
import { PresetFilters } from './PresetFilters'
import { SavedFilters } from './SavedFilters/_SavedFilters'

export function AboveScreener() {
	const type = screenerState((state) => state.type)

	let typeTitle = type === 'stocks' ? 'Stock' : type.toUpperCase()

	return (
		<>
			<div className="mb-2.5 md:flex md:mb-1.5 md:justify-between md:items-end">
				<h1 className="hh1 md:mb-2">{typeTitle + ' Screener'}</h1>
				<div className="flex space-x-2 items-center">
					<PresetFilters />
					<SavedFilters />
				</div>
			</div>
		</>
	)
}
