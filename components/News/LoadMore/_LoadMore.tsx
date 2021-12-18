import { useAuthState } from 'hooks/useAuthState'
import { getData } from 'functions/apis/API'
import { ButtonMore } from './ButtonMore'
import { NewsPaywall } from './NewsPaywall'
import { News } from 'types/News'
import { useEffect } from 'react'
import { Info } from 'types/Info'

type Props = {
	info: Info
	show: string
	data: News[]
	setData: (data: any) => void
	loading: boolean
	setLoading: (loading: boolean) => void
	loaded: boolean
	setLoaded: (loaded: boolean) => void
	end: boolean
	setEnd: (end: boolean) => void
	setPaywalled: (paywalled: boolean) => void
	dataPage: number
	setDataPage: (dataPage: number) => void
	searched: boolean
	query: string
}

export function LoadMore({
	info,
	show,
	data,
	setData,
	loading,
	setLoading,
	loaded,
	setLoaded,
	end,
	setEnd,
	setPaywalled,
	dataPage,
	setDataPage,
	searched,
	query
}: Props) {
	const { isPro } = useAuthState()

	useEffect(() => {
		if (loaded && data.length === 50 && !isPro) {
			setPaywalled(true)
		}
	}, [loaded, data, isPro, setPaywalled])

	async function fetchData() {
		setLoading(true)
		const fresh = await getData(
			`news?s=${info.symbol}&t=${info.type}&f=${show}&full=true`
		)
		setLoading(false)
		setData(fresh)
		setLoaded(true)
		if (fresh.length < 25) {
			setEnd(true)
		}
	}

	async function fetchInfiniteData() {
		const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null
		setLoading(true)

		let infinite =
			searched && query.length > 0
				? await getData(
						`news-search?s=${info.symbol}&t=${info.type}&q=${query}&p=${dataPage}&k=${PRO_KEY}`
				  )
				: await getData(
						`news-infinite?s=${info.symbol}&t=${info.type}&f=${show}&p=${dataPage}&k=${PRO_KEY}`
				  )

		if (infinite.data) {
			infinite = infinite.data
		}

		setLoading(false)
		setDataPage(dataPage + 1)

		setData(data.concat(infinite))
		if (infinite.length < 25) {
			setEnd(true)
		}
	}

	if (data.length === 25 && !loaded) {
		return (
			<ButtonMore
				fn={fetchData}
				tag="fetchData"
				loading={loading}
				end={end}
			/>
		)
	}

	if (loaded && data.length === 50 && !isPro) {
		return <NewsPaywall />
	}

	if (loaded && data.length >= 50 && isPro) {
		return (
			<ButtonMore
				fn={fetchInfiniteData}
				tag="fetchDataPro"
				loading={loading}
				end={end}
			/>
		)
	}

	return null
}
