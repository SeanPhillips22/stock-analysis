import { capitalize } from 'lodash'

export function getColumns(cols: string[]) {
	const columns = cols.map((col) => {
		if (col === 's') col = 'symbol'
		if (col === 'n') col = 'name'

		return {
			Header: capitalize(col),
			accessor: col
		}
	})

	return columns
}
