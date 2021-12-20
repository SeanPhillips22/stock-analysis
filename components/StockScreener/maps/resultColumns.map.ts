import { ColumnName, ColumnsMap } from 'components/StockScreener/screener.types'

const resultColumnsStocks: ColumnsMap = {
	General: ['s', 'n', 'm', 'i', 'p', 'c', 'v', 'pe'],
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
	General: ['s', 'n', 'm', 'i', 'p', 'c', 'v', 'pe'],
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
	General: ['s', 'n', 'assetClass', 'assets', 'p', 'c', 'v', 'holdings'],
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
	Dividends: ['s', 'n', 'etfExDividendDate', 'etfDividendYield']
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
