import { ColumnsMap } from 'components/Screener/screener.types'

export const initialStockColumns: ColumnsMap = {
	General: ['s', 'n', 'marketCap', 'price', 'change', 'industry', 'volume', 'peRatio'],
	Filtered: ['s', 'n', 'marketCap'],
	Performance: ['s', 'n', 'marketCap', 'price', 'change', 'ch1m', 'ch6m', 'chYTD', 'ch1y', 'ch3y', 'ch5y'],
	Financials: ['s', 'n', 'marketCap', 'revenue', 'operatingIncome', 'netIncome', 'fcf', 'eps'],
	Valuation: ['s', 'n', 'marketCap', 'enterpriseValue', 'peRatio', 'peForward', 'psRatio', 'pbRatio', 'pFcfRatio'],
	Dividends: ['s', 'n', 'marketCap', 'dps', 'dividendYield', 'payoutRatio', 'dividendGrowth', 'payoutFrequency'],
	Analysts: ['s', 'n', 'marketCap', 'analystRatings', 'analystCount', 'price', 'priceTarget', 'priceTargetChange']
}

export const initialIpoColumns: ColumnsMap = {
	General: ['s', 'n', 'marketCap', 'industry', 'ipoPriceRange', 'ipoDate', 'revenue'],
	Filtered: ['s', 'n', 'marketCap'],
	Company: ['s', 'n', 'marketCap', 'sector', 'industry', 'country', 'exchange', 'employees', 'founded'],
	Income: ['s', 'n', 'marketCap', 'revenue', 'grossProfit', 'operatingIncome', 'netIncome', 'eps', 'ebit', 'ebitda'],
	'Balance Sheet': ['s', 'n', 'marketCap', 'cash', 'assets', 'debt', 'liabilities', 'equity'],
	'Cash Flow': ['s', 'n', 'marketCap', 'operatingCF', 'investingCF', 'financingCF', 'netCF', 'capex', 'fcf']
}

export const initialEtfColumns: ColumnsMap = {
	General: ['s', 'n', 'assetClass', 'aum', 'price', 'change', 'volume', 'holdings'],
	Filtered: ['s', 'n', 'aum'],
	Performance: ['s', 'n', 'aum', 'price', 'change', 'ch1m', 'ch6m', 'chYTD', 'ch1y', 'ch3y', 'ch5y'],
	Dividends: ['s', 'n', 'aum', 'dps', 'dividendYield', 'dividendGrowth', 'payoutRatio', 'exDivDate', 'payoutFrequency']
}
