import { getData } from 'functions/apis/API'
import { useQuery } from 'react-query'

type Props = {
	symbol: string
	type: 'stocks' | 'etf'
	range: '1D' | '5D' | '1M' | 'YTD' | '1Y' | '3Y' | '5Y'
}

/**
 * Pass this function to react-query to fetch the mini chart data
 */
async function getMiniChartData({ symbol, type, range }: Props) {
	// If missing params, don't proceed
	if (!symbol || !type || !range) return

	// Make the URL to fetch the data from the backend
	let url = `minichart?s=${symbol}&t=${type}&r=${range}`

	// TODO add try-catch
	return await getData(url)
}

/**
 * Fetch data for a sparkline mini chart
 */
export function useMiniChart({ symbol, type, range = '1D' }: Props) {
	const { data, isFetching } = useQuery([symbol, type, range], () => getMiniChartData({ symbol, type, range }), {
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isFetching }
}
