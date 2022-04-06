import { ChevronLeftIcon } from 'components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { TableResults } from './Controls/TableResults'
import { useTableContext } from './TableContext'
import { transientState } from './transient.state'

export function Pagination({ resultsCount }: { resultsCount?: number }) {
	const { dynamic, tableId } = useTableContext()
	const page = transientState(state => state.page)
	const setPage = transientState(state => state.setPage)
	const totalPages = dynamic.count && resultsCount ? Math.ceil(resultsCount / dynamic.count) : ''

	function previousPage() {
		if (!page[tableId] || page[tableId] === 1) return
		else setPage({ ...page, [tableId]: page[tableId] - 1 })
	}

	function nextPage() {
		if (!page[tableId]) setPage({ ...page, [tableId]: 2 })
		else setPage({ ...page, [tableId]: page[tableId] + 1 })
	}

	return (
		<nav className="mt-2.5 flex flex-row justify-between space-x-1 px-1 text-sm bp:space-x-2 sm:text-base">
			<button
				onClick={() => previousPage()}
				disabled={!page[tableId] || page[tableId] === 1}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 bp:pr-2 bp:text-sm sm:pr-3 sm:pl-1"
			>
				<ChevronLeftIcon className="-mb-px h-5 w-5 text-gray-600 bp:mr-1" />
				Previous
			</button>
			<div className="flex flex-row items-center space-x-2 sm:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden sm:inline">Page </span>
					{`${page[tableId] || 1} of ${totalPages}`}
				</span>
				<TableResults />
			</div>
			<button
				onClick={() => nextPage()}
				disabled={page[tableId] === totalPages}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 bp:pl-2 bp:text-sm sm:pl-3 sm:pr-1"
			>
				Next
				<ChevronRightIcon className="-mb-px h-5 w-5 text-gray-600 bp:ml-1" />
			</button>
		</nav>
	)
}
