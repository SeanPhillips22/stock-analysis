import { screenerState } from '../screener.state'
import { getData } from 'functions/apis/API'
import { ScreenerEndpoints } from '../screener.types'

/**
 * This hook returns a function that fetches the full initial set of data for the screener
 */
export function useFetchFullData() {
	const setLoaded = screenerState(state => state.setLoaded)
	const setData = screenerState(state => state.setData)

	async function fetchFullData(endpoint: ScreenerEndpoints) {
		const data = await getData(`${endpoint}?type=f`)
		setLoaded(true)
		setData(data.data)
	}

	return fetchFullData
}
