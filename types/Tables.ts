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
