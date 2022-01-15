import { SelectConfig } from 'types/SelectConfig'
import { getData } from './API'
import { respondSSR } from './callBackEnd'

/**
 * Fetch data from the select endpoint on the backend
 */
export async function getSelect(config: SelectConfig, ssr?: boolean) {
	// destructure the props and create the URL
	let { type, main, count, sort, columns } = config

	// turn the columns array into a string
	let cols = columns.join(',')
	if (!columns.includes(main)) cols = cols + ',' + main // add main if not included

	// turn the filters array into a string
	let filters = config.filters ? config.filters.join(',') : ''

	// create the url
	let url = `select?type=${type}&main=${main}&count=${count}&sort=${sort}&columns=${cols}&filters=${filters}`

	// fetch the data from the back-end
	let response = await getData(url)

	// if SSR is true, return the data as page props
	if (ssr) {
		return respondSSR(response)
	}

	// if not, then return the data
	return response.data.data
}
