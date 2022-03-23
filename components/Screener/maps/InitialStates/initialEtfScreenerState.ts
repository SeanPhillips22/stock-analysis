import { ScreenerState } from 'components/Screener/screener.types'
import { initialEtfColumns } from '../columns'

export const INITIAL_ETF_SCREENER_STATE: ScreenerState = {
	resultsMenu: 'General',
	filtersMenu: 'Active',
	filtersShowing: true,
	activePreset: '',
	columns: {
		all: initialEtfColumns,
		filtered: initialEtfColumns.Filtered,
		default: initialEtfColumns.General
	},
	filters: [],
	sort: {
		active: [{ id: 'aum', desc: false }],
		default: [{ id: 'aum', desc: false }]
	}
}
