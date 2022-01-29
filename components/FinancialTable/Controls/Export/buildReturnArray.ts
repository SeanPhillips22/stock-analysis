import { extractFinancials } from './extractBulkFinancials'

const CONVERT: any = {
	annual: 'Annual',
	quarterly: 'Quarterly',
	trailing: 'TTM',
	'income-statement': 'Income',
	'balance-sheet': 'Balance-Sheet',
	'cash-flow-statement': 'Cash-Flow',
	ratios: 'Ratios'
}

/**
 * This function builds an array that tells the excellentexport plugin how to export the data
 * @param data the raw financial data from the backend API
 * @returns
 */
export function buildReturnArray(data: any) {
	let ranges = ['annual', 'quarterly', 'trailing']

	let extracted: any = []

	ranges.forEach(key => {
		let range = data[key]
		if (range) {
			Object.keys(range).forEach(statement => {
				let statementObj = range[statement]
				if (statementObj.count > 0) {
					let d = statementObj.data
					let arr = extractFinancials(d, statement, key)
					let name = `${CONVERT[statement]}-${CONVERT[key]}`
					extracted.push({ name, from: { array: arr } })
				}
			})
		}
	})

	return extracted
}
