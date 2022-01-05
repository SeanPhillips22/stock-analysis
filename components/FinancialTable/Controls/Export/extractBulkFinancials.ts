const KEYS: any = {
	datekey: 'Date',
	revenue: 'Revenue',
	cor: 'Cost of Revenue',
	gp: 'Gross Profit',
	sgna: 'Selling, General, Administrative',
	rnd: 'R&D',
	otheropex: 'Other Operating Expenses',
	opex: 'Operating Expenses',
	opinc: 'Operating Income',
	intexp: 'Interest Expense',
	otherincome: 'Other Income',
	taxexp: 'Income Tax Expense',
	pretax: 'Pre-Tax Income',
	netinc: 'Net Income',
	prefdivis: 'Preferred Dividends',
	netinccmn: 'Net Income',
	shareswa: 'Shares Outstanding',
	shareswadil: 'Shares Outstanding Diluted',
	eps: 'Earnings Per Share',
	epsdil: 'Earnings Per Share Diluted',
	fcfps: 'Free Cash Flow Per Share',
	dps: 'Dividends Per Share',
	fcf: 'Free Cash Flow',
	taxrate: 'Tax Rate',
	ebitda: 'EBITDA',
	ebit: 'EBIT'
}

/**
 * Rewrite the financial data to be in a format that can be exported
 * @param data the financial data from the backend API
 * @returns
 */
export function extractFinancials(data: any) {
	let financials: any = []
	const keys = Object.keys(data)
	keys.forEach((key) => {
		let arr = data[key]
		let parsedKey = KEYS[key] || key
		arr.unshift(parsedKey)
		financials.push(arr)
	})

	return financials
}
