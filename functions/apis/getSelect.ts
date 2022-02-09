import { TableDynamic } from 'components/StockTable/TableTypes'
import { getData } from './API'
import { respondSSR } from './callBackEnd'

/**
 * Fetch data from the select endpoint on the backend
 */
export async function getSelect(
	config: TableDynamic,
	type: 'stocks' | 'etf' | 'histip',
	ssr?: boolean,
	extras?: string[]
) {
	// destructure the props and create the URL
	let { main, count, sortDirection, columns } = config

	// turn the columns array into a string
	let cols = columns.join(',')
	if (!columns.includes(main)) cols = cols + ',' + main // add main if not included

	// turn the filters array into a string
	let filters = config.filters ? config.filters.join(',') : ''

	// create the url
	let url = `select?type=${type}&main=${main}&count=${count}&sort=${sortDirection}&columns=${cols}&filters=${filters}`

	// request extra data
	if (extras) {
		url += `&extras=${extras.join(',')}`
	}

	// fetch the data from the back-end
	let response = await getData(url)

	// if SSR is true, return the data as page props
	if (ssr) {
		return respondSSR(response)
	}

	// if not, then return the data
	return response.data
}
