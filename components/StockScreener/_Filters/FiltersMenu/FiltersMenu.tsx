import { screenerState } from 'components/StockScreener/screener.state'
import { FiltersMenuItem } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuItem'
import { FiltersMenuHeader } from 'components/StockScreener/_Filters/FiltersMenu/FiltersMenuHeader'
import { FilterSearch } from './FilterSearch'
import { FiltersMenuActive } from './FiltersMenuActive'
import { cn } from 'functions/helpers/classNames'

export function FiltersMenu() {
	const type = screenerState(state => state.type)
	const filtersShown = screenerState(state => state.filtersShown)

	return (
		<>
			<div
				className={cn(
					filtersShown ? 'border-b border-gray-300' : '',
					'grid grid-cols-2 xl:flex justify-between items-end whitespace-nowrap overflow-x-auto'
				)}
			>
				<div className="xl:order-1">
					<FiltersMenuHeader />
				</div>
				<div className="ml-auto xl:ml-0 xl:order-3">
					<FilterSearch />
				</div>
				<div
					className={cn(
						filtersShown ? 'block' : 'hidden xl:block',
						'col-span-2 xl:order-2 border-t border-gray-200 pt-2 xl:pt-0 xl:border-0'
					)}
				>
					<nav>
						<ul className="navmenu screener-filter-nav bg-gray-50 noshadow">
							{(type == 'stocks' && (
								<>
									<FiltersMenuActive />
									<FiltersMenuItem name="Popular" />
									<FiltersMenuItem name="Company" />
									<FiltersMenuItem name="Financials" />
									<FiltersMenuItem name="Valuation" />
									<FiltersMenuItem name="Dividends" />
									<FiltersMenuItem name="Other" />
									<FiltersMenuItem name="All" />
								</>
							)) ||
								(type == 'ipo' && (
									<>
										<FiltersMenuActive />
										<FiltersMenuItem name="General" />
										<FiltersMenuItem name="Income" />
										<FiltersMenuItem name="Balance Sheet" />
										<FiltersMenuItem name="Cash Flow" />
										<FiltersMenuItem name="All" />
									</>
								)) ||
								(type == 'etf' && (
									<>
										<FiltersMenuActive />
										<FiltersMenuItem name="Popular" />
										<FiltersMenuItem name="Dividends" />
										<FiltersMenuItem name="Performance" />
										<FiltersMenuItem name="All" />
									</>
								))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}
