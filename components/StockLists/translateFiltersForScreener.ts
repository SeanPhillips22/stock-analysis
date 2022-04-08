import { capitalize } from 'functions/helpers/capitalize'

/**
 * Turn stock table filters into the correct filters for the stock screener
 * in order to enable the "Open in Screener" functionality
 */
export function translateFiltersForScreener(list: any) {
	if (list.filters) {
		return list.filters.map((f: any) => {
			// Split the filter string by the - symbol
			let bits = f.split('-')

			// The first bit is the indicator ID
			let dataId = bits[0]

			// The second bit is the comparison type (is, contains, etc)
			let comparison = bits[1]

			// The third bit is the filter value
			let value = bits[2]

			// If the string contains !, then it's an array filter with "OR"
			if (value.includes('!')) {
				let arrayBits = value.split('!')
				let val1 = arrayBits[0].replace('%', ' ')
				let val2 = arrayBits[1].replace('%', ' ')
				return {
					id: dataId,
					array: [val1, val2],
					filterType: 'multiselect'
				}
			}

			// If dataId is country or industry, it's a single array value
			else if (dataId === 'country' || dataId === 'industry') {
				return {
					id: dataId,
					array: [capitalize(value.replace('%', ' '))],
					filterType: 'multiselect'
				}
			}

			// If dataId is payoutFrequency
			else if (dataId === 'payoutFrequency') {
				return {
					id: dataId,
					value: capitalize(value),
					filterType: 'stringmatch'
				}
			}

			// If not, then it's a single value filter
			else {
				return {
					id: dataId,
					value: comparison + '-' + value,
					filterType: 'numeric'
				}
			}
		})
	}

	// If the list is for a tag
	if (list.tag) {
		return [
			{
				id: 'tags',
				name: '',
				array: [list.tag],
				filterType: 'multiselectarray'
			}
		]
	}

	return null
}
