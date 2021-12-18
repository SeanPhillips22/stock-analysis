export async function getSearchResults(params: string) {
	const url =
		process.env.CF_API_URL ||
		'https://stockanalysis-api.stockanalysis.workers.dev'

	const response = await fetch(`${url}/${encodeURI(params)}`)

	if (response.ok) {
		return await response.json()
	}

	throw new Error(
		`API/getSearchResults not ok: ${response.status} ${response.statusText}`
	)
}
