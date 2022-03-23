import { ScreenerState } from 'components/Screener/screener.types'
import { initialIpoColumns } from '../columns'

export const INITIAL_IPO_SCREENER_STATE: ScreenerState = {
	resultsMenu: 'General',
	filtersMenu: 'Active',
	filtersShowing: true,
	activePreset: '',
	columns: {
		all: initialIpoColumns,
		filtered: initialIpoColumns.Filtered,
		default: initialIpoColumns.General
	},
	filters: [],
	sort: {
		active: [{ id: 'marketCap', desc: false }],
		default: [{ id: 'marketCap', desc: false }]
	}
}
