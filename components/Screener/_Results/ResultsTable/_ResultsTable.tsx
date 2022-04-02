import { screenerState } from 'components/Screener/screener.state'
import { useEffect, useMemo } from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { ResultsMenu } from '../ResultsMenu/ResultsMenu'
import { Pagination } from './Pagination/_Pagination'

import { filterItems } from 'components/Screener/functions/filterItems'
import { Loading } from 'components/Loading/Loading'
import { ColumnSort } from 'components/Tables/ColumnSort'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { useScreenerSort } from 'components/Screener/functions/useScreenerSort'

export function ResultsTable({ cols }: { cols: any }) {
	const { type, state, dispatch } = useScreenerContext()
	const datarows = screenerState(state => state.data)
	const loaded = screenerState(state => state.loaded)
	const tablePage = screenerState(state => state.tablePage)
	const tableSize = screenerState(state => state.tableSize)
	const fetching = screenerState(state => state.fetching)
	const setResultsCount = screenerState(state => state.setResultsCount)
	const searchFilter = screenerState(state => state.searchFilter)
	const setFilterState = screenerState(state => state.setSearchFilter)
	const resultsMenu = screenerState(state => state.resultsMenu)
	const { updateSort } = useScreenerSort({
		defaultSort: state.sort.default,
		dispatch
	})

	// Memoize data and settings for the table
	const data = useMemo(() => filterItems(datarows, state.filters), [datarows, state.filters])
	const columns = useMemo(() => cols, [cols])
	const sortResultsBy = useMemo(() => state.sort.active, [state.sort.active])

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
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: tablePage,
				pageSize: tableSize,
				hiddenColumns: columns
					.filter((col: any) => !state.columns.all[resultsMenu].includes(col.accessor))
					.map((col: any) => col.accessor),
				sortBy: sortResultsBy
			},
			autoResetGlobalFilter: false
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	if (!loaded || (fetching.length && !rows.length)) {
		return (
			<div className="mt-6 h-[600px]">
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
				globalFilter={searchFilter}
				setGlobalFilter={setGlobalFilter}
				setFilterState={setFilterState}
				tableId="screener-table"
			/>
			<div className="overflow-x-auto">
				<table className={`symbol-table w-full ${type}`} id="screener-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column: any, index) => (
									<th
										key={index}
										{...column.getSortByToggleProps({
											title: `Sort by: ${column.name || column.Header}`
										})}
									>
										<span className="flex flex-row items-center" onClick={() => updateSort(column)}>
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
			<Pagination
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
