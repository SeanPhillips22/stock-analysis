import { screenerState } from 'components/Screener/screener.state'
import { ClearFiltersButton } from '../FiltersMenu/ClearFiltersButton'
import { FilterWrap } from './FilterItemWrap'
import { DataId } from 'types/DataId'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function FiltersList() {
	const { state, dataPoints } = useScreenerContext()
	const filterSearch = screenerState(state => state.filterSearch)

	if (!state.filtersShowing) {
		return null
	}

	if (filterSearch.length > 0) {
		let searched: DataId[] = []

		dataPoints.map(f => {
			if (
				f.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
				f.id.toLowerCase().includes(filterSearch.toLowerCase()) ||
				f.searchMatches?.replace(/%/g, ' ').includes(filterSearch.toLowerCase())
			) {
				searched.push(f.id)
			}
		})

		if (!searched.length) {
			return <div className="pt-1.5 pl-1">No filters found that matched {`"${filterSearch}"`}</div>
		}

		return (
			<div className="gap-x-2.5 pt-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{dataPoints.map(f => {
					if (searched.includes(f.id)) {
						if (f.id !== 's' && f.id !== 'n' && !f.columnsOnly) {
							return <FilterWrap f={f} key={f.id} />
						}
					}
					return null
				})}
			</div>
		)
	}

	if (state.filtersMenu === 'Active') {
		const active = state.filters.map(f => f.id)

		if (active.length === 0) {
			return (
				<div className="px-2 py-3 pb-2 text-sm lg:text-base">
					No active filters. Find a filter using the search box above or choose a filter category from the menu.
				</div>
			)
		}

		return (
			<div className="gap-x-2.5 pt-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{dataPoints.map(f => {
					if (active.includes(f.id)) {
						return <FilterWrap f={f} key={f.id} />
					}
					return null
				})}
				<ClearFiltersButton showLabel={true} />
			</div>
		)
	}

	return (
		<>
			<div className={`pt-1 sm:grid sm:grid-cols-2 sm:gap-x-2.5 lg:grid-cols-3 xl:grid-cols-4`}>
				{dataPoints.map(f => {
					if (f.category?.includes(state.filtersMenu) || state.filtersMenu === 'All') {
						if (f.id !== 's' && f.id !== 'n' && !f.columnsOnly) {
							return <FilterWrap f={f} key={f.id} />
						}
					}
					return null
				})}
			</div>
		</>
	)
}
