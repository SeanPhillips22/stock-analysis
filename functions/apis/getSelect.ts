import { TableDynamic } from 'components/StockTable/TableTypes'
import { getData } from './API'

/**
 * Fetch data from the select endpoint on the backend
 */
export async function getSelect(config: TableDynamic, ssr?: boolean, extras?: string[]) {
	// destructure the props and create the URL
	let { main, count, sortDirection, columns, index, page, dedupe } = config

	// turn the columns array into a string
	let cols = columns.join(',')
	if (!columns.includes(main)) cols = cols + ',' + main // add main if not included

	// turn the filters array into a string
	let filters = config.filters ? config.filters.join(',') : ''

	// create the url
	let url = `select?index=${
		index || 'stocks'
	}&main=${main}&count=${count}&sort=${sortDirection}&columns=${cols}&filters=${filters}`

	// request extra data
	// for example, data to show in the page's sidebar
	if (extras) {
		url += `&extras=${extras.join(',')}`
	}

	// If pagination is enabled, add the page number
	if (page) {
		url += `&page=${page}`
	}

	// Remove duplicate symbols from the list
	if (dedupe) {
		url += '&dedupe=true'
	}

	// fetch the data from the back-end
	let response = await getData(url)

	// return the data
	return response.data
}
