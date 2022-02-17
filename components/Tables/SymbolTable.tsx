// Used on the /stocks/ and /etf/ index pages
import { useMemo } from 'react'
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	Column
} from 'react-table'
import { tableState } from 'state/tableState'
import { Controls } from 'components/Controls/_Controls'
import { useSort } from 'hooks/useSort'
import { ColumnSort } from './ColumnSort'

interface StockType {
	s: string
	n: string
	cls?: string
	aum?: number
	i?: string
	m?: number
}

interface Props {
	title: string
	columndata: Column[]
	rowdata: StockType[]
}

export function SymbolTable({ title, columndata, rowdata }: Props) {
	const tablePage = tableState(state => state.tablePage)
	const setTablePage = tableState(state => state.setTablePage)
	const tableSize = tableState(state => state.tableSize)
	const setTableSize = tableState(state => state.setTableSize)
	const sort = tableState(state => state.sort)
	const setSort = tableState(state => state.setSort)
	const filter = tableState(state => state.filter)
	const setFilter = tableState(state => state.setFilter)
	const columns = useMemo(() => columndata, [columndata])
	const data = useMemo(() => rowdata, [rowdata])
	const { updateSort } = useSort({
		defaultSort: [{ id: 's', desc: true }],
		setSort
	})

	const {
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		rows,
		setPageSize,
		setGlobalFilter,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
				sortBy: sort
			}
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	return (
		<>
			<Controls
				count={rows.length}
				title={title}
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={filter}
				setGlobalFilter={setGlobalFilter}
				setFilterState={setFilter}
				tableId="symbol-table"
			/>
			<div className="overflow-x-auto">
				<table className="symbol-table index" id="symbol-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										{...column.getSortByToggleProps({
											title: `Sort by: ${column.Header}`
										})}
									>
										<span
											className="inline-flex flex-row items-center"
											onClick={() => updateSort(column)}
										>
											{column.render('Header')}
											{column.Header !== 'Symbol' && (
												<ColumnSort column={column} />
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{page.map((row, index) => {
							prepareRow(row)
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<nav className="mt-2.5 flex flex-row justify-between space-x-2 px-1 text-sm sm:text-base">
				<button
					onClick={() => {
						previousPage()
						setTablePage(tablePage - 2)
					}}
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
							setTableSize(Number(e.target.value))
							setTablePage(0)
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
					onClick={() => {
						nextPage()
						setTablePage(tablePage + 1)
					}}
					disabled={!canNextPage}
					className="relative inline-flex items-center whitespace-nowrap rounded-md border border-gray-300 bg-white px-1 py-1.5 font-medium text-gray-700 hover:bg-gray-50 xs:px-1.5 xs:py-2 sm:px-4"
				>
					{`Next >`}
				</button>
			</nav>
			<div className="mt-6 text-center">
				<button
					className="bll text-lg"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					Back to Top &#8593;
				</button>
			</div>
		</>
	)
}
