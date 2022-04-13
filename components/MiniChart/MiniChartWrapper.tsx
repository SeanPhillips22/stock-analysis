import { MiniChart } from 'components/MiniChart/MiniChart'

type MiniChartData = {
	previousClose: number | null
	chart: number[]
	color: 'red' | 'green'
	isFetching: boolean
}

/**
 * Returns a sparkline chart for a given symbol
 */
export function MiniChartWrapper({ previousClose, chart, color, isFetching }: MiniChartData) {
	// Return a grey rectangle while loading
	// With the same dimensions as the chart to prevent layout shift
	if (isFetching) return <div className="h-[36px] bg-gray-100 lg:w-36"></div>

	return (
		<div className="mcchart">
			<MiniChart
				previousClose={previousClose}
				type={'financial'}
				data={chart}
				margin={2}
				style={{
					strokeWidth: 2,
					fill: color,
					fillOpacity: 0.2
				}}
				onMouseMove={undefined}
			/>
		</div>
	)
}
