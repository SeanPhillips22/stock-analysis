/**
 * This function extracts the text from table cell HTML when exporting. Either from the title tag or the inner text.
 * @param {string} value The values extracted from the table cells
 * @return {string | number | null}
 */
export function extractTextFromHTML(value: string): string | number | null {
	if (value.split('class=').length === 3) {
		return new DOMParser().parseFromString(value, 'text/html').documentElement
			.textContent
	}

	// If value is just a dash, return null
	if (value === '-') {
		return null
	}

	// If there is no value, return null
	if (value.includes('data-raw="n/a"')) {
		return null
	}

	// If there is a data-raw or HTML title tag, grab the value between the double quotes
	// this is a simple way to pass the raw value for export
	// it is also a nice way for people to see the raw value by hovering
	if (value.includes('data-raw=')) {
		// Grab value between double quotes
		let split = value.split('data-raw="')
		let extracted = split[1].split('"')[0]
		return extracted
	}
	if (value.includes('title=')) {
		// Grab value between double quotes
		let split = value.split('title="')
		let extracted = split[1].split('"')[0]

		// Remove commas from numbers
		if (extracted.includes(',')) {
			let removeCommas = extracted.replace(/,/g, '')
			return parseFloat(removeCommas)
		}
		// Remove percentage symbol
		if (extracted.includes('%')) {
			let removePc = extracted.replace(/%/g, '')
			return parseFloat(removePc)
		}
		return extracted
	}

	if (value.includes('href=') || value.includes('class=')) {
		// Grab value between > and 2nd <
		let start = value.indexOf('>') + 1
		let end = value.indexOf('<', 1)
		let extracted = value.substring(start, end)
		return extracted
	}

	// Replace &amp; with &
	if (value.includes('&amp;')) {
		return value.replace(/&amp;/g, '&')
	}

	return value
}

export function removeNanValues(value: string): string | null {
	if (Number.isNaN(value)) {
		return ''
	}
	return value
}

export function extractFinancialValues(value: any, row: number, col: number) {
	if (row === 0 && col !== 0) {
		return `${value}`
	}
	if (col === 0) {
		return value.replace(/(<([^>]+)>)/gi, '')
	}
	if (value === '-') {
		return ''
	}

	value = value.match(/"([^"]*)"/)[1]
	if (value.includes(',')) {
		return parseFloat(value.replace(/,/g, ''))
	}
	if (value.includes('%')) {
		return parseFloat(value.replace(/%/, '')) / 100
	}
	return parseFloat(value)
}
