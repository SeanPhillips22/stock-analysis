import { screenerState } from 'components/Screener/screener.state'
import { CloseInput } from 'components/CloseInput'

export function FilterSearch() {
	const search = screenerState(state => state.filterSearch)
	const setSearch = screenerState(state => state.setFilterSearch)
	const filtersShown = screenerState(state => state.filtersShown)
	const setFiltersShown = screenerState(state => state.setFiltersShown)

	const addMargin = filtersShown ? ' mb-1' : ''

	// Perform the search, and expand the filters menu if it's hidden
	const performSearch = (query: string) => {
		if (!filtersShown) setFiltersShown(true)
		setSearch(query)
	}

	return (
		<div className="relative flex items-center">
			<input
				type="text"
				value={search}
				onChange={e => performSearch(e.target.value)}
				onKeyDown={e => e.key === 'Escape' && setSearch('')}
				className={`ml-auto block w-[90%] border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-0 focus:ring-blue-500 lg:ml-0 lg:w-[170px] rounded-md${addMargin}`}
				placeholder="Find filter..."
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	)
}
