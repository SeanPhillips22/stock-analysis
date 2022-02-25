import { SortObject } from 'components/Screener/screener.types'
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
	}

	columnOptions?: DataId[] // The columns available to select
	excludeColumns?: DataId[] // Columns to exclude
	columnOrder?: DataId[] // The order of the columns
}

// Dynamic data that becomes state and is used to modify the table
export type TableDynamic = {
	index: IndexTypes // The index type, more specific is faster

	main: DataId // The main column to sort by

	count?: number // The number of symbols to show -- if empty, show all

	sort?: SortObject[] // What is currently sorted by
	sortDirection: 'desc' | 'asc' // The sort order

	columns: DataId[] // The columns to show

	filters?: string[] // The filters to apply

	fetched?: boolean // Whether the original data has been fetched

	showOnMobile?: boolean // Whether to show the controls on mobile
}

// The stock index type (more specific is faster)
export type IndexTypes = 'stocks' | 'etf' | 'histip' | 'futip'
