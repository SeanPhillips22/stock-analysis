import { getBulkMiniChartData } from './getBulkMiniChartData'
import { MiniChartSymbols, MiniChartRanges } from '../MiniChart.types'

type Props = {
	symbols: MiniChartSymbols
	range: MiniChartRanges
}

/**
 * Fetch data for many sparkline mini charts at a time.
 * This function is done on the server, so a "noFetch" parameter is added to prevent
 * the server from fetching data which will delay the response.
 */
export function fetchBulkMiniCharts({ symbols, range = '1D' }: Props) {
	let stocks = symbols.stocks?.map((symbol: string) => `s${symbol}`)
	let etfs = symbols.etfs?.map((symbol: string) => `e${symbol}`)

	// Combine the two arrays if they are undefined
	let combined: string[] = []
	if (etfs) combined = stocks ? [...stocks, ...etfs] : etfs
	let symbolstring = combined.join(',')

	const data = getBulkMiniChartData({ symbolstring, range, noFetch: true })

	return data
}
