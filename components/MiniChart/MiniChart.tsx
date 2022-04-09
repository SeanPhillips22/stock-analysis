import { Sparklines, SparklinesFinancial, SparklinesReferenceLine } from 'components/Sparklines/Sparklines'

type MiniChartData = {
	previousClose: number | null
	chart: number[]
	color: 'red' | 'green'
	isFetching: boolean
}

/**
 * Returns a sparkline chart for a given symbol
 */
export function MiniChart({ previousClose, chart, color, isFetching }: MiniChartData) {
	// Return a grey rectangle while loading
	// With the same dimensions as the chart to prevent layout shift
	if (isFetching) return <div className="h-[36px] w-36 bg-gray-100"></div>

	return (
		<div className="mcchart">
			<Sparklines previousClose={previousClose} data={chart}>
				<SparklinesFinancial
					color={color}
					style={{
						strokeWidth: 2,
						fill: color,
						fillOpacity: 0.2
					}}
				/>
				<SparklinesReferenceLine
					style={{ stroke: '#444', strokeOpacity: 1, strokeWidth: 2, strokeDasharray: '4, 5' }}
					type="custom"
					value={1}
				/>
			</Sparklines>
		</div>
	)
}
