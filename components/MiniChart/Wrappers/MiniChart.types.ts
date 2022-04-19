export type MiniChartData = {
	previousClose: number | null
	color: 'red' | 'green'
	percentChange: string | null
	chart: number[]
}
export type MiniChartObject = {
	[key: string]: MiniChartData
}
export type MiniChartRanges = '1D' | '5D' | '1M' | 'YTD' | '1Y' | '3Y' | '5Y'
export type MiniChartSymbols = {
	stocks?: string[]
	etfs?: string[]
}
