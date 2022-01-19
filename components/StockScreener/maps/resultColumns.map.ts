import { DataId } from 'types/DataId'
import {
	ColumnName,
	ColumnsMap,
	ScreenerTypes
} from 'components/StockScreener/screener.types'

export const defaultColumnsStocks: DataId[] = [
	's',
	'n',
	'marketCap',
	'price',
	'change',
	'industry',
	'volume',
	'peRatio'
]
export const defaultColumnsIPOs: DataId[] = [
	's',
	'n',
	'marketCap',
	'industry',
	'ipoPriceRange',
	'ipoDate',
	'revenue'
]
export const defaultColumnsETFs: DataId[] = [
	's',
	'n',
	'assetClass',
	'aum',
	'price',
	'change',
	'volume',
	'holdings'
]

const resultColumnsStocks: ColumnsMap = {
	General: defaultColumnsStocks,
	Filtered: ['s', 'n', 'marketCap'],
	Performance: [
		's',
		'n',
		'marketCap',
		'price',
		'change',
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
		'marketCap',
		'revenue',
		'operatingIncome',
		'netIncome',
		'fcf',
		'eps'
	],
	Valuation: [
		's',
		'n',
		'marketCap',
		'enterpriseValue',
		'peRatio',
		'peForward',
		'psRatio',
		'pbRatio',
		'pFcfRatio'
	],
	Dividends: [
		's',
		'n',
		'marketCap',
		'dps',
		'dividendYield',
		'payoutRatio',
		'dividendGrowth',
		'payoutFrequency'
	],
	Analysts: [
		's',
		'n',
		'marketCap',
		'analystRatings',
		'analystCount',
		'price',
		'priceTarget',
		'priceTargetChange'
	]
}

const resultColumnsIPOs: ColumnsMap = {
	General: defaultColumnsIPOs,
	Filtered: ['s', 'n', 'marketCap'],
	Company: [
		's',
		'n',
		'marketCap',
		'sector',
		'industry',
		'country',
		'exchange',
		'employees',
		'founded'
	],
	Income: [
		's',
		'n',
		'marketCap',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda'
	],
	'Balance Sheet': [
		's',
		'n',
		'marketCap',
		'cash',
		'assets',
		'debt',
		'liabilities',
		'equity'
	],
	'Cash Flow': [
		's',
		'n',
		'marketCap',
		'operatingCF',
		'investingCF',
		'financingCF',
		'netCF',
		'capex',
		'fcf'
	]
}

const resultColumnsETFs: ColumnsMap = {
	General: defaultColumnsETFs,
	Filtered: ['s', 'n', 'aum'],
	Performance: [
		's',
		'n',
		'aum',
		'price',
		'change',
		'ch1m',
		'ch6m',
		'chYTD',
		'ch1y',
		'ch3y',
		'ch5y'
	],
	Dividends: [
		's',
		'n',
		'aum',
		'dps',
		'dividendYield',
		'dividendGrowth',
		'payoutRatio',
		'exDivDate',
		'payoutFrequency'
	]
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

export function returnDefaultColumns(type: ScreenerTypes) {
	if (type === 'stocks') {
		return defaultColumnsStocks
	} else if (type === 'ipo') {
		return defaultColumnsIPOs
	} else if (type === 'etf') {
		return defaultColumnsETFs
	}
	return defaultColumnsStocks
}

export function returnFilteredColumns(type: ScreenerTypes): DataId[] {
	if (type === 'stocks') {
		return ['s', 'n', 'marketCap']
	} else if (type === 'ipo') {
		return ['s', 'n', 'marketCap']
	} else if (type === 'etf') {
		return ['s', 'n', 'aum']
	}
	return ['s', 'n', 'marketCap']
}
