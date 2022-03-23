import { ScreenerState } from 'components/Screener/screener.types'
import { initialStockColumns } from '../columns'

export const INITIAL_STOCK_SCREENER_STATE: ScreenerState = {
	resultsMenu: 'General',
	filtersMenu: 'Active',
	filtersShowing: true,
	activePreset: '',
	columns: {
		all: initialStockColumns,
		filtered: initialStockColumns.Filtered,
		default: initialStockColumns.General
	},
	filters: [],
	sort: {
		active: [{ id: 'marketCap', desc: false }],
		default: [{ id: 'marketCap', desc: false }]
	}
}
