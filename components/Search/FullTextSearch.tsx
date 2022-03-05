import { SearchItem } from './search.types'

type Props = {
	loading: boolean
	results: SearchItem[]
	query: string
}

/**
 * Give users the option to try a full text search. This redirects to a Google
 * custom search result that searches the entire site.
 * */
export function FullTextSearch({ loading, results, query }: Props) {
	if (loading) return <></>

	if (!results.length) {
		return (
			<div className="bll activebg py-1.5 px-2 text-base sm:px-3 md:text-lg">
				<a href={`/search?q=${query}`}>
					No results found. Try a full text search instead.
				</a>
			</div>
		)
	}

	if (results.length > 1) {
		return (
			<div className="border-t border-gray-200 py-1.5 px-2 text-base hover:bg-gray-100 sm:px-3">
				<a href={`/search?q=${query}`}>
					Not what you&apos;re looking for? Try a full text search.
				</a>
			</div>
		)
	}

	return null
}
