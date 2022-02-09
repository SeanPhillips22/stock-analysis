import { SortObject, SortProps } from 'components/StockScreener/screener.types'
import { HeaderCell } from 'components/Tables/HeaderCell'
import { useSort } from 'hooks/useSort'
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useAsyncDebounce,
	useColumnOrder
} from 'react-table'
import { StockTableControls } from './_StockTableControls'
import { useState } from 'react'
import { DataPoints as DP } from 'data/StockDataPoints'
import { DataId } from 'types/DataId'

type Props = {
	data: any[]
	columns: {
		Header: string
		accessor: DataId
		Cell: (props: any) => any
	}[]
	sortProps: SortProps
	sort?: SortObject[]
	tableId: string
	columnOrder?: DataId[]
}

export function StockTableBody({
	data,
	columns,
	sortProps,
	sort,
	tableId,
	columnOrder
}: Props) {
	const [search, setSearch] = useState('')
	const { updateSort } = useSort(sortProps)

	const { headerGroups, prepareRow, rows, setGlobalFilter } = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: sort && sort.length ? sort : sortProps.defaultSort,
				columnOrder: columnOrder || []
			}
		},
		useGlobalFilter,
		useSortBy,
		useColumnOrder
	)

	return (
		<div>
			<div className="mt-3 sm:mt-0">
				<StockTableControls
					filter={{
						useAsyncDebounce,
						setGlobalFilter,
						setFilterState: setSearch,
						globalFilter: search
					}}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="symbol-table stock-table" id={tableId}>
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
										return (
											<td
												key={index}
												className={
													DP[cell.column.id as DataId].class
												}
											>
												{cell.render('Cell')}
											</td>
										)
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
