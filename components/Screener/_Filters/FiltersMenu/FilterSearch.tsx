import { screenerState } from 'components/Screener/screener.state'
import { CloseInput } from 'components/CloseInput'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function FilterSearch() {
	const { state, dispatch } = useScreenerContext()
	const search = screenerState(state => state.filterSearch)
	const setSearch = screenerState(state => state.setFilterSearch)

	const addMargin = state.filtersShowing ? ' mb-1' : ''

	// Perform the search, and expand the filters menu if it's hidden
	const performSearch = (query: string) => {
		if (!state.filtersShowing) dispatch({ type: 'TOGGLE_FILTERS_SHOWING', value: null })
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
