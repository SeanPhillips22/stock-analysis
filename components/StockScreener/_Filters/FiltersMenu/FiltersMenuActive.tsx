import { screenerState } from 'components/StockScreener/screener.state'

export function FiltersMenuActive() {
	const search = screenerState((state) => state.filterSearch)
	const filters = screenerState((state) => state.filters)
	const filterMenu = screenerState((state) => state.filterMenu)
	const setFilterMenu = screenerState((state) => state.setFilterMenu)

	const count = filters.length

	if (filterMenu === 'Active') {
		return (
			<li>
				<span
					className="active cursor-pointer"
					data-title="Active (2)"
					onClick={() => setFilterMenu('Active')}
					tabIndex={search.length > 0 ? -1 : 0}
				>
					Active ({count})
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="inactive focus:outline-none focus:bg-gray-200"
				data-title="Active (2)"
				onClick={() => setFilterMenu('Active')}
				onKeyPress={(e) => e.key === 'Enter' && setFilterMenu('Active')}
				tabIndex={search.length > 0 ? -1 : 0}
			>
				Active ({count})
			</span>
		</li>
	)
}
