export async function getSearchResults(params: string) {
	const url = 'https://api.stockanalysis.com/'

	const response = await fetch(`${url}/${encodeURI(params)}`)

	if (response.ok) {
		return await response.json()
	}

	throw new Error(
		`API/getSearchResults not ok: ${response.status} ${response.statusText}`
	)
}
