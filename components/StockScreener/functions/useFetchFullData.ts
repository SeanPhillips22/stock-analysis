import { screenerDataState } from '../screenerdata.state'
import { getData } from 'functions/apis/API'

export function useFetchFullData() {
	const setLoaded = screenerDataState((state) => state.setLoaded)
	const data = screenerDataState((state) => state.data)
	const setData = screenerDataState((state) => state.setData)

	async function fetchFullData() {
		if (!data || data.length < 1000) {
			const data = await getData('screener?type=f')
			setData(data.data)
			setLoaded(true)
		}
	}

	return fetchFullData
}

export function useFetchFullIPOData() {
	const setLoaded = screenerDataState((state) => state.setLoaded)
	const data = screenerDataState((state) => state.data)
	const setData = screenerDataState((state) => state.setData)

	async function fetchFullData() {
		if (!data || data.length < 100 || data.length > 1000) {
			const data = await getData('iposcreener?type=f')
			setData(data.data)
			setLoaded(true)
		}
	}

	return fetchFullData
}

export function useFetchFullETFData() {
	const setLoaded = screenerDataState((state) => state.setLoaded)
	const data = screenerDataState((state) => state.data)
	const setData = screenerDataState((state) => state.setData)

	async function fetchFullData() {
		if (!data || data.length < 100 || data.length > 1000) {
			const data = await getData('etfscreener?type=f')
			setData(data.data)
			setLoaded(true)
		}
	}

	return fetchFullData
}
