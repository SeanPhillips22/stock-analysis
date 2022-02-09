import 'regenerator-runtime/runtime'
import { FilterValue } from 'react-table'
import { Export } from 'components/Controls/Export'
import { Filter } from 'components/Controls/Filter'
import { ResultsNav } from './ResultsNav'
import { ColumnDropdown } from 'components/StockScreener/_Results/ResultsMenu/ColumnSelection/ColumnDropdown'
import { ScreenerTypes } from 'components/StockScreener/screener.types'

interface Props {
	count: number
	title: string
	useAsyncDebounce: (value: any, wait: number) => any
	globalFilter: any
	setGlobalFilter: (filterValue: FilterValue) => void
	setFilterState: (filterValue: FilterValue) => void
	tableId: string
	append?: string
	type: ScreenerTypes
}

export function ResultsMenu({
	count,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	setFilterState,
	tableId,
	type
}: Props) {
	return (
		<div className="grid grid-cols-2 lg:flex items-center lg:space-x-3 lg:py-2 lg:px-1 lg:overflow-visible border-t border-gray-300 mt-6">
			<div>
				<h2 className="text-xl bp:text-[1.3rem] font-semibold whitespace-nowrap text-gray-800">
					{`${count} Results`}
				</h2>
			</div>
			<div className="lg:order-3 py-2 lg:py-0 flex flex-row justify-end md:space-x-4 lg:space-x-3">
				<div className="hidden max-w-[110px] md:block">
					<Filter
						useAsyncDebounce={useAsyncDebounce}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
						setFilterState={setFilterState}
						filterText="Search..."
					/>
				</div>
				<div className="hidden md:block">
					<Export
						buttons={[
							{
								title: 'Export to Excel',
								type: 'xlsx',
								restricted: true
							},
							{ title: 'Export to CSV', type: 'csv', restricted: true }
						]}
						tableId={tableId}
					/>
				</div>
				<div className="ml-auto md:ml-0">
					<ColumnDropdown type={type} />
				</div>
			</div>
			<div className="col-span-2 overflow-x-auto hide-scroll lg:flex-grow lg:order-2 border-t lg:border-0 lg:pl-1 xl:pl-2">
				<ResultsNav type={type} />
			</div>
		</div>
	)
}
