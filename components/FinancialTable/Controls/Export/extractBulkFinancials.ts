const KEYS: any = {
	datekey: 'Date',
	revenue: 'Revenue',
	cor: 'Cost of Revenue',
	gp: 'Gross Profit',
	sgna: 'Selling, General & Admin',
	rnd: 'Research & Development',
	otheropex: 'Other Operating Expenses',
	opex: 'Operating Expenses',
	opinc: 'Operating Income',
	intexp: 'Interest Expense / Income',
	otherincome: 'Other Expense / Income',
	taxexp: 'Income Tax',
	pretax: 'Pretax Income',
	netinc: 'Net Income',
	prefdivis: 'Preferred Dividends',
	netinccmn: 'Net Income Common',
	shareswa: 'Shares Outstanding (Basic)',
	shareswadil: 'Shares Outstanding Diluted (Diluted)',
	eps: 'EPS (Basic)',
	epsdil: 'EPS (Diluted)',
	fcfps: 'Free Cash Flow Per Share',
	dps: 'Dividend Per Share',
	fcf: 'Free Cash Flow',
	taxrate: 'Effective Tax Rate',
	ebitda: 'EBITDA',
	ebit: 'EBIT',
	cashneq: 'Cash & Equivalents',
	investmentsc: 'Short-TermInvestments',
	totalcash: 'Cash & Cash Equivalents',
	receivables: 'Receivables',
	inventory: 'Inventory',
	othercurrent: 'Other Current Assets',
	assetsc: 'Total Current Assets',
	ppnenet: 'Property, Plant & Equipment',
	investmentsnc: 'Long-Term Investments',
	intangibles: 'Goodwill and Intangibles',
	othernoncurrent: 'Other Long-Term Assets',
	assetsnc: 'Total Long-Term Assets',
	assets: 'Total Assets',
	payables: 'Accounts Payable',
	deferredrev: 'Deferred Revenue',
	debtc: 'Current Debt',
	otherliabilitiescurrent: 'Other Current Liabilities',
	liabilitiesc: 'Total Current Liabilities',
	debtnc: 'Long-Term Debt',
	otherliabilitiesnoncurrent: 'Other Long-Term Liabilities',
	liabilitiesnc: 'Total Long-Term Liabilities',
	liabilities: 'Total Liabilities',
	debt: 'Total Debt',
	commonstocknet: 'Common Stock',
	retearn: 'Retained Earnings',
	accoci: 'Comprehensive Income',
	equity: 'Shareholders Equity',
	liabilitiesequity: 'Total Liabilities and Equity',
	netcash: 'Net Cash / Debt',
	netcashpershare: 'Net Cash Per Share',
	workingcapital: 'Working Capital',
	bvps: 'Book Value Per Share',
	depamor: 'Depreciation & Amortization',
	sbcomp: 'Share-Based Compensation',
	otheroperating: 'Other Operating Activities',
	ncfo: 'Operating Cash Flow',
	capex: 'Capital Expenditures',
	ncfbus: 'Acquisitions',
	ncfinv: 'Change in Investments',
	otherinvesting: 'Other Investing Activities',
	ncfi: 'Investing Cash Flow',
	ncfdiv: 'Dividends Paid',
	ncfcommon: 'Share Issuance / Repurchase',
	ncfdebt: 'Debt Issued / Paid',
	otherfinancing: 'Other Financing Activities',
	ncff: 'Financing Cash Flow',
	ncf: 'Net Cash Flow',
	marketcap: 'Market Capitalization',
	ev: 'Enterprise Value',
	pe: 'PE Ratio',
	ps: 'PS Ratio',
	pb: 'PB Ratio',
	pfcf: 'P/FCF Ratio',
	pocf: 'P/OCF Ratio',
	evrevenue: 'EV/Revenue',
	evebitda: 'EV/EBITDA',
	evebit: 'EV/EBIT',
	evfcf: 'EV/FCF',
	debtequity: 'Debt/Equity',
	debtebitda: 'Debt/EBITDA',
	debtfcf: 'Debt/FCF',
	currentratio: 'Current Ratio',
	assetturnover: 'Asset Turnover',
	roe: 'Return on Equity (ROE)',
	roa: 'Return on Assets (ROA)',
	roic: 'Return on Invested Capital (ROIC)',
	earningsyield: 'Earnings Yield',
	fcfyield: 'Free Cash Flow Yield',
	dividendyield: 'Dividend Yield',
	payoutratio: 'Payout Ratio',
	buybackyield: 'Buyback Yield',
	totalreturn: 'Total Return'
}

/**
 * Rewrite the financial data to be in a format that can be exported
 * @param data the financial data from the backend API
 * @returns
 */
export function extractFinancials(data: any, statement: string, range: string) {
	let financials: any = []
	const keys = Object.keys(data)
	keys.forEach((key) => {
		if (statement === 'cash-flow-statement' && key === 'revenue') {
			// Do nothing
		} else {
			let arr = data[key]
			let parsedKey = KEYS[key] || key
			if (range === 'annual') arr.shift() // Remove TTM column
			arr.unshift(parsedKey)
			financials.push(arr)
		}
	})

	return financials
}
