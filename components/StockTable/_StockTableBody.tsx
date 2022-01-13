import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useAsyncDebounce
} from 'react-table'
import { DataId } from 'types/Data'
import { PageConfig } from 'types/PageConfig'
import { TableControls } from './Controls/_TableControls'

type Props = {
	data: any[]
	columns: {
		Header: string
		accessor: DataId
		Cell: (props: any) => any
	}[]
	config: PageConfig
}

export function StockTableBody({ data, columns, config }: Props) {
	const {
		headerGroups,
		prepareRow,
		rows,
		setGlobalFilter,
		state: { globalFilter }
	} = useTable(
		{
			columns,
			data
		},
		useGlobalFilter,
		useSortBy
	)

	return (
		<div>
			<div className="mt-3 sm:mt-0">
				<TableControls
					config={config}
					tableId="stock-table"
					filter={{ useAsyncDebounce, setGlobalFilter, globalFilter }}
				/>
			</div>
			<div className="overflow-x-auto">
				<table className="symbol-table two-left" id="stock-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th key={index}>
										<span className="inline-flex flex-row items-center">
											{column.render('Header')}
										</span>
									</th>
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
