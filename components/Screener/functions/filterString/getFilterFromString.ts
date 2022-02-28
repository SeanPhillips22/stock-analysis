// Filter parameters are stored as a string in the format "over-10M", "from-2M-10M", etc.
// This function parses such a string into its individual components:
// over-10M --> over, 10000000

import { ComparisonOption } from 'components/Screener/screener.types'
import { fillNumber } from './fillNumber'

export function getFilterFromString(string: string, fill = false) {
	string = string.replaceAll('--', '-X')
	// Split the string
	const explode = string.split('-')

	// First bit is the "compare" value
	const compare = explode[0] as ComparisonOption

	// Second bit is the "first" value
	let first = explode[1] as string
	if (fill && first !== '') {
		first = fillNumber(first)
	}

	// Third bit is the "second" value
	let second = (explode[2] as string) || ''
	if (fill && second !== '') {
		second = fillNumber(second)
	}

	return { compare, first, second }
}

export function getPriceRangeFilterFromString(string: string) {
	const splitStr = string.split('-')
	const first = splitStr[0]
	const second = splitStr[1]

	const compare = 'between'

	return { compare, first, second }
}
