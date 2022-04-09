import { Sparklines, SparklinesFinancial, SparklinesReferenceLine } from 'components/Sparklines/Sparklines'
import { useMiniChart } from './useMiniChart'

type MiniChartData = {
	previousClose: number | null
	color: 'red' | 'green'
	chart: number[]
}

type Props = {
	symbol: string
	type: 'stocks' | 'etf'
	range: '1D'
}

type QueryProps = {
	data: MiniChartData
	isFetching: boolean
}

/**
 * Returns a sparkline chart for a given symbol
 */
export function MiniChart({ symbol, type, range }: Props) {
	const { data, isFetching }: QueryProps = useMiniChart({ symbol, type, range })

	// Return a grey rectangle while loading
	// With the same dimensions as the chart to prevent layout shift
	if (isFetching) return <div className="h-[36px] w-36 bg-gray-100"></div>

	return (
		<div className="w-36">
			<Sparklines previousClose={data.previousClose} data={data.chart}>
				<SparklinesFinancial
					color={data.color}
					style={{
						strokeWidth: '2',
						fill: data.color,
						fillOpacity: '.2'
					}}
				/>
				<SparklinesReferenceLine
					style={{ stroke: 'black', strokeOpacity: 1, strokeWidth: '2', strokeDasharray: '4, 5' }}
					type={'custom'}
					value={1}
				/>
			</Sparklines>
		</div>
	)
}
