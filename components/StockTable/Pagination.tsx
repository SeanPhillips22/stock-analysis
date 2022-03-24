import { ChevronLeftIcon } from 'components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { TableResults } from './Controls/TableResults'
import { useTableContext } from './TableContext'

export function Pagination({ resultsCount }: { resultsCount?: number }) {
	const { dynamic, setState } = useTableContext()
	const totalPages = dynamic.count && resultsCount ? Math.ceil(resultsCount / dynamic.count) : ''

	function previousPage() {
		if (!dynamic.page || dynamic.page === 1) return
		else setState({ page: dynamic.page - 1 })
	}

	function nextPage() {
		if (!dynamic.page) setState({ page: 2 })
		else setState({ page: dynamic.page + 1 })
	}

	return (
		<nav className="mt-2.5 flex flex-row justify-between space-x-2 px-1 text-sm sm:text-base">
			<button
				onClick={() => previousPage()}
				disabled={!dynamic.page || dynamic.page === 1}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 sm:pl-1 sm:pr-3"
			>
				<ChevronLeftIcon className="mr-1 -mb-px h-5 w-5 text-gray-600" />
				Previous
			</button>
			<div className="flex flex-row items-center space-x-3 xs:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden xs:inline">Page </span>
					{`${dynamic.page || 1} of ${totalPages}`}
				</span>
				<TableResults />
			</div>
			<button
				onClick={() => nextPage()}
				disabled={dynamic.page === totalPages}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 sm:pr-1 sm:pl-3"
			>
				Next
				<ChevronRightIcon className="ml-1 -mb-px h-5 w-5 text-gray-600" />
			</button>
		</nav>
	)
}
