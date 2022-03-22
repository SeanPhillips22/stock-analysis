import { FinancialReport, FinancialsMapType } from 'types/Financials'
import { formatNumber } from 'functions/numbers/formatNumber'

export const getPeriodLabel = (range: string) => {
	switch (range) {
		case 'annual':
			return 'Year'

		case 'quarterly':
			return 'Quarter Ended'

		case 'trailing':
			return 'Period Ended'

		default:
			return ''
	}
}

export const getPeriodTooltip = (range: string) => {
	switch (range) {
		case 'annual':
			return "The company's fiscal year, which is a 12-month financial reporting period. The fiscal year does not always match the calendar year."

		case 'quarterly':
			return 'The end date of the fiscal quarter, which is a 3-month financial reporting period.'

		case 'trailing':
			return 'The end date of the preceding trailing twelve-month period.'

		default:
			return ''
	}
}

export const redOrGreen = (value: string, id: string) => {
	let change = parseFloat(value)
	if (id === 'shareschange') {
		change = change * -1
	} // Inverse colors

	if (change > 0) {
		return 'text-green-700'
	} else if (change < 0) {
		return 'text-red-600'
	} else {
		return 'inherit'
	}
}

export const setBorder = (rowname: string) => {
	return rowname.includes('Growth') && '1px solid #CCC'
}

// Format the Y axis on hover charts
export const formatY = (value: number, format?: string, ymin?: number, ymax?: number) => {
	if (
		!format &&
		((ymax && (ymax > 10000000 || ymax < -10000000)) || (ymin && (ymin > 10000000 || ymin < -10000000)))
	) {
		return formatNumber(value / 1000000, 0, 0)
	}

	if (
		format === 'reduce_precision' &&
		((ymax && (ymax > 1000000 || ymax < -1000000)) || (ymin && (ymin > 1000000 || ymin < -1000000)))
	) {
		return formatNumber(value / 1000000, 0, 0) // new Intl.NumberFormat('en-US').format(value / 1000000);
	}

	if (format === 'growth' || format === 'margin') {
		return formatNumber(value, 0, 0, '%')
	}
	if (format === 'percentage') {
		return formatNumber(value, 0, 2, '%')
	}
	if (format === 'ratio' || format === 'pershare') {
		return formatNumber(value, 2, 2)
	}
	return formatNumber(value, 0, 0)
}

type FormatCell = {
	type: string
	current: number
	previous: number | null | string
	revenue: number | null
	divider: number
	isTTMcolumn: boolean
	isHover?: boolean
}

// Format the number in the cells
export function formatCell({ type, current, previous, revenue, divider, isTTMcolumn, isHover }: FormatCell) {
	const decimals = divider === 1 ? 3 : 2

	switch (type) {
		case 'standard':
			return formatNumber(current / divider, 0, 2)

		case 'reduce_precision': {
			if (current) {
				return formatNumber(current / divider, 0, 0)
			}
			return '-'
		}

		case 'growth': {
			if (
				current &&
				previous &&
				typeof current === 'number' &&
				typeof previous === 'number' &&
				current > 0 &&
				previous > 0 &&
				!isTTMcolumn
			) {
				return ((current / previous - 1) * 100).toFixed(decimals) + '%'
			}
			return '-'
		}

		case 'margin': {
			if (current && revenue) {
				return ((current / revenue) * 100).toFixed(2) + '%'
			}
			return '-'
		}

		case 'percentage': {
			return (current * 100).toFixed(decimals) + '%'
		}

		case 'pershare': {
			if (current) {
				return current.toFixed(decimals)
			}
			return '-'
		}

		case 'ratio': {
			if (current === 0) return '0'
			if (current) {
				return divider === 1 || isHover
					? (Math.round(current * 1000) / 1000).toFixed(3)
					: (Math.round(current * 100) / 100).toFixed(2)
			}
			return '-'
		}

		default:
			return ''
	}
}

// Format the number in the cells
export function formatCellExport({ type, current, previous, revenue }: FormatCell) {
	const decimals = 3

	switch (type) {
		case 'standard':
			return current

		case 'reduce_precision': {
			if (current) {
				return current
			}
			return
		}

		case 'growth': {
			if (
				current &&
				previous &&
				typeof current === 'number' &&
				typeof previous === 'number' &&
				current > 0 &&
				previous > 0
			) {
				return parseFloat((current / previous - 1).toFixed(decimals))
			}
			return
		}

		case 'margin': {
			if (current && revenue) {
				return parseFloat((current / revenue).toFixed(decimals))
			}
			return
		}

		case 'percentage': {
			return current
		}

		case 'pershare': {
			if (current) {
				return current
			}
			return
		}

		case 'ratio': {
			if (current) {
				return current
			}
			return
		}

		default:
			return
	}
}

export function formatYear(date: string | number, statement?: string) {
	if (date === 'TTM') return statement === 'ratios' ? 'Current' : 'TTM'

	const dateObject = new Date(date)
	let year = dateObject.getFullYear()
	const month = dateObject.getMonth()
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--
	}
	return year
}

export function countDecimals(value: string) {
	const float = parseFloat(value)
	if (Math.floor(float.valueOf()) === float.valueOf()) return 0

	const str = value.toString()
	if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
		return str.split('-')[1] || 0
	} else if (str.indexOf('.') !== -1) {
		return str.split('.')[1].length || 0
	}
	return str.split('-')[1] || 0
}

export function reducePrecisionFix(value: number) {
	if (value > 10000000 || value < -10000000) {
		const divided = value / 1000000
		return formatNumber(divided, 0, 0)
	}
	return value
}

// Show numbers in thousands, millions or raw
export function getDivider(divider: number) {
	switch (divider) {
		case 1000000000:
			return 'billions'

		case 1000000:
			return 'millions'

		case 1000:
			return 'thousands'

		case 1:
			return null
	}

	return null
}

// Slice financial data if paywalled
export function sliceData(data: FinancialReport, showcount: number, reversed: boolean) {
	const sliced = {} as FinancialReport

	if (data) {
		Object.keys(data).forEach(key => {
			sliced[key] = data[key].slice(0, showcount)
		})

		return reversed ? reverseData(sliced) : sliced
	}
	return reversed ? reverseData(data) : data
}

// Reverse left/right order of financial data
export function reverseData(data: FinancialReport) {
	const reversed = {} as FinancialReport

	Object.keys(data).forEach(key => {
		reversed[key] = data[key].reverse()
	})

	return reversed
}

// Get the css for the individual financial table rows
export function getRowStyles(row: FinancialsMapType) {
	const styles = []
	if (row.format === 'growth' || row.border) {
		styles.push('border-b-2 border-gray-300 text-[0.85rem] sm:text-[0.95rem]')
	}
	if (row.bold) {
		styles.push('font-semibold text-gray-800')
	}
	if (row.extrabold) {
		styles.push('font-bold text-gray-700')
	}

	return styles.join(' ')
}
