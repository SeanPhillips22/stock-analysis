import { SortObject, SortProps } from 'components/StockScreener/screener.types'
import { HeaderCell } from 'components/Tables/HeaderCell'
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useAsyncDebounce
} from 'react-table'
import { DataId } from 'types/Data'
import { TableControls } from './Controls/_TableControls'

type Props = {
	data: any[]
	columns: {
		Header: string
		accessor: DataId
		Cell: (props: any) => any
	}[]
	sorted?: SortObject[]
	sortProps: SortProps
}

export function StockTableBody({ data, columns, sorted, sortProps }: Props) {
	const {
		headerGroups,
		prepareRow,
		rows,
		setGlobalFilter,
		state: { globalFilter }
	} = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: sorted
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
					filter={{ useAsyncDebounce, setGlobalFilter, globalFilter }}
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
										sortProps={sortProps}
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
