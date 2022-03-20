import { FiltersMenuItem } from 'components/Screener/_Filters/FiltersMenu/FiltersMenuItem'
import { FiltersMenuHeader } from 'components/Screener/_Filters/FiltersMenu/FiltersMenuHeader'
import { FilterSearch } from './FilterSearch'
import { FiltersMenuActive } from './FiltersMenuActive'
import { cn } from 'functions/helpers/classNames'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function FiltersMenu() {
	const { type, state } = useScreenerContext()

	return (
		<>
			<div
				className={cn(
					state.filtersShowing ? 'border-b border-gray-300' : '',
					'grid grid-cols-2 items-end justify-between overflow-x-auto whitespace-nowrap xl:flex'
				)}
			>
				<div className="xl:order-1">
					<FiltersMenuHeader />
				</div>
				<div className="ml-auto xl:order-3 xl:ml-0">
					<FilterSearch />
				</div>
				<div
					className={cn(
						state.filtersShowing ? 'block' : 'hidden xl:block',
						'col-span-2 border-t border-gray-200 pt-2 xl:order-2 xl:border-0 xl:pt-0'
					)}
				>
					<nav>
						<ul className="navmenu screener-filter-nav noshadow bg-gray-50">
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
