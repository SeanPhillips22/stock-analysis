import { screenerState } from 'components/StockScreener/screener.state'
import { CloseInput } from 'components/CloseInput'

export function FilterSearch() {
	const search = screenerState(state => state.filterSearch)
	const setSearch = screenerState(state => state.setFilterSearch)
	const filtersShown = screenerState(state => state.filtersShown)

	const addMargin = filtersShown ? ' mb-1' : ''

	return (
		<div className="relative flex items-center">
			<input
				type="text"
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={e => e.key === 'Escape' && setSearch('')}
				className={`ml-auto block w-[90%] border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-0 focus:ring-blue-500 lg:ml-0 lg:w-[170px] rounded-md${addMargin}`}
				placeholder="Find filter..."
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	)
}
