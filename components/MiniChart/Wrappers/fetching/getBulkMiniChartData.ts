import { getData } from 'functions/apis/API'
import { MiniChartRanges } from '../MiniChart.types'

type Props = {
	symbolstring: string
	range: MiniChartRanges
	noFetch?: boolean
}

/**
 * Pass this function to react-query to fetch the mini chart data
 */
export async function getBulkMiniChartData({ symbolstring, range, noFetch }: Props) {
	// If missing params, don't proceed
	if (!symbolstring || !range) return

	// Make the URL to fetch the data from the backend
	let url = `mcb?s=${symbolstring}&r=${range}`

	// If noFetch is true, add a "noFetch param" to the URL
	// This will tell the server not to fetch fresh data for the mini charts
	if (noFetch) url += '&noFetch=true'

	return await getData(url)
}
