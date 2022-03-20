import 'regenerator-runtime/runtime'
import { FilterValue } from 'react-table'
import { Export } from 'components/Controls/Export'
import { Filter } from 'components/Controls/Filter'
import { ResultsNav } from './ResultsNav'
import { ColumnDropdown } from 'components/Screener/_Results/ResultsMenu/ColumnSelection/ColumnDropdown'
import { ScreenerTypes } from 'components/Screener/screener.types'

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
		<div className="mt-6 grid grid-cols-2 items-center border-t border-gray-300 lg:flex lg:space-x-3 lg:overflow-visible lg:py-2 lg:px-1">
			<div>
				<h2 className="whitespace-nowrap text-xl font-semibold text-gray-800 bp:text-[1.3rem]">
					{`${count} Results`}
				</h2>
			</div>
			<div className="flex flex-row justify-end py-2 md:space-x-4 lg:order-3 lg:space-x-3 lg:py-0">
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
					<Export tableId={tableId} />
				</div>
				<div className="ml-auto md:ml-0">
					<ColumnDropdown />
				</div>
			</div>
			<div className="hide-scroll col-span-2 overflow-x-auto border-t lg:order-2 lg:grow lg:border-0 lg:pl-1 xl:pl-2">
				<ResultsNav type={type} />
			</div>
		</div>
	)
}
