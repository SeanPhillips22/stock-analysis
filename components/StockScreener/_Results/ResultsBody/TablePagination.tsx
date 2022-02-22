import { DropdownSelect } from 'components/StockScreener/_Results/ResultsBody/DropdownSelect'
import { screenerState } from 'components/StockScreener/screener.state'
import { ChevronLeftIcon } from 'components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { useAuthState } from 'hooks/useAuthState'

interface Props {
	previousPage: () => void
	canPreviousPage: boolean
	pageIndex: number
	pageOptions: number[]
	pageSize: number
	setPageSize: (pageSize: number) => void
	nextPage: () => void
	canNextPage: boolean
}

export function TablePagination({
	previousPage,
	canPreviousPage,
	pageIndex,
	pageOptions,
	pageSize,
	setPageSize,
	nextPage,
	canNextPage
}: Props) {
	const { isPro } = useAuthState()
	const tablePage = screenerState(state => state.tablePage)
	const setTablePage = screenerState(state => state.setTablePage)
	const setTableSize = screenerState(state => state.setTableSize)

	const selectOptions = [
		{ value: 20, name: '20 Rows' },
		{ value: 50, name: '50 Rows' },
		{ value: 100, name: '100 Rows' },
		{ value: 200, name: '200 Rows' }
	]

	if (isPro) {
		selectOptions.push({ value: 10000, name: 'Show All' })
	}

	function setSelected(value: number) {
		setPageSize(value)
		setTableSize(value)
		setTablePage(0)
	}

	return (
		<nav className="hide-scroll mt-2.5 flex flex-row items-center justify-between space-x-1.5 overflow-x-auto py-1 px-0.5 text-sm sm:space-x-2 sm:text-base">
			<button
				onClick={() => {
					previousPage()
					setTablePage(tablePage - 2)
				}}
				disabled={!canPreviousPage}
				className={`flex items-center rounded-md border border-gray-300 bg-white py-2 pl-1.5 pr-2.5 font-medium text-gray-700 hover:bg-gray-50 sm:pr-3${
					!canPreviousPage
						? ' cursor-default hover:bg-white'
						: ' cursor-pointer'
				}`}
			>
				<ChevronLeftIcon className="-mb-px h-4 w-4" />
				<div className="hidden xs:inline">Previous</div>
			</button>
			<div className="flex flex-row items-center space-x-2 font-medium text-gray-700 bp:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden sm:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<DropdownSelect
					selected={pageSize}
					setSelected={setSelected}
					selectOptions={selectOptions}
				/>
			</div>
			<button
				onClick={() => {
					nextPage()
					setTablePage(tablePage + 1)
				}}
				disabled={!canNextPage}
				className={`flex items-center rounded-md border border-gray-300 bg-white py-2 pr-1.5 pl-2.5 font-medium text-gray-700 hover:bg-gray-50 sm:pl-3${
					!canNextPage
						? ' cursor-default hover:bg-white'
						: ' cursor-pointer'
				}`}
			>
				<div className="hidden xs:inline">Next</div>
				<ChevronRightIcon className="-mb-px h-4 w-4" />
			</button>
		</nav>
	)
}
