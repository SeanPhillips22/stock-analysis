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

// The type of index to select for the stock table
// The narrower/smaller, the better the performance
export type IndexType = 'stocks' | 'etf' | 'histip'

// Names of functions that format table cells
export type FormatFunction =
	| 'linkSymbol'
	| 'linkName'
	| 'format2dec'
	| 'price'
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
