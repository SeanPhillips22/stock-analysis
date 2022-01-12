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
	| 'formatInteger'
	| 'formatPercentage'
	| 'colorPercentage'
	| 'abbreviate'
	| 'formatDate'
