import { screenerState } from 'components/Screener/screener.state'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function FiltersMenuActive() {
	const { state, dispatch } = useScreenerContext()
	const search = screenerState(state => state.filterSearch)

	const count = state.filters.length || 0

	// If the "Active" filter menu is currently selected
	if (state?.filtersMenu === 'Active') {
		return (
			<li>
				<span className="active cursor-pointer" data-title="Active (2)" tabIndex={search.length > 0 ? -1 : 0}>
					Active ({count})
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="inactive focus:bg-gray-200 focus:outline-none"
				data-title="Active (2)"
				onClick={() => dispatch({ type: 'SET_FILTERS_MENU', value: 'Active' })}
				onKeyPress={e => e.key === 'Enter' && dispatch({ type: 'SET_FILTERS_MENU', value: 'Active' })}
				tabIndex={search.length > 0 ? -1 : 0}
			>
				Active ({count})
			</span>
		</li>
	)
}
