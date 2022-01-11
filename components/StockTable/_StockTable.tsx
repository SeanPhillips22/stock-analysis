import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useAsyncDebounce
} from 'react-table'
import { useMemo } from 'react'
import { getColumns } from './getColumns'
import { TableControls } from './Controls/_TableControls'
import { PageConfig } from 'types/PageConfig'

type Props = {
	_data: any[]
	_columns: string[]
	config: PageConfig
}

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable({ _data, _columns, config }: Props) {
	// add react query hook, pass data as initialData, then memoize the state from RQ
	// When columns change, react query makes a new api call and updates the table

	const data = useMemo(() => _data, [_data])
	const columns = useMemo(() => getColumns(_columns), [_columns])

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
				<table className="symbol-table index" id="stock-table">
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

// ? Needs a backend component, maybe a Screener object?
