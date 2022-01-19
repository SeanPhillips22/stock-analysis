import { SortObject, SortProps } from 'components/StockScreener/screener.types'
import { HeaderCell } from 'components/Tables/HeaderCell'
import { useSort } from 'hooks/useSort'
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useAsyncDebounce
} from 'react-table'
import { DataId } from 'types/DataId'
import { TableControls } from './Controls/_TableControls'
import { stockTableState } from './stockTableState'

type Props = {
	data: any[]
	columns: {
		Header: string
		accessor: DataId
		Cell: (props: any) => any
	}[]
	sort?: SortObject[]
	sortProps: SortProps
}

export function StockTableBody({ data, columns, sort, sortProps }: Props) {
	const sorted = stockTableState(state => state.sorted)
	const search = stockTableState(state => state.search)
	const setSearch = stockTableState(state => state.setSearch)
	const { updateSort } = useSort(sortProps)

	const { headerGroups, prepareRow, rows, setGlobalFilter } = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: sorted && sorted.length ? sorted : sort
			}
		},
		useGlobalFilter,
		useSortBy
	)

	return (
		<div>
			<div className="mt-3 sm:mt-0">
				<TableControls
					tableId="stock-table"
					filter={{
						useAsyncDebounce,
						setGlobalFilter,
						setFilterState: setSearch,
						globalFilter: search
					}}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="symbol-table stock-table" id="stock-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<HeaderCell
										key={index}
										column={column}
										updateSort={updateSort}
									/>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{rows.map((row, index) => {
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
		</div>
	)
}
