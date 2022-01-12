import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { formatCell } from 'functions/tables/tableFormat'

export function getColumns(cols: DataId[]) {
	const columns = cols.map((col) => {
		let { name, format } = DataPoints[col]

		// If a format function is defined, use it
		if (format) {
			return {
				Header: name,
				accessor: col,
				Cell: (props: any) => {
					return format ? formatCell(format, props, 'stocks') : null
				}
			}
		}

		// Otherwise, use the default format
		return {
			Header: name,
			accessor: col
		}
	})

	return columns
}
