import { useQuery } from 'react-query'
import { getBulkMiniChartData } from './functions/getBulkMiniChartData'
import { BulkSymbols, MiniChartRanges } from './MiniChart.types'

type Props = {
	bulkSymbols: BulkSymbols
	range: MiniChartRanges
}

/**
 * Fetch data for many sparkline mini charts at a time
 */
export function useBulkMiniChart({ bulkSymbols, range = '1D' }: Props) {
	let stocks = bulkSymbols.stocks?.map((symbol: string) => `s${symbol}`)
	let etfs = bulkSymbols.etfs?.map((symbol: string) => `e${symbol}`)

	// Combine the two arrays if they are undefined
	let combined: string[] = []
	if (etfs) combined = stocks ? [...stocks, ...etfs] : etfs
	let symbols = combined.join(',')

	const { data, isFetching } = useQuery([symbols, range], () => getBulkMiniChartData({ symbols, range }), {
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data, isFetching }
}
