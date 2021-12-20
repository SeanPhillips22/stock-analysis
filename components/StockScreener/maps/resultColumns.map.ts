import {
	ColumnName,
	ColumnsMap,
	FilterId
} from 'components/StockScreener/screener.types'

export const defaultColumnsStocks: FilterId[] = [
	's',
	'n',
	'm',
	'p',
	'c',
	'i',
	'v',
	'pe'
]
export const defaultColumnsIPOs: FilterId[] = [
	's',
	'n',
	'm',
	'i',
	'ipoPriceRange',
	'ipoDate',
	'revenue'
]
export const defaultColumnsETFs: FilterId[] = [
	's',
	'n',
	'assetClass',
	'assets',
	'p',
	'c',
	'v',
	'holdings'
]

const resultColumnsStocks: ColumnsMap = {
	General: defaultColumnsStocks,
	Filtered: [],
	Company: [],
	Performance: [
		's',
		'n',
		'm',
		'p',
		'c',
		'ch1m',
		'ch6m',
		'chYTD',
		'ch1y',
		'ch3y',
		'ch5y'
	],
	Financials: [
		's',
		'n',
		'm',
		'revenue',
		'operatingIncome',
		'netIncome',
		'fcf',
		'eps'
	],
	Valuation: ['s', 'n', 'm', 'ev', 'pe', 'fpe', 'ps', 'pb', 'pfcf'],
	Dividends: ['s', 'n', 'm', 'dps', 'dy', 'pr', 'dg'],
	Analysts: ['s', 'n', 'm', 'ar', 'ac', 'p', 'pt', 'ptc'],
	Income: [
		's',
		'n',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda'
	],
	'Balance Sheet': ['s', 'n', 'cash', 'liabilities', 'debt', 'equity'],
	'Cash Flow': ['s', 'n', 'ocf', 'icf', 'cff', 'ncf', 'capex', 'fcf', 'fcfps']
}

const resultColumnsIPOs: ColumnsMap = {
	General: defaultColumnsIPOs,
	Filtered: [],
	Company: [
		's',
		'n',
		'se',
		'i',
		'country',
		'exchange',
		'employees',
		'founded'
	],
	Income: [
		's',
		'n',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda'
	],
	'Balance Sheet': ['s', 'n', 'cash', 'liabilities', 'debt', 'equity'],
	'Cash Flow': ['s', 'n', 'ocf', 'icf', 'cff', 'ncf', 'capex', 'fcf', 'fcfps']
}

const resultColumnsETFs: ColumnsMap = {
	General: defaultColumnsETFs,
	Filtered: [],
	Performance: [
		's',
		'n',
		'p',
		'c',
		'ch1m',
		'ch6m',
		'chYTD',
		'ch1y',
		'ch3y',
		'ch5y'
	],
	Dividends: ['s', 'n', 'exDivDate', 'dy']
}

export function returnResultColumns(type: string, name: ColumnName) {
	if (type == 'stocks') {
		return resultColumnsStocks[name]
	} else if (type === 'ipo') {
		return resultColumnsIPOs[name]
	} else if (type === 'etf') {
		return resultColumnsETFs[name]
	}
	return resultColumnsStocks[name]
}
