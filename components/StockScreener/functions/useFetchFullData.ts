import { screenerState } from '../screener.state'
import { getData } from 'functions/apis/API'
import { ScreenerTypes } from '../screener.types'

/**
 * This hook returns a function that fetches the full initial set of data for the screener
 * @param type the type of screener to fetch data for
 */
export function useFetchFullData() {
	const setLoaded = screenerState((state) => state.setLoaded)
	const setData = screenerState((state) => state.setData)

	async function fetchFullData(type: ScreenerTypes) {
		const screenerType =
			type === 'stocks'
				? 'screener'
				: type === 'ipo'
				? 'iposcreener'
				: 'etfscreener'

		const data = await getData(`${screenerType}?type=f`)
		setLoaded(true)
		setData(data.data)
	}

	return fetchFullData
}
