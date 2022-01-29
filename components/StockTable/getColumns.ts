import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/DataId'
import { formatCells } from 'functions/tables/formatCells'

/**
 * This function formats the columns for react-table
 * @param cols an array of data point names
 * @returns
 */
export function getColumns(cols: DataId[], main: DataId) {
	const newCols = [...cols]

	// Add the "main" column to the front of the array
	if (!newCols.includes(main)) newCols.splice(2, 0, main)

	const columns = newCols.map(col => {
		// destructure the data points
		let { name, colName, format } = DataPoints[col]

		// Header: the name of the column, shown
		// accessor: the id of the column, not shown
		// Cell: how to format the values of the cells in the column
		return {
			Header: colName || name,
			accessor: col,
			Cell: (props: any) => {
				return format
					? formatCells(format, props, 'stocks')
					: props.value
					? props.value
					: '-'
			},
			sortInverted:
				col !== main && format !== 'string' && format !== 'linkSymbol'
					? true
					: false
		}
	})

	return columns
}
