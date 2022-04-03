import { screenerState } from 'components/Screener/screener.state'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { cn } from 'functions/helpers/classNames'

export function FiltersMenuActive() {
	const { state } = useScreenerContext()
	const search = screenerState(state => state.filterSearch)
	const filterMenu = screenerState(state => state.filterMenu)
	const setFilterMenu = screenerState(state => state.setFilterMenu)

	const count = state.filters.length || 0

	// If the "Active" filter menu is currently selected
	if (filterMenu === 'Active') {
		return (
			<li>
				<span
					className="active cursor-pointer border border-transparent md:border-0"
					data-title="Active (2)"
					tabIndex={search.length > 0 ? -1 : 0}
				>
					Active
					<div className="ml-1.5 inline-block rounded border bg-gray-100 px-3 text-xs text-black shadow-sm xs:text-sm md:text-base">
						{count}
					</div>
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="inactive relative border border-transparent focus:outline-none md:border-0"
				data-title="Active (2)"
				onClick={() => setFilterMenu('Active')}
				onKeyPress={e => e.key === 'Enter' && setFilterMenu('Active')}
				tabIndex={search.length > 0 ? -1 : 0}
			>
				Active
				<div
					className={cn(
						'ml-1.5 inline-block rounded border border-gray-200 px-3 text-xs text-black shadow-sm xs:text-sm md:text-base',
						count > 0 ? 'bg-yellow-100' : 'bg-gray-100'
					)}
				>
					{count}
				</div>
			</span>
		</li>
	)
}
