import { DataId } from 'types/DataId'
import { SingleStock } from 'components/StockScreener/screener.types'
import { getFilterFromString } from '../filterString/getFilterFromString'

export function numericMatch(stock: SingleStock, id: DataId, filter: string) {
	// Explode the filter value string to get the individiaul items
	const { compare, first, second } = getFilterFromString(filter, true)

	// If there is no compare, or no value, then return false
	if (!stock || !compare) {
		return false
	}

	// Format the values before comparing
	const value = stock[id]

	// Three comparison types: over, under and between
	switch (compare) {
		case 'over':
			if (!first) {
				return true
			}
			if (Number(first) === 0) {
				return value > first
			}
			return Number(value) >= Number(first)

		case 'under':
			if (!first) {
				return true
			}
			if (!value) {
				return false
			}
			return Number(value) <= Number(first)

		case 'between':
			if (!second) {
				return Number(value) >= Number(first)
			}
			if (!first) {
				return Number(value) <= Number(second)
			}
			return (
				Number(value) >= Number(first) && Number(value) <= Number(second)
			)

		case 'exactly':
			return Number(value) === Number(first)

		case 'notzero':
			return Number(value) !== 0
	}
}
