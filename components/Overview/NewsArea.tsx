import { useState, useEffect } from 'react'
import { NewsFeed } from 'components/News/_NewsFeed'
import { loadStockTwits } from 'functions/loadStockTwits'
import { News } from 'types/News'
import { Info } from 'types/Info'
import { getData } from 'functions/apis/API'
import { NewsMenu } from 'components/News/NewsMenu/_NewsMenu'
import { LoadMore } from 'components/News/LoadMore/_LoadMore'
import { Information } from 'components/Alerts/Information'

interface Props {
	info: Info
	news: News[]
	updated: number
}

export const NewsArea = ({ info, news, updated }: Props) => {
	const [data, setData] = useState(news)
	const [timestamp, setTimestamp] = useState(updated)
	const [show, setShow] = useState('all')
	const [firstRender, setFirstRender] = useState(true)
	const [loadedMore, setLoadedMore] = useState(false) // If already fetched items 25-50
	const [loading, setLoading] = useState(false) // If fetching new data
	const [end, setEnd] = useState(false) // If no more data to fetch
	const [paywalled, setPaywalled] = useState(false) // If paywall has been triggered
	const [dataPage, setDataPage] = useState(2)
	const [error, setError] = useState('')
	const [searched, setSearched] = useState(false) // If a search has been performed
	const [query, setQuery] = useState('')

	const updatedTime = new Date(timestamp * 1000)
	const currentTime = new Date()

	const minutesBetween =
		(currentTime.getTime() - updatedTime.getTime()) / 1000 / 60

	// Check for fresh news if it's been more than 60 minutes
	useEffect(() => {
		const controller = new AbortController()

		async function fetchData() {
			const fresh = await getData(
				`news-fresh?s=${info.symbol}&t=${info.type}`,
				controller.signal
			)
			if (news[0] && fresh[0] && news[0].title !== fresh[0].title) {
				setData(fresh)
			}
		}

		if (minutesBetween > 60) {
			setTimestamp(currentTime.getTime())
			fetchData()
		}
		return () => controller?.abort()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Fetch data if a menu item has been clicked (videos, press releases, conversation)
	useEffect(() => {
		let controller = new AbortController()
		async function fetchData() {
			const fresh = await getData(
				`news?s=${info.symbol}&t=${info.type}&f=${show}`,
				controller?.signal
			)
			if (fresh.length) {
				setData(fresh)
			} else {
				if (show === 'v') {
					setError('No videos found for this stock.')
				} else if (show === 'pr') {
					setError('No additional press releases found for this stock.')
				}
			}
		}

		if (firstRender) {
			setFirstRender(false)
		} else {
			if (show === 'chat') {
				loadStockTwits(info.ticker)
			} else {
				setEnd(false)
				setLoadedMore(false)
				setPaywalled(false)
				fetchData()
			}
		}
		return () => controller?.abort()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show])

	if (!news || news.length === 0) {
		return (
			<div className="mt-6 px-4 md:px-0 lg:mt-0">
				<h2 className="hh2 mb-2">News</h2>
				<span className="text-xl">There is no news available yet.</span>
			</div>
		)
	}

	return (
		<>
			<div className="mt-6 px-4 md:px-0 lg:mt-0">
				<h2 className="hh2 mb-0">News</h2>
				<NewsMenu
					show={show}
					setShow={setShow}
					pageType={info.type}
					symbol={info.symbol}
					setData={setData}
					news={news}
					setError={setError}
					setLoaded={setLoadedMore}
					searched={searched}
					setSearched={setSearched}
					query={query}
					setQuery={setQuery}
					setEnd={setEnd}
				/>
			</div>
			{error && (
				<div className="mt-4">
					<Information message={error} />
				</div>
			)}
			{show !== 'chat' ? (
				<>
					<NewsFeed
						data={data}
						related="Other symbols"
						paywalled={paywalled}
					/>
					<LoadMore
						info={info}
						show={show}
						data={data}
						setData={setData}
						loading={loading}
						setLoading={setLoading}
						loaded={loadedMore}
						setLoaded={setLoadedMore}
						end={end}
						setEnd={setEnd}
						setPaywalled={setPaywalled}
						dataPage={dataPage}
						setDataPage={setDataPage}
						searched={searched}
						query={query}
					/>
				</>
			) : (
				<div id="altwrap" className="overflow-x-auto pt-2"></div>
			)}
		</>
	)
}
