import { DataId } from 'types/DataId'
export type ScreenerTypes = 'stocks' | 'ipo' | 'etf' | ''

// Dynamic State
export type ScreenerState = {
	resultsMenu: ColumnName
	filtersMenu: string
	filtersShowing: boolean
	activePreset: string
	columns: {
		all: ColumnsMap
		filtered: DataId[]
		default: DataId[]
	}
	filters: FilterValue[]
	sort: {
		active: SortObject[]
		default: SortObject[]
	}
}

export type ScreenerIDs = 'stocks-screener' | 'ipo-screener' | 'etf-screener'
export type ScreenerEndpoints = 'screener' | 'iposcreener' | 'etfscreener'

// Results columns
export type ColumnName =
	| 'Filtered'
	| 'General'
	| 'Company'
	| 'Performance'
	| 'Financials'
	| 'Valuation'
	| 'Dividends'
	| 'Analysts'
	| 'Income'
	| 'Balance Sheet'
	| 'Cash Flow'

export type ColumnsMap = {
	[key: string]: DataId[]
}

export type SingleStock = {
	[key in DataId]: string
}

export type SingleIPO = {
	[key in DataId]: string
}

export type SingleETF = {
	[key in DataId]: string
}

export type SingleDataPoint = string[]

export type FilterProps = {
	name: string
	id: DataId
	columnName?: string
	category?: string[]
	options: FilterOption[]
	filterType: FilterType
	numberType?: NumberType
	variable?: boolean
	format?:
		| 'string'
		| 'linkSymbol'
		| 'amount'
		| 'align'
		| 'abbreviate'
		| 'format0dec'
		| 'format2dec'
		| 'changePcColor'
		| 'percentage'
		| 'date'
		| 'marketcap'
		| 'padleft'
		| 'array'
	sortType?: any
	sortInverted?: string
	tooltipTitle?: any
	tooltipText?: string
	tooltipFormula?: string
}

export type FilterOption = {
	name: string
	value: string
	div?: boolean // Set true to add a divider in the dropdown
}

export type VariableFilter = {
	options: FilterOption[]
	id: DataId
}

export type FilterValue = {
	id: DataId
	name: string
	value: string
	array?: string[]
	filterType: FilterType
	numberType?: 'percentage'
}

export type FilterObject = {
	compare: ComparisonOption
	first: string
	second: string
}

export type FilterType =
	| 'numeric'
	| 'stringmatch'
	| 'multiselect'
	| 'arraymatch' // Check if the stock's value is inside array of values
	| 'date'
	| 'dateYear'
	| 'numericRange'
	| 'isSpac'
	| 'none'

export type NumberType = 'percentage'
export type ComparisonOption = 'over' | 'under' | 'between' | 'exactly' | 'notzero'

export type SortObject = {
	id: DataId | 'm' | 'a'
	desc?: boolean
}

export type SortProps = {
	defaultSort?: SortObject[]
	setSort: (sort: SortObject[]) => void
}

export type ScreenerSortProps = {
	defaultSort?: SortObject[]
	dispatch: React.Dispatch<{ type: string; value: any }>
}
