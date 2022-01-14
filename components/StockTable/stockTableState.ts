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
}

export const stockTableState = create<StockTableState>(set => ({
	// The symbol type
	type: 'stocks',
	setType: (newType: SymbolTypes) => set({ type: newType }),

	// The main column to sort by
	main: 'change',
	setMain: (newMain: DataId) => set({ main: newMain }),

	// The number of symbols to show
	count: 20,
	setCount: (newCount: number) => set({ count: newCount }),

	// The sort order
	sort: 'desc',
	setSort: (newSort: SortTypes) => set({ sort: newSort }),

	// The columns to show
	columns: [],
	setColumns: (newcols: DataId[]) => set({ columns: newcols }),
	addColumn: (newcol: DataId) =>
		set(state => {
			if (!state.columns.includes(newcol)) {
				return {
					...state,
					columns: [...state.columns, newcol]
				}
			} else {
				return state
			}
		}),

	removeColumn: (col: DataId) =>
		set(state => ({
			...state,
			columns: state.columns.filter(c => c !== col)
		})),
	toggleColumn: (col: DataId) =>
		set(state => ({
			...state,
			columns: state.columns.includes(col)
				? state.columns.filter(c => c !== col)
				: [...state.columns, col]
		})),

	// Reset the table state when switching to another page
	resetTableState: (conf: SelectConfig) =>
		set(state => ({
			...state,
			type: conf.type,
			main: conf.main,
			count: conf.count,
			sort: conf.sort,
			columns: conf.columns
		}))
}))
