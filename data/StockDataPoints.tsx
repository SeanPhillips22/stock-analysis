import { DataId } from 'types/DataId'
import { FormatFunction, IndexType } from 'types/Tables'
import {
	number,
	dateSort
} from 'components/StockScreener/functions/sort/sortFunctions'

type SymbolType = 'stocks' | 'ipo' | 'etf'

export type DataPointType = {
	id: DataId
	name: string
	colName?: string
	format?: FormatFunction
	only?: SymbolType
	sort?: any
}

type Props = {
	[key in DataId]: DataPointType
}

// Get a list of data point IDs to use for a table
export function getDataPointsArray(type: IndexType, exclude?: DataId[]) {
	// get all the matching IDs from the DataPoints array of objects
	let ids = Object.values(DataPoints)
		.filter(f => !f.only || f.only === type)
		.map(f => f.id)

	// remove any IDs that are in the exclude array
	if (exclude) {
		ids = ids.filter(id => !exclude.includes(id))
	}

	// return the IDs
	return ids
}

/**
 * Stock Columns: all the data points available for a stock
 */
export const DataPoints: Props = {
	s: { id: 's', name: 'Symbol', format: 'linkSymbol' },
	n: { id: 'n', name: 'Company Name', format: 'string' },
	marketCap: { id: 'marketCap', name: 'Market Cap', format: 'abbreviate' },
	price: {
		id: 'price',
		name: 'Stock Price',
		colName: 'Price',
		format: 'format2dec'
	},
	chg: {
		id: 'chg',
		name: 'Price Change',
		colName: 'Change ($)',
		format: 'format2dec'
	},
	change: {
		id: 'change',
		name: 'Price Change 1D',
		colName: '% Change',
		format: 'colorPercentage',
		sort: number
	},
	volume: { id: 'volume', name: 'Volume', format: 'integer' },
	close: {
		id: 'close',
		name: 'Previous Close',
		colName: 'Close',
		format: 'format2dec'
	},
	premarketPrice: {
		id: 'premarketPrice',
		name: 'Premarket Price',
		colName: 'Price',
		format: 'format2dec'
	},
	premarketChange: {
		id: 'premarketChange',
		name: 'Premarket Change',
		colName: 'Change',
		format: 'format2dec'
	},
	premarketChangePercent: {
		id: 'premarketChangePercent',
		name: 'Premarket % Change',
		colName: '% Change',
		format: 'colorPercentage',
		sort: number
	},
	enterpriseValue: {
		id: 'enterpriseValue',
		name: 'Enterprise Value',
		colName: 'Ent. Value',
		format: 'abbreviate'
	},
	industry: { id: 'industry', name: 'Industry', format: 'string' },
	peRatio: { id: 'peRatio', name: 'PE Ratio', format: 'format2dec' },
	peForward: { id: 'peForward', name: 'Forward PE', format: 'format2dec' },
	exchange: { id: 'exchange', name: 'Exchange', format: 'string' },
	dividendYield: {
		id: 'dividendYield',
		name: 'Dividend Yield',
		colName: 'Div. Yield',
		format: 'formatPercentage'
	},
	sector: { id: 'sector', name: 'Sector', format: 'string' },
	ch1w: {
		id: 'ch1w',
		name: 'Price Change 1W',
		colName: 'Change 1W',
		format: 'colorPercentage'
	},
	ch1m: {
		id: 'ch1m',
		name: 'Price Change 1M',
		colName: 'Change 1M',
		format: 'colorPercentage'
	},
	ch6m: {
		id: 'ch6m',
		name: 'Price Change 6M',
		colName: 'Change 6M',
		format: 'colorPercentage'
	},
	chYTD: {
		id: 'chYTD',
		name: 'Price Change YTD',
		colName: 'Change YTD',
		format: 'colorPercentage'
	},
	ch1y: {
		id: 'ch1y',
		name: 'Price Change 1Y',
		colName: 'Change 1Y',
		format: 'colorPercentage'
	},
	ch3y: {
		id: 'ch3y',
		name: 'Price Change 3Y',
		colName: 'Change 3Y',
		format: 'colorPercentage'
	},
	ch5y: {
		id: 'ch5y',
		name: 'Price Change 5Y',
		colName: 'Change 5Y',
		format: 'colorPercentage'
	},
	analystRatings: {
		id: 'analystRatings',
		name: 'Analyst Rating',
		format: 'string'
	},
	analystCount: {
		id: 'analystCount',
		name: 'Analyst Count',
		format: 'integer'
	},
	priceTarget: {
		id: 'priceTarget',
		name: 'Price Target',
		format: 'format2dec'
	},
	priceTargetChange: {
		id: 'priceTargetChange',
		name: 'Price Target Diff. (%)',
		colName: 'PT Diff. (%)',
		format: 'colorPercentage'
	},
	country: { id: 'country', name: 'Country', format: 'string' },
	employees: { id: 'employees', name: 'Employees', format: 'integer' },
	founded: { id: 'founded', name: 'Founded', format: 'string' },
	/* IPO INFO */
	ipoDate: {
		id: 'ipoDate',
		name: 'IPO Date',
		format: 'formatDate',
		sort: dateSort
	},
	ipp: {
		id: 'ipp',
		name: 'IPO Price',
		format: 'price'
	},
	ippc: {
		id: 'ippc',
		name: 'Current Price',
		colName: 'Current',
		format: 'price'
	},
	ipr: {
		id: 'ipr',
		colName: 'Return',
		name: 'Return Since IPO',
		format: 'colorPercentage'
	},
	sharesOffered: {
		id: 'sharesOffered',
		name: 'Shares Offered',
		format: 'integer'
	},
	revenue: { id: 'revenue', name: 'Revenue', format: 'abbreviate' },
	revenueGrowth: {
		id: 'revenueGrowth',
		name: 'Revenue Growth',
		colName: 'Rev. Growth',
		format: 'formatPercentage'
	},
	revenueGrowthQ: {
		id: 'revenueGrowthQ',
		name: 'Revenue Growth (Q)',
		colName: 'Rev. Growth (Q)',
		format: 'formatPercentage'
	},
	grossProfit: {
		id: 'grossProfit',
		name: 'Gross Profit',
		format: 'abbreviate'
	},
	grossProfitGrowth: {
		id: 'grossProfitGrowth',
		name: 'Gross Profit Growth',
		colName: 'GP Growth',
		format: 'formatPercentage'
	},
	operatingIncome: {
		id: 'operatingIncome',
		name: 'Op. Income',
		format: 'abbreviate'
	},
	operatingIncomeGrowth: {
		id: 'operatingIncomeGrowth',
		name: 'Op. Income Growth',
		colName: 'OpInc. Growth',
		format: 'formatPercentage'
	},
	netIncome: { id: 'netIncome', name: 'Net Income', format: 'abbreviate' },
	netIncomeGrowth: {
		id: 'netIncomeGrowth',
		name: 'NetInc. Growth',
		format: 'formatPercentage'
	},
	eps: { id: 'eps', name: 'EPS', format: 'format2dec' },
	epsGrowth: {
		id: 'epsGrowth',
		name: 'EPS Growth',
		format: 'formatPercentage'
	},
	ebit: { id: 'ebit', name: 'EBIT', format: 'abbreviate' },
	ebitda: { id: 'ebitda', name: 'EBITDA', format: 'abbreviate' },
	operatingCF: {
		id: 'operatingCF',
		name: 'Op. Cash Flow',
		colName: 'Operating CF',
		format: 'abbreviate'
	},
	investingCF: {
		id: 'investingCF',
		name: 'Investing Cash Flow',
		colName: 'Investing CF',
		format: 'abbreviate'
	},
	financingCF: {
		id: 'financingCF',
		name: 'Financing Cash Flow',
		colName: 'Financing CF',
		format: 'abbreviate'
	},
	netCF: {
		id: 'netCF',
		name: 'Net Cash Flow',
		colName: 'Net CF',
		format: 'abbreviate'
	},
	capex: {
		id: 'capex',
		name: 'Capital expenditures',
		colName: 'CapEx',
		format: 'abbreviate'
	},
	fcf: {
		id: 'fcf',
		name: 'Free Cash Flow',
		colName: 'FCF',
		format: 'abbreviate'
	},
	fcfGrowth: {
		id: 'fcfGrowth',
		name: 'FCF Growth',
		format: 'formatPercentage'
	},
	fcfPerShare: {
		id: 'fcfPerShare',
		name: 'FCF / Share',
		format: 'format2dec'
	},
	assets: { id: 'assets', name: 'Assets', format: 'abbreviate' },
	cash: { id: 'cash', name: 'Total Cash', format: 'abbreviate' },
	debt: { id: 'debt', name: 'Total Debt', format: 'abbreviate' },
	netCash: { id: 'netCash', name: 'Net Cash / Debt', format: 'abbreviate' },
	netCashGrowth: {
		id: 'netCashGrowth',
		name: 'Net Cash Growth',
		format: 'formatPercentage'
	},
	netCashByMarketCap: {
		id: 'netCashByMarketCap',
		name: 'Net Cash / Market Cap',
		colName: 'Cash / M.Cap',
		format: 'formatPercentage'
	},
	grossMargin: {
		id: 'grossMargin',
		name: 'Gross Margin',
		format: 'formatPercentage'
	},
	operatingMargin: {
		id: 'operatingMargin',
		name: 'Operating Margin',
		colName: 'Oper. Margin',
		format: 'formatPercentage'
	},
	profitMargin: {
		id: 'profitMargin',
		name: 'Profit Margin',
		format: 'formatPercentage'
	},
	fcfMargin: {
		id: 'fcfMargin',
		name: 'FCF Margin',
		format: 'formatPercentage'
	},
	ebitdaMargin: {
		id: 'ebitdaMargin',
		name: 'EBITDA Margin',
		format: 'formatPercentage'
	},
	ebitMargin: {
		id: 'ebitMargin',
		name: 'EBIT Margin',
		format: 'formatPercentage'
	},
	psRatio: { id: 'psRatio', name: 'PS Ratio', format: 'format2dec' },
	pbRatio: { id: 'pbRatio', name: 'PB Ratio', format: 'format2dec' },
	pFcfRatio: { id: 'pFcfRatio', name: 'P/FCF Ratio', format: 'format2dec' },
	pegRatio: { id: 'pegRatio', name: 'PEG Ratio', format: 'format2dec' },
	evSales: { id: 'evSales', name: 'EV/Sales', format: 'format2dec' },
	evEarnings: { id: 'evEarnings', name: 'EV/Earnings', format: 'format2dec' },
	evEbitda: { id: 'evEbitda', name: 'EV/EBITDA', format: 'format2dec' },
	evEbit: { id: 'evEbit', name: 'EV/EBIT', format: 'format2dec' },
	evFcf: { id: 'evFcf', name: 'EV/FCF', format: 'format2dec' },
	earningsYield: {
		id: 'earningsYield',
		name: 'Earnings Yield',
		format: 'formatPercentage'
	},
	fcfYield: { id: 'fcfYield', name: 'FCF Yield', format: 'formatPercentage' },
	dps: { id: 'dps', name: 'Dividend ($)', format: 'format2dec' },
	dividendGrowth: {
		id: 'dividendGrowth',
		name: 'Dividend Growth',
		colName: 'Div. Growth',
		format: 'formatPercentage'
	},
	payoutRatio: {
		id: 'payoutRatio',
		name: 'Payout Ratio',
		format: 'formatPercentage'
	},
	payoutFrequency: {
		id: 'payoutFrequency',
		name: 'Payout Frequency',
		colName: 'Payout Freq.',
		format: 'string'
	},
	buybackYield: {
		id: 'buybackYield',
		name: 'Buyback Yield',
		format: 'formatPercentage'
	},
	totalReturn: {
		id: 'totalReturn',
		name: 'Total Return',
		format: 'formatPercentage'
	},
	averageVolume: {
		id: 'averageVolume',
		name: 'Average Volume',
		colName: 'Avg. Volume',
		format: 'integer'
	},
	beta: { id: 'beta', name: 'Beta (1Y)', format: 'format2dec' },
	shortFloat: {
		id: 'shortFloat',
		name: 'Short % Float',
		format: 'formatPercentage'
	},
	shortShares: {
		id: 'shortShares',
		name: 'Short % Shares',
		format: 'formatPercentage'
	},
	shortRatio: { id: 'shortRatio', name: 'Short Ratio', format: 'format2dec' },
	sharesOut: { id: 'sharesOut', name: 'Shares Out', format: 'abbreviate' },
	float: { id: 'float', name: 'Float', format: 'abbreviate' },
	sharesYoY: {
		id: 'sharesYoY',
		name: 'Shares Ch. (YoY)',
		format: 'formatPercentage'
	},
	sharesQoQ: {
		id: 'sharesQoQ',
		name: 'Shares Ch. (QoQ)',
		format: 'formatPercentage'
	},
	sharesInsiders: {
		id: 'sharesInsiders',
		name: 'Shares Insiders',
		format: 'formatPercentage'
	},
	sharesInstitutions: {
		id: 'sharesInstitutions',
		name: 'Shares Institut.',
		format: 'formatPercentage'
	},
	earningsDate: {
		id: 'earningsDate',
		name: 'Earnings Date',
		format: 'formatDate'
	},
	exDivDate: { id: 'exDivDate', name: 'Ex-Div Date', format: 'formatDate' },
	nextDivDate: {
		id: 'nextDivDate',
		name: 'Next Ex-Div',
		format: 'formatDate'
	},
	roe: {
		id: 'roe',
		name: 'Return on Equity',
		colName: 'ROE',
		format: 'formatPercentage'
	},
	roa: {
		id: 'roa',
		name: 'Return on Assets',
		colName: 'ROA',
		format: 'formatPercentage'
	},
	roic: {
		id: 'roic',
		name: 'Return on Capital',
		colName: 'ROIC',
		format: 'formatPercentage'
	},
	revPerEmployee: {
		id: 'revPerEmployee',
		name: 'Rev / Employee',
		format: 'abbreviate'
	},
	profitPerEmployee: {
		id: 'profitPerEmployee',
		name: 'Prof. / Employee',
		format: 'abbreviate'
	},
	assetTurnover: {
		id: 'assetTurnover',
		name: 'Asset Turnover',
		format: 'format2dec'
	},
	inventoryTurnover: {
		id: 'inventoryTurnover',
		name: 'Inv. Turnover',
		format: 'format2dec'
	},
	currentRatio: {
		id: 'currentRatio',
		name: 'Current Ratio',
		format: 'format2dec'
	},
	quickRatio: { id: 'quickRatio', name: 'Quick Ratio', format: 'format2dec' },
	debtEquity: {
		id: 'debtEquity',
		name: 'Debt / Equity',
		format: 'format2dec'
	},
	debtEbitda: {
		id: 'debtEbitda',
		name: 'Debt / EBITDA',
		format: 'format2dec'
	},
	debtFcf: { id: 'debtFcf', name: 'Debt / FCF', format: 'format2dec' },
	taxRate: {
		id: 'taxRate',
		name: 'Eff. Tax Rate',
		format: 'formatPercentage'
	},
	taxByRevenue: {
		id: 'taxByRevenue',
		name: 'Tax / Revenue',
		format: 'formatPercentage'
	},
	equity: { id: 'equity', name: 'Shareh. Equity', format: 'abbreviate' },
	workingCapital: {
		id: 'workingCapital',
		name: 'Working Capital',
		format: 'abbreviate'
	},
	lastSplitType: {
		id: 'lastSplitType',
		name: 'Last Stock Split',
		format: 'string'
	},
	lastSplitDate: {
		id: 'lastSplitDate',
		name: 'Last Split Date',
		format: 'formatDate'
	},
	liabilities: {
		id: 'liabilities',
		name: 'Liabilities',
		format: 'abbreviate'
	},
	ipoPriceRange: {
		id: 'ipoPriceRange',
		name: 'IPO Price Range',
		format: 'string',
		only: 'ipo'
	},
	isSpac: { id: 'isSpac', name: 'Is SPAC' },
	aum: {
		id: 'aum',
		name: 'Assets Under Management',
		format: 'abbreviate',
		only: 'etf'
	},
	etfPeRatio: {
		id: 'etfPeRatio',
		name: 'PE Ratio',
		format: 'format2dec',
		only: 'etf'
	},
	assetClass: {
		id: 'assetClass',
		name: 'Asset Class',
		format: 'string',
		only: 'etf'
	},
	expenseRatio: {
		id: 'expenseRatio',
		name: 'Expense Ratio',
		format: 'formatPercentage',
		only: 'etf'
	},
	holdings: {
		id: 'holdings',
		name: 'Holdings',
		format: 'integer',
		only: 'etf'
	},
	inceptionDate: {
		id: 'inceptionDate',
		name: 'Inception Date',
		format: 'formatDate',
		only: 'etf'
	},
	etfSector: {
		id: 'etfSector',
		name: 'Sector',
		format: 'string',
		only: 'etf'
	},
	etfRegion: {
		id: 'etfRegion',
		name: 'Region',
		format: 'string',
		only: 'etf'
	},
	issuer: { id: 'issuer', name: 'Issuer', format: 'string', only: 'etf' },
	etfIndex: { id: 'etfIndex', name: 'Index', format: 'string', only: 'etf' }
}
