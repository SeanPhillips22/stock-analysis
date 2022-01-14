import { screenerState } from 'components/StockScreener/screener.state'
import { useEffect, useMemo } from 'react'
import {
	useTable,
	useSortBy,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce
} from 'react-table'
import { ResultsMenu } from '../ResultsMenu/ResultsMenu'
import { TablePagination } from './TablePagination'

import { filterItems } from 'components/StockScreener/functions/filterItems'
import { Loading } from 'components/Loading/Loading'
import { useSortReset } from 'components/StockScreener/functions/sort/useSortReset'
import { ColumnSort } from 'components/Tables/ColumnSort'

export function ResultsTable({ cols }: { cols: any }) {
	const type = screenerState((state) => state.type)
	const datarows = screenerState((state) => state.data)
	const loaded = screenerState((state) => state.loaded)
	const filters = screenerState((state) => state.filters)
	const sort = screenerState((state) => state.sort)
	const tablePage = screenerState((state) => state.tablePage)
	const tableSize = screenerState((state) => state.tableSize)
	const showColumns = screenerState((state) => state.showColumns)
	const fetching = screenerState((state) => state.fetching)
	const setResultsCount = screenerState((state) => state.setResultsCount)
	const resetSort = useSortReset()

	// Memoize data and settings for the table
	const data = useMemo(
		() => filterItems(datarows, filters),
		[datarows, filters]
	)
	const columns = useMemo(() => cols, [cols])
	const sortResultsBy = useMemo(() => sort, [sort])

	// Add the results count into global state
	useEffect(() => {
		setResultsCount(data.length)
	}, [data, setResultsCount])

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
		state: { pageIndex, pageSize, globalFilter }
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
				hiddenColumns: columns
					.filter((col: any) => !showColumns.includes(col.accessor))
					.map((col: any) => col.accessor),
				sortBy: sortResultsBy
			},
			autoResetSortBy: resetSort,
			autoResetGlobalFilter: false
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	if (!loaded || (fetching.length && !rows.length)) {
		return (
			<div className="h-[600px] mt-6">
				<Loading />
			</div>
		)
	}

	return (
		<>
			<ResultsMenu
				type={type}
				count={rows.length}
				title="Matches"
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				tableId="screener-table"
			/>
			<div className="overflow-x-auto">
				<table
					className={`symbol-table w-full ${type}`}
					id="screener-table"
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column: any, index) => (
									<th
										{...column.getSortByToggleProps({
											title: `Sort by: ${
												column.name || column.Header
											}`
										})}
										key={index}
									>
										<span className="flex flex-row items-center">
											{column.render('Header')}
											<ColumnSort column={column} />
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
			<TablePagination
				previousPage={previousPage}
				canPreviousPage={canPreviousPage}
				pageIndex={pageIndex}
				pageOptions={pageOptions}
				pageSize={pageSize}
				setPageSize={setPageSize}
				nextPage={nextPage}
				canNextPage={canNextPage}
			/>
		</>
	)
}
