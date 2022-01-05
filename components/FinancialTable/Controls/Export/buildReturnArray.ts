import { extractFinancials } from './extractBulkFinancials'

export function buildReturnArray(data: any) {
	let extracted = extractFinancials(data)

	let obj = [
		{
			name: 'Export',
			from: { array: extracted }
		},
		{
			name: 'Export2',
			from: { array: extracted }
		},
		{
			name: 'Export3',
			from: { array: extracted }
		}
	]

	return obj
}
