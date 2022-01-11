import { DataId } from 'types/Data'
import {
	SingleStock,
	SingleDataPoint
} from 'components/StockScreener/screener.types'

// Merge a new screener column with the existing columns
export function mergeColumns(
	existing: SingleStock[],
	newColumns: SingleDataPoint[],
	id: DataId
): any {
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
}
