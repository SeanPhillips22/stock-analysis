/**
 * This function calls the back-end to fetch data to use on the front-end
 * @param {string} params The parameters to use in the API request, ex: "q?id=123"
 */

export const getData = async (params: string) => {
	const url =
		process.env.NEXT_PUBLIC_API_URL ||
		process.env.API_URL ||
		'https://api.stockanalysis.com/wp-json/sa'

	const response = await fetch(`${url}/${encodeURI(params)}`)

	if (response.ok) {
		return await response.json()
	}

	throw new Error(
		`API/getData not ok: ${response.status} ${response.statusText}`
	)
}

export const getCloudflareData = async (params: string) => {
	const url =
		process.env.CF_API_URL ||
		'https://stockanalysis-api.stockanalysis.workers.dev'

	const response = await fetch(`${url}/${encodeURI(params)}`)

	if (response.ok) {
		return await response.json()
	}

	throw new Error(
		`API/getCloudflareData not ok: ${response.status} ${response.statusText}`
	)
}
