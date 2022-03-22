import { NewsMenuNav } from './NewsMenuNav'
import { NewsMenuSearch } from './NewsMenuSearch'
import { News } from 'types/News'

type Props = {
	show: string
	setShow: (value: string) => void
	pageType: string
	symbol: string
	setData: (value: News[]) => void
	news: News[]
	setError: (error: string) => void
	setLoaded: (loaded: boolean) => void
	query: string
	setQuery: (query: string) => void
	searched: boolean
	setSearched: (searched: boolean) => void
	setEnd: (end: boolean) => void
}

export function NewsMenu({
	show,
	setShow,
	pageType,
	symbol,
	setData,
	news,
	setError,
	setLoaded,
	query,
	setQuery,
	searched,
	setSearched,
	setEnd
}: Props) {
	return (
		<div className="flex flex-row items-center justify-between border-b">
			<NewsMenuNav show={show} setShow={setShow} setError={setError} pageType={pageType} />
			<NewsMenuSearch
				symbol={symbol}
				type={pageType}
				setData={setData}
				news={news}
				setError={setError}
				setLoaded={setLoaded}
				searched={searched}
				setSearched={setSearched}
				query={query}
				setQuery={setQuery}
				setEnd={setEnd}
			/>
		</div>
	)
}
