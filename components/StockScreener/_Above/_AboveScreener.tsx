import { screenerState } from '../screener.state'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { PresetFilters } from './PresetFilters'
import { SavedFilters } from './SavedFilters/_SavedFilters'

export function AboveScreener() {
	const type = screenerState((state) => state.type)

	let typeTitle = type === 'stocks' ? 'Stock' : type.toUpperCase()

	return (
		<>
			<div className="mb-3 md:flex md:mb-0 justify-between">
				<div>
					<Breadcrumbs url={`/screener/${typeTitle}`} />
					<h1 className="hh1">{typeTitle + ' Screener'}</h1>
				</div>
				<div className="flex space-x-2 items-center">
					<PresetFilters />
					<SavedFilters />
				</div>
			</div>
		</>
	)
}
