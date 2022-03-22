export type FinancialReport = {
	[key: string]: any[]
}

export type Range = 'annual' | 'quarterly' | 'trailing'

export type Statement = 'income-statement' | 'balance-sheet' | 'cash-flow-statement' | 'ratios'

export type FinancialsMapType = {
	id: string
	title: string
	tooltipTitle?: string
	tooltip?: string
	bold?: boolean
	extrabold?: boolean
	data?: string
	format?: string
	formula?: string
	indent?: boolean
	border?: boolean
}
