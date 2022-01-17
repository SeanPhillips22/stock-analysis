import { screenerState } from 'components/StockScreener/screener.state'
import {
	FiltersMap,
	IPOFiltersMap,
	ETFFiltersMap
} from 'components/StockScreener/maps/filters.map'
import { ClearFiltersButton } from '../ClearFiltersButton'
import { FilterWrap } from './FilterWrap'

export function FiltersList() {
	const type = screenerState(state => state.type)
	const filters = screenerState(state => state.filters)
	const filterMenu = screenerState(state => state.filterMenu)
	const filterSearch = screenerState(state => state.filterSearch)
	const filtersShown = screenerState(state => state.filtersShown)

	if (!filtersShown) {
		return null
	}
	let filterMap = []

	if (type == 'stocks') {
		filterMap = FiltersMap
	} else if (type == 'ipo') {
		filterMap = IPOFiltersMap
	} else {
		filterMap = ETFFiltersMap
	}

	if (filterSearch.length > 0) {
		return (
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 pt-1">
				{filterMap.map(f => {
					if (
						f.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
						f.id.toLowerCase().includes(filterSearch.toLowerCase())
					) {
						return <FilterWrap f={f} key={f.id} />
					}
					return null
				})}
			</div>
		)
	}

	if (filterMenu === 'Active') {
		const active = filters.map(f => f.id)

		if (active.length === 0) {
			return (
				<div className="px-2 py-3 pb-2 text-sm lg:text-base">
					No active filters. Find a filter using the search box above or
					choose a filter category from the menu.
				</div>
			)
		}

		return (
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 pt-1">
				{filterMap.map(f => {
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
			<div
				className={`sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-2.5 pt-1`}
			>
				{filterMap.map(f => {
					if (f.category?.includes(filterMenu) || filterMenu === 'All') {
						return <FilterWrap f={f} key={f.id} />
					}
					return null
				})}
			</div>
		</>
	)
}
