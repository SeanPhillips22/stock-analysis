import { DataId } from 'types/Data'
import { SelectConfig, SymbolTypes, SortTypes } from 'types/SelectConfig'
import create from 'zustand'

interface StockTableState extends SelectConfig {
	setType: (newType: SymbolTypes) => void
	setMain: (newMain: DataId) => void
	setCount: (newCount: number) => void
	setSort: (newSort: SortTypes) => void
	setColumns: (newcols: DataId[]) => void
	resetTableState: (conf: SelectConfig) => void
	addColumn: (id: DataId) => void
	removeColumn: (id: DataId) => void
	toggleColumn: (id: DataId) => void
	fetch: boolean
	setFetch: () => void
}

export const stockTableState = create<StockTableState>(set => ({
	// The symbol type
	type: 'stocks',
	setType: (newType: SymbolTypes) =>
		set(state => ({ ...state, type: newType, fetch: true })),

	// The main column to sort by
	main: 'change',
	setMain: (newMain: DataId) =>
		set(state => ({ ...state, main: newMain, fetch: true })),

	// The number of symbols to show
	count: 20,
	setCount: (newCount: number) =>
		set(state => ({ ...state, count: newCount, fetch: true })),

	// The sort order
	sort: 'desc',
	setSort: (newSort: SortTypes) =>
		set(state => ({ ...state, sort: newSort, fetch: true })),

	// The columns to show
	columns: [],
	setColumns: (newcols: DataId[]) =>
		set(state => ({ ...state, columns: newcols, fetch: true })),
	addColumn: (newcol: DataId) =>
		set(state => {
			if (!state.columns.includes(newcol)) {
				return {
					...state,
					columns: [...state.columns, newcol],
					fetch: true
				}
			} else {
				return state
			}
		}),

	removeColumn: (col: DataId) =>
		set(state => ({
			...state,
			columns: state.columns.filter(c => c !== col),
			fetch: true
		})),
	toggleColumn: (col: DataId) =>
		set(state => ({
			...state,
			columns: state.columns.includes(col)
				? state.columns.filter(c => c !== col)
				: [...state.columns, col],
			fetch: true
		})),

	// The columns that can be selected
	columnOptions: [],

	// The filters to apply
	filters: [],

	// Reset the table state when switching to another page
	resetTableState: (conf: SelectConfig) =>
		set(state => ({
			...state,
			type: conf.type,
			main: conf.main,
			count: conf.count,
			sort: conf.sort,
			columns: conf.columns,
			columnOptions: conf.columnOptions,
			filters: conf.filters,
			fetch: false
		})),

	// Enable react-query data fetching
	fetch: false,
	setFetch: () => set({ fetch: true })
}))
