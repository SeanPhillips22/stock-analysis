import { MiniChartSymbols, MiniChartData, MiniChartRanges } from './MiniChart.types'
import { MiniChartWidget } from './MiniChartWidget'
import { useBulkMiniChart } from './fetching/useBulkMiniChart'

type Props = {
	range: MiniChartRanges
	symbols: MiniChartSymbols
	initialData?: MiniChartData[]
}

/**
 * Provide a set of mini chart symbols to display
 */
export function BulkMiniCharts({ range, symbols, initialData }: Props) {
	const { data } = useBulkMiniChart({ symbols, range, initialData })

	return (
		<div className="mcwidgets">
			<MiniChartWidget title="S&P500" symbol="SPY" type="etf" data={data} />
			<MiniChartWidget title="Nasdaq 100" symbol="QQQ" type="etf" data={data} />
			<MiniChartWidget title="Dow Jones" symbol="DIA" type="etf" data={data} />
			<MiniChartWidget title="Russell 2000" symbol="IWM" type="etf" data={data} />
		</div>
	)
}
