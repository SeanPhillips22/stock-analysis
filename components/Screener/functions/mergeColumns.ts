import { DataId } from 'types/DataId'
import { SingleStock, SingleDataPoint } from 'components/Screener/screener.types'
import toast from 'react-hot-toast'

// Merge a new screener column with the existing columns
export function mergeColumns(existing: SingleStock[], newColumns: SingleDataPoint[], id: DataId): any {
	try {
		// If no id was provided, return existing columns
		if (!id) return existing

		// Else, proceed merging the columns
		const combined: any = existing.map((stock: SingleStock) => {
			const newStock = newColumns.find((newStock: SingleDataPoint) => {
				return stock ? stock.s === newStock[0] : false
			})
			if (newStock && newStock[1]) {
				return { ...stock, [id]: newStock[1] }
			} else {
				return { ...stock, [id]: null }
			}
		})

		return combined
	} catch (e) {
		console.error(e)
		toast.error('There was an error with one or more of the data columns.')
		return existing
	}
}
