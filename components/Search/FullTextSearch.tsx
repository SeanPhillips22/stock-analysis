import Link from 'next/link'

type Props = {
	loading: boolean
	results: number
	query: string
}

/**
 * Give users the option to try a full text search. This redirects to a Google
 * custom search result that searches the entire site.
 * */
export function FullTextSearch({ loading, results, query }: Props) {
	if (loading) return <></>

	if (!results) {
		return (
			<div className="bll activebg py-1.5 px-2 text-base sm:px-3 md:text-lg">
				<a href={`/search?q=${query}`}>
					No results found. Try a full text search instead.
				</a>
			</div>
		)
	}

	return (
		<div className="bll border-t border-gray-200 py-1.5 px-2 text-base sm:px-3 md:text-lg">
			<Link href={`/search?q=${query}`} prefetch={false}>
				<a>Not what you&apos;re looking for? Try a full text search.</a>
			</Link>
		</div>
	)
}
