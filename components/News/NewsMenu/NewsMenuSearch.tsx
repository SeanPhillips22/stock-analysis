import { SearchIcon } from 'components/Icons/SearchIcon'
import { SpinnerIcon } from 'components/Icons/Spinner'
import { getData } from 'functions/apis/API'
import { useRef, useState } from 'react'
import { News } from 'types/News'

type Props = {
	symbol: string
	type: string
	setData: (data: News[]) => void
	news: News[]
	setError: (error: string) => void
	setLoaded: (loaded: boolean) => void
	query: string
	setQuery: (query: string) => void
	searched: boolean
	setSearched: (searched: boolean) => void
	setEnd: (end: boolean) => void
	setPaywalled: (paywalled: boolean) => void
}

export function NewsMenuSearch({
	symbol,
	type,
	setData,
	setError,
	setLoaded,
	query,
	setQuery,
	setSearched,
	setEnd,
	setPaywalled
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [searching, setSearching] = useState(false) // If a search is in progress

	async function doSearch() {
		setPaywalled(false)
		setSearched(false)
		setSearching(true)
		const keyref = inputRef.current ?? null
		if (keyref) keyref.blur()
		const results = await getData(`news-search?s=${symbol}&t=${type}&q=${query}`)
		setSearching(false)
		setSearched(true)
		setLoaded(true)
		setEnd(false)
		if (results.status === 'success') {
			setData(results.data)
		} else if (results.status === 'notfound') {
			setError(`No results found for "${query}"`)
		} else if (results.status === 'error') {
			setError(`There was an error.`)
		}
	}

	return (
		<div className="relative mb-1 max-w-[50%] filter sm:max-w-[170px]">
			<input
				ref={inputRef}
				type="text"
				name="newssearch"
				id="tag-feat-news-search"
				placeholder="Search news..."
				value={query}
				onChange={e => {
					setError('')
					setQuery(e.target.value)
				}}
				onKeyDown={e => e.key === 'Enter' && !searching && doSearch()}
			/>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				{searching ? (
					<SpinnerIcon classes="animate-spin h-5 w-5 text-gray-400" />
				) : (
					<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
				)}
			</div>
		</div>
	)
}
