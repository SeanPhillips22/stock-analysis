import { useTable } from 'react-table'
import { useContext, useMemo } from 'react'
import { TableContext } from 'pages/markets/gainers'
import { getColumns } from './getColumns'

/**
 * A re-usable screener mechanism that can output a table of stocks with specific properties
 * Customizable columns, export, filtering, sorting, and pagination
 */
export function StockTable() {
	const state = useContext(TableContext)

	const data = useMemo(() => state.data, [state.data])
	const columns = useMemo(() => getColumns(state.columns), [state.columns])

	const { headerGroups, prepareRow, rows } = useTable({
		columns,
		data
	})

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="symbol-table index" id="symbol-table">
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
// ? Should use React Query
