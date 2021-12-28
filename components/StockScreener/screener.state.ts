import create from 'zustand'
import {
	ScreenerTypes,
	SingleStock,
	SingleDataPoint,
	FilterId,
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

	resultsMenu: ColumnName
	setResultsMenu: (newMenu: ColumnName) => void

	// Variable filters
	variableFilters: VariableFilter[]
	addVariableFilter: (options: FilterOption[], id: FilterId) => void

	// Columns
	fetchedColumns: FilterId[]
	showColumns: FilterId[]
	filteredColumns: FilterId[]
	addFetchedColumn: (newColumn: FilterId) => void
	setFetchedColumns: (newArray: FilterId[]) => void
	addFilteredColumn: (newColumn: FilterId) => void
	removeFilteredColumn: (columns: FilterId) => void
	setShowColumns: (newColumns: FilterId[]) => void
	columnDropdownOpen: boolean
	setColumnDropdownOpen: (open: boolean) => void

	// Sort
	sort: SortObject[]
	setSort: (newSort: SortObject[]) => void

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
		set((state) => ({
			filters: [],
			filterMenu: 'Active',
			filteredColumns: returnFilteredColumns(state.type),
			activePreset: '',
			sort: [
				{ id: 'm', desc: false },
				{ id: 'assets', desc: false }
			]
		})),
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

	// Variable filters
	variableFilters: [],
	addVariableFilter: (options: FilterOption[], id: FilterId) =>
		set((state) => ({
			variableFilters: [...state.variableFilters, { id, options }]
		})),

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

	// Columns
	fetchedColumns: [], // All data columns that have been fetched
	showColumns: [], // Columns that are currently showing
	filteredColumns: ['s', 'n'], // All data columns that are being filtered
	addFetchedColumn: (newColumn: FilterId) =>
		set((state) => ({
			fetchedColumns: [...state.fetchedColumns, newColumn]
		})),
	setFetchedColumns: (newArray: FilterId[]) =>
		set({ fetchedColumns: newArray }),
	addFilteredColumn: (newColumn: FilterId) =>
		set((state) => ({
			filteredColumns: [...state.filteredColumns, newColumn]
		})),
	removeFilteredColumn: (column: FilterId) =>
		set((state) => ({
			filteredColumns: state.filteredColumns.filter((c) => c !== column)
		})),
	setShowColumns: (newColumns: FilterId[]) =>
		set((state) => ({ ...state, showColumns: newColumns })),
	columnDropdownOpen: false,
	setColumnDropdownOpen: (open: boolean) => set({ columnDropdownOpen: open }),

	// Sort
	sort: [
		{ id: 'm', desc: false },
		{ id: 'assets', desc: false }
	],
	setSort: (newSort: SortObject[]) => set({ sort: newSort }),

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
