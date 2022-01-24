import { SortObject } from 'components/StockScreener/screener.types'
import { DataId } from 'types/DataId'

// The table's fixed properties
export type TableFixed = {
	columnOptions?: DataId[] // The columns available to select

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
}

// Dynamic data that becomes state and is used to modify the table
export type TableDynamic = {
	main: DataId // The main column to sort by

	count: number // The number of symbols to show

	sort?: SortObject[] // What is currently sorted by
	sortDirection: 'desc' | 'asc' // The sort order

	columns: DataId[] // The columns to show

	filters?: string[] // The filters to apply
}
