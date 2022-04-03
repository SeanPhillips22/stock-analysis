import { FilterValue, ScreenerTypes, SortObject } from 'components/Screener/screener.types'
import { DataId } from 'types/DataId'

// Create a type that is an array of objects with keys as DataID
export type TableData = { [key in DataId]: any }[]

// The table's fixed properties
export type TableFixed = {
	defaultSort?: SortObject[] // The default sort order

	// The controls options to show
	controls?: {
		range?: boolean // Time range (1D/1W/etc)
		results?: boolean // Number of results
		filter?: boolean // Show a filter input
		export?: boolean // Export button
		columns?: boolean // Columns dropdown
		moverType?: boolean // Switch between gainers and losers
		options?: boolean // More options
	}

	pagination?: boolean // Enable pagination
	resultsCount?: number // The total number of available results
	columnOptions?: DataId[] // The columns available to select
	includeColumns?: DataId[] // Columns to include
	excludeColumns?: DataId[] // Columns to exclude
	columnOrder?: DataId[] // The order of the columns
	fixedColumns?: DataId[] // The columns that can not be removed
	screener?: {
		type: ScreenerTypes
		filters: FilterValue[]
		sort?: SortObject[]
	}

	// Fallback if no data is found
	fallback?: {
		title: string
		text: string
	}
}

// Dynamic data that becomes state and is used to modify the table
export type TableDynamic = {
	index: IndexTypes // The index type, more specific is faster

	main: DataId // The main column to sort by

	count?: number | null // The number of symbols to show -- if empty, show all

	sort?: SortObject[] // What is currently sorted by
	sortDirection: 'desc' | 'asc' // The sort order

	columns: DataId[] // The columns to show

	filters?: string[] // The filters to apply

	fetched?: boolean // Whether the original data has been fetched

	showOnMobile?: boolean // Whether to show the controls on mobile

	page?: number // pagination can get appended to the object
}

// The stock index type (more specific is faster)
export type IndexTypes = 'allstocks' | 'stocks' | 'etf' | 'histip' | 'futip'
