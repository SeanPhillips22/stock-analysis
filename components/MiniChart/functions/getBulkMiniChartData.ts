import { getData } from 'functions/apis/API'
import { MiniChartRanges } from '../MiniChart.types'

type Props = {
	symbols: string
	range: MiniChartRanges
}

/**
 * Pass this function to react-query to fetch the mini chart data
 */
export async function getBulkMiniChartData({ symbols, range }: Props) {
	// If missing params, don't proceed
	if (!symbols || !range) return

	// Make the URL to fetch the data from the backend
	let url = `mcb?s=${symbols}&r=${range}`

	// TODO add try-catch
	return await getData(url)
}
