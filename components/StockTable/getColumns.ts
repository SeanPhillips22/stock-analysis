import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/DataId'

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
		let { name, colName, format, sort } = DataPoints[col]

		// Header: the name of the column, shown
		// accessor: the id of the column, not shown
		// Cell: how to format the values of the cells in the column
		return {
			Header: colName || name,
			accessor: col,
			sortType: sort || 'basic',
			sortInverted: col !== main && format !== 'string' && format !== 'linkSymbol' ? true : false
		}
	})

	return columns
}
