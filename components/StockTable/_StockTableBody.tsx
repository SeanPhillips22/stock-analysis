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
import { formatTableCell } from 'functions/tables/formatTableCell'

type Props = {
	data: any[]
	columns: {
		Header: string
		accessor: DataId
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
						{rows.map((row, i) => {
							prepareRow(row)
							return (
								<tr key={i}>
									{row.cells.map((cell, ii) => {
										let cellProps = DP[cell.column.id as DataId]
										let { format, css } = cellProps
										let value = cell.value
										let uniqueKey = `${i}-${cell.column.id}-${ii}`
										if (
											!css &&
											format !== 'string' &&
											format !== 'formatDate' &&
											format !== 'linkSymbol'
										)
											css = 'tr'

										return (
											<td key={uniqueKey} className={css}>
												{formatTableCell(format, value, 'stocks')}
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
