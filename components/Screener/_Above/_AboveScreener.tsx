import { screenerState } from '../screener.state'
import { useScreenerContext } from '../ScreenerContext'
import { PresetScreens } from './PresetScreens/_PresetScreens'
import { SavedScreens } from './SavedScreens/_SavedScreens'

export function AboveScreener() {
	const { title, state } = useScreenerContext()
	const resultsCount = screenerState(state => state.resultsCount)

	const filterCount = state.filters.length
	return (
		<>
			<div className="mb-2.5 md:mb-1.5 md:flex md:items-end md:justify-between">
				<div className="flex items-end">
					<h1 className="hh1 mb-3.5 md:mb-2">{title}</h1>
					{filterCount > 0 && (
						<span className="ml-2.5 mb-4 hidden text-sm font-semibold text-gray-600 xs:block md:mb-2.5">
							{resultsCount} matches
						</span>
					)}
				</div>
				<div className="flex items-center space-x-2">
					<PresetScreens />
					<SavedScreens />
				</div>
			</div>
		</>
	)
}
