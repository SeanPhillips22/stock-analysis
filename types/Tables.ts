export type CellString = {
	cell: {
		value: string
	}
}

export type CellNumber = {
	cell: {
		value: number
	}
}

// Names of functions that format table cells
export type FormatFunction =
	| 'linkSymbol'
	| 'linkName'
	| 'format2dec'
	| 'integer'
	| 'formatPercentage'
	| 'colorPercentage'
	| 'abbreviate'
	| 'formatDate'
	| 'string'

// Names of functions that perform sorting of table rows
export type SortFunction =
	| 'dateSort'
	| 'priceSort'
	| 'stringNullFix'
	| 'numberNullFix'

/**
 * Timestamps for a stock table
 * last: the last date that the market was open
 * premarket: the last premarket date
 */
export type TableTimestamp = {
	last: string
	premarket: string
}
