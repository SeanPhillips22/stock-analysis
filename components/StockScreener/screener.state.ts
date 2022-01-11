import create from 'zustand'
import { DataId } from 'types/Data'
import {
	ScreenerTypes,
	SingleStock,
	SingleDataPoint,
	FilterValue,
	VariableFilter,
	FilterOption,
	SortObject,
	ColumnName
} from 'components/StockScreener/screener.types'
import { PresetFilter } from './maps/presetFilters.map'
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns'
import {
	returnDefaultColumns,
	returnFilteredColumns,
	returnResultColumns
} from 'components/StockScreener/maps/resultColumns.map'

interface ScreenerState {
	// Type
	type: ScreenerTypes | ''
	setType: (type: ScreenerTypes) => void

	// Data
	data: SingleStock[]
	setData: (data: SingleStock[]) => void
	addDataColumn: (newColumn: SingleDataPoint[], id: DataId) => void
	fullCount: number
	setFullCount: (fullCount: number) => void

	// Loading
	loaded: boolean
	setLoaded: (loaded: boolean) => void
	fetching: DataId[]
	addFetching: (newFetching: DataId) => void
	removeFetching: (newFetching: DataId) => void

	// Filters
	filters: FilterValue[]
	addFilter: (newFilter: FilterValue) => void
	removeFilter: (filter: DataId) => void
	clearFilters: () => void
	filtersShown: boolean
	setFiltersShown: (filtersShown: boolean) => void

	// Filter menu
	filterMenu: string
	setFilterMenu: (newMenu: string) => void
	openFilter: DataId | ''
	setOpenFilter: (newFilter: DataId | '') => void
	filterSearch: string
	setFilterSearch: (newSearch: string) => void

	// Results
	resultsMenu: ColumnName
	setResultsMenu: (newMenu: ColumnName) => void
	resultsCount: number
	setResultsCount: (newCount: number) => void

	// Variable filters
	variableFilters: VariableFilter[]
	addVariableFilter: (options: FilterOption[], id: DataId) => void
	clearVarFilters: () => void

	// Columns
	fetchedColumns: DataId[]
	showColumns: DataId[]
	filteredColumns: DataId[]
	addFetchedColumn: (newColumn: DataId) => void
	setFetchedColumns: (newArray: DataId[]) => void
	addFilteredColumn: (newColumn: DataId) => void
	removeFilteredColumn: (columns: DataId) => void
	setShowColumns: (newColumns: DataId[]) => void
	columnDropdownOpen: boolean
	setColumnDropdownOpen: (open: boolean) => void

	// Sort
	sort: SortObject[]
	setSort: (newSort: SortObject[]) => void
	resetSort: boolean
	setResetSort: (reset: boolean) => void

	// Pagination
	tablePage: number
	setTablePage: (newTablePage: number) => void
	tableSize: number
	setTableSize: (tableSize: number) => void

	// Preset filters
	presets: PresetFilter[]
	setPresets: (presets: PresetFilter[]) => void
	activePreset: string
	setActivePreset: (preset: string) => void
}

export const screenerState = create<ScreenerState>((set) => ({
	// Type
	type: '',
	setType: (newType: ScreenerTypes) => set({ type: newType }),

	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: DataId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id)
		})),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),

	// Loading
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
	fetching: [],
	addFetching: (newFetching: DataId) =>
		set((state) => ({
			...state,
			fetching: [...state.fetching, newFetching]
		})),
	removeFetching: (newFetching: DataId) =>
		set((state) => ({
			...state,
			fetching: state.fetching.filter((fetching) => fetching !== newFetching)
		})),

	// Filters
	filters: [],
	addFilter: (newFilter: FilterValue) =>
		set((state) => ({
			...state,
			filters: [...state.filters, newFilter]
		})),
	removeFilter: (filter: string) =>
		set((state) => ({
			...state,
			filters: state.filters.filter((f) => f.id !== filter)
		})),
	clearFilters: () =>
		set((state) => ({
			filters: [],
			filterMenu: 'Active',
			filteredColumns: returnFilteredColumns(state.type),
			activePreset: '',
			resetSort: true,
			sort: [
				{ id: 'marketCap', desc: false },
				{ id: 'aum', desc: false }
			]
		})),
	filtersShown: true,
	setFiltersShown: (show: boolean) => set({ filtersShown: show }),

	// Filter Menu
	filterMenu: 'Active',
	setFilterMenu: (newMenu: string) =>
		set({ filterMenu: newMenu, filterSearch: '', filtersShown: true }),
	openFilter: '', // The filter menu that is open
	setOpenFilter: (newFilter: DataId | '') => set({ openFilter: newFilter }),
	filterSearch: '',
	setFilterSearch: (newSearch: string) =>
		set({
			filterSearch: newSearch,
			filtersShown: true,
			filterMenu: 'Active'
		}),

	// Variable filters
	variableFilters: [],
	addVariableFilter: (options: FilterOption[], id: DataId) =>
		set((state) => ({
			variableFilters: [...state.variableFilters, { id, options }]
		})),
	clearVarFilters: () => set({ variableFilters: [] }),

	// Results Menu
	resultsMenu: 'General',
	setResultsMenu: (newMenu: ColumnName) =>
		set((state) => ({
			resultsMenu: newMenu,
			showColumns:
				newMenu === 'Filtered'
					? state.filteredColumns
					: newMenu === 'General'
					? returnDefaultColumns(state.type)
					: returnResultColumns(state.type, newMenu)
		})),
	resultsCount: 0,
	setResultsCount: (newCount: number) => set({ resultsCount: newCount }),

	// Columns
	fetchedColumns: [], // All data columns that have been fetched
	showColumns: [], // Columns that are currently showing
	filteredColumns: ['s', 'n'], // All data columns that are being filtered
	addFetchedColumn: (newColumn: DataId) =>
		set((state) => ({
			fetchedColumns: [...state.fetchedColumns, newColumn]
		})),
	setFetchedColumns: (newArray: DataId[]) => set({ fetchedColumns: newArray }),
	addFilteredColumn: (newColumn: DataId) =>
		set((state) => ({
			filteredColumns: [...state.filteredColumns, newColumn]
		})),
	removeFilteredColumn: (column: DataId) =>
		set((state) => ({
			filteredColumns: state.filteredColumns.filter((c) => c !== column)
		})),
	setShowColumns: (newColumns: DataId[]) =>
		set((state) => ({ ...state, showColumns: newColumns })),
	columnDropdownOpen: false,
	setColumnDropdownOpen: (open: boolean) => set({ columnDropdownOpen: open }),

	// Sort
	sort: [
		{ id: 'marketCap', desc: false },
		{ id: 'aum', desc: false }
	],
	setSort: (newSort: SortObject[]) => set({ sort: newSort }),
	resetSort: false,
	setResetSort: (reset: boolean) =>
		set((state) => ({ ...state, resetSort: reset })),

	// Pagination
	tablePage: 0,
	setTablePage: (newTablePage) => set({ tablePage: newTablePage }),
	tableSize: 20,
	setTableSize: (newTableSize) => set({ tableSize: newTableSize }),

	// Preset filters
	presets: [],
	setPresets: (newPresets) =>
		set((state) => ({ ...state, presets: newPresets })),
	activePreset: '',
	setActivePreset: (newPreset: string) => set({ activePreset: newPreset })
}))
