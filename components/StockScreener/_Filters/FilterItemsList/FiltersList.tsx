import { screenerState } from 'components/StockScreener/screener.state'
import { getDataPoints } from 'components/StockScreener/maps/dataPoints'
import { ClearFiltersButton } from '../ClearFiltersButton'
import { FilterWrap } from './FilterWrap'
import { DataId } from 'types/DataId'

export function FiltersList() {
	const type = screenerState(state => state.type)
	const filters = screenerState(state => state.filters)
	const filterMenu = screenerState(state => state.filterMenu)
	const filterSearch = screenerState(state => state.filterSearch)
	const filtersShown = screenerState(state => state.filtersShown)
	const DataPoints = getDataPoints(type)

	if (!filtersShown) {
		return null
	}

	if (filterSearch.length > 0) {
		let searched: DataId[] = []

		DataPoints.map(f => {
			if (
				f.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
				f.id.toLowerCase().includes(filterSearch.toLowerCase())
			) {
				searched.push(f.id)
			}
		})

		if (!searched.length) {
			return (
				<div className="pt-1.5 pl-1">
					No filters found that matched {`"${filterSearch}"`}
				</div>
			)
		}

		return (
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 pt-1">
				{DataPoints.map(f => {
					if (searched.includes(f.id)) {
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
				{DataPoints.map(f => {
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
				{DataPoints.map(f => {
					if (f.category?.includes(filterMenu) || filterMenu === 'All') {
						return <FilterWrap f={f} key={f.id} />
					}
					return null
				})}
			</div>
		</>
	)
}
