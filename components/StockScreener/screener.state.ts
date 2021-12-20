import create from 'zustand'
import {
	ScreenerTypes,
	SingleStock,
	SingleDataPoint,
	FilterId,
	FilterValue
} from 'components/StockScreener/screener.types'
import { PresetFilter } from './maps/presetFilters.map'
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns'

interface ScreenerState {
	// Type
	type: ScreenerTypes | ''
	setType: (type: ScreenerTypes) => void

	// Data
	data: SingleStock[]
	setData: (data: SingleStock[]) => void
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) => void
	fullCount: number
	setFullCount: (fullCount: number) => void

	// Loading
	loaded: boolean
	setLoaded: (loaded: boolean) => void

	// Filters
	filters: FilterValue[]
	addFilter: (newFilter: FilterValue) => void
	removeFilter: (filter: FilterId) => void
	clearFilters: () => void
	filtersShown: boolean
	setFiltersShown: (filtersShown: boolean) => void

	// Filter menu
	filterMenu: string
	setFilterMenu: (newMenu: string) => void
	openFilter: FilterId | ''
	setOpenFilter: (newFilter: FilterId | '') => void
	filterSearch: string
	setFilterSearch: (newSearch: string) => void

	resultsMenu: string
	setResultsMenu: (newMenu: string) => void

	// Columns
	fetchedColumns: FilterId[]
	showColumns: FilterId[]
	filteredColumns: FilterId[]
	addFetchedColumn: (newColumn: FilterId) => void
	setFetchedColumns: (newArray: any[]) => void
	addFilteredColumn: (newColumn: FilterId) => void
	removeFilteredColumn: (columns: FilterId) => void
	setShowColumns: (newColumns: FilterId[]) => void
	columnDropdownOpen: boolean
	setColumnDropdownOpen: (open: boolean) => void

	// Pagination
	tablePage: number
	setTablePage: (newTablePage: number) => void
	tableSize: number
	setTableSize: (tableSize: number) => void

	// Preset filters
	presets: PresetFilter[]
	setPresets: (presets: PresetFilter[]) => void
}

export const screenerState = create<ScreenerState>((set) => ({
	// Type
	type: '',
	setType: (newType: ScreenerTypes) => set({ type: newType }),

	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id)
		})),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),

	// Loading
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),

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
		set({
			filters: [],
			filterMenu: 'Active',
			filteredColumns: ['s', 'n', 'm']
		}),
	filtersShown: true,
	setFiltersShown: (show: boolean) =>
		set({ filtersShown: show, filterMenu: 'Active' }),

	// Filter Menu
	filterMenu: 'Active',
	setFilterMenu: (newMenu: string) =>
		set({ filterMenu: newMenu, filterSearch: '', filtersShown: true }),
	openFilter: '', // The filter menu that is open
	setOpenFilter: (newFilter: FilterId | '') => set({ openFilter: newFilter }),
	filterSearch: '',
	setFilterSearch: (newSearch: string) =>
		set({
			filterSearch: newSearch,
			filtersShown: true,
			filterMenu: 'Active'
		}),

	// Results Menu
	resultsMenu: 'General',
	setResultsMenu: (newMenu: string) => set({ resultsMenu: newMenu }),

	// Columns
	fetchedColumns: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'], // All data columns that have been fetched
	showColumns: [], // Columns that are currently showing
	filteredColumns: ['s', 'n', 'm'], // All data columns that are being filtered
	addFetchedColumn: (newColumn: any) =>
		set((state) => ({
			fetchedColumns: [...state.fetchedColumns, newColumn]
		})),
	setFetchedColumns: (newArray: any[]) => set({ fetchedColumns: newArray }),
	addFilteredColumn: (newColumn: any) =>
		set((state) => ({
			filteredColumns: [...state.filteredColumns, newColumn]
		})),
	removeFilteredColumn: (column: FilterId) =>
		set((state) => ({
			filteredColumns: state.filteredColumns.filter((c) => c !== column)
		})),
	setShowColumns: (newColumns) => set({ showColumns: newColumns }),
	columnDropdownOpen: false,
	setColumnDropdownOpen: (open: boolean) => set({ columnDropdownOpen: open }),

	// Pagination
	tablePage: 0,
	setTablePage: (newTablePage) => set({ tablePage: newTablePage }),
	tableSize: 20,
	setTableSize: (newTableSize) => set({ tableSize: newTableSize }),

	// Preset filters
	presets: [],
	setPresets: (newPresets) =>
		set((state) => ({ ...state, presets: newPresets }))
}))
