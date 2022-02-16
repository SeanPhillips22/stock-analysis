interface Props {
	pageOptions: number[]
	canPreviousPage: boolean
	canNextPage: boolean
	pageIndex: number
	pageSize: number
	previousPage: () => void
	nextPage: () => void
	setPageSize: (pageSize: number) => void
}

export const Pagination = ({
	previousPage,
	canPreviousPage,
	pageIndex,
	pageOptions,
	pageSize,
	setPageSize,
	nextPage,
	canNextPage
}: Props) => {
	return (
		<nav className="mt-2.5 flex flex-row justify-between space-x-2 px-1 text-sm sm:text-base">
			<button
				onClick={() => previousPage()}
				disabled={!canPreviousPage}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 sm:px-4"
			>
				{`< Previous`}
			</button>
			<div className="flex flex-row items-center space-x-3 xs:space-x-4">
				<span className="whitespace-nowrap">
					<span className="hidden xs:inline">Page </span>
					{`${pageIndex + 1} of ${pageOptions.length}`}
				</span>
				<select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
					name="perpage"
					className="block w-full rounded-md border-gray-300 py-1.5 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 xs:py-2 xs:pl-2.5 xs:pr-9 sm:pl-3 sm:pr-10 sm:text-base"
				>
					<option value="500">500</option>
					<option value="1000">1000</option>
					<option value="10000">10000</option>
				</select>
			</div>
			<button
				onClick={() => nextPage()}
				disabled={!canNextPage}
				className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 sm:px-4"
			>
				{`Next >`}
			</button>
		</nav>
	)
}
