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
				className={`w-[90%] ml-auto lg:w-[170px] lg:ml-0 shadow-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 rounded-md${addMargin}`}
				placeholder="Find filter..."
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	)
}
