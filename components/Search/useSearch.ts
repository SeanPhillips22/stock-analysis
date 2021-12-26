import { useEffect, useRef, useState } from 'react'
import { SearchItem } from './search.types'

const url = 'https://api.stockanalysis.com'

/**
 * A custom hook that handles the fetching of the search results
 * @param debouncedQuery the search query, which has been debounced
 * @param trending the trending data, shown as fallback if no query is provided
 * @returns
 */
export function useSearch(debouncedQuery: string, trending: SearchItem[]) {
	const [results, setResults] = useState<SearchItem[]>([])
	const [filtering, setFiltering] = useState(false)
	const abort = useRef<AbortController>()

	// Fetch results, with abort controller
	async function getSearchResults(params: string) {
		abort.current = new AbortController()
		const { signal } = abort.current

		try {
			const response = await fetch(`${url}/${encodeURI(params)}`, { signal })

			if (response.ok) {
				const data = await response.json()
				setResults(data)
			}
		} catch (e: any) {
			if (e.name === 'AbortError') {
				// Do nothing
			} else {
				throw new Error(
					`API/getSearchResults not ok: ${e.name} - ${e.message}`
				)
			}
		} finally {
			setFiltering(false)
		}
	}

	// Respond to debounced query by starting a new search
	useEffect(() => {
		if (abort.current) abort.current.abort() // Cancel previous request
		setFiltering(true)

		async function queryCFWorker(search: string) {
			return await getSearchResults('search?q=' + search)
		}

		if (debouncedQuery.length) {
			queryCFWorker(debouncedQuery)
		} else if (trending.length) {
			setResults(trending)
		}
	}, [debouncedQuery, trending])

	return { results, filtering }
}
