import { screenerState } from 'components/Screener/screener.state'
import { ChevronLeftIcon } from 'components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { SelectRowCount } from './SelectRowCount'
import { cn } from 'functions/helpers/classNames'

type Props = {
	previousPage: () => void
	canPreviousPage: boolean
	pageIndex: number
	pageOptions: number[]
	pageSize: number
	setPageSize: (pageSize: number) => void
	nextPage: () => void
	canNextPage: boolean
}

export function Pagination({
	previousPage,
	canPreviousPage,
	pageIndex,
	pageOptions,
	pageSize,
	setPageSize,
	nextPage,
	canNextPage
}: Props) {
	const tablePage = screenerState(state => state.tablePage)
	const setTablePage = screenerState(state => state.setTablePage)
	const setTableSize = screenerState(state => state.setTableSize)

	function setSelected(value: number) {
		setPageSize(value)
		setTableSize(value)
		setTablePage(0)
	}

	return (
		<nav className="hide-scroll mt-2.5 flex flex-row items-center justify-between space-x-1.5 py-1 px-0.5 text-sm sm:space-x-2 sm:text-base">
			<button
				onClick={() => {
					previousPage()
					setTablePage(tablePage - 2)
				}}
				disabled={!canPreviousPage}
				className={cn(
					'flex items-center rounded-md border border-gray-300 bg-white py-2 pl-1.5 pr-2.5 font-medium text-gray-700 hover:bg-gray-50 sm:pr-3',
					!canPreviousPage ? ' cursor-default hover:bg-white' : ' cursor-pointer'
				)}
			>
				<ChevronLeftIcon className="-mb-px h-4 w-4" />
				<div className="hidden xs:inline">Previous</div>
			</button>
			<div className="flex flex-row items-center space-x-2 text-gray-700 bp:space-x-4">
				<span className="whitespace-nowrap font-medium">
					<span className="hidden sm:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<SelectRowCount pageSize={pageSize} setSelected={setSelected} />
			</div>
			<button
				onClick={() => {
					nextPage()
					setTablePage(tablePage + 1)
				}}
				disabled={!canNextPage}
				className={cn(
					'flex items-center rounded-md border border-gray-300 bg-white py-2 pr-1.5 pl-2.5 font-medium text-gray-700 hover:bg-gray-50 sm:pl-3',
					!canNextPage ? ' cursor-default hover:bg-white' : ' cursor-pointer'
				)}
			>
				<div className="hidden xs:inline">Next</div>
				<ChevronRightIcon className="-mb-px h-4 w-4" />
			</button>
		</nav>
	)
}
