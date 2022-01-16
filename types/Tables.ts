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

export type FormatFunction =
	| 'linkSymbol'
	| 'format2dec'
	| 'integer'
	| 'formatPercentage'
	| 'colorPercentage'
	| 'abbreviate'
	| 'formatDate'
	| 'string'

/**
 * Timestamps for a stock table
 * last: the last date that the market was open
 * premarket: the last premarket date
 */
export type TableTimestamp = {
	last: string
	premarket: string
}
