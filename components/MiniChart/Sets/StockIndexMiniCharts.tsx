import { BulkSymbols, MiniChartRanges } from '../MiniChart.types'
import { MiniChartWidget } from '../MiniChartWidget'
import { useBulkMiniChart } from '../useBulkMiniChart'

type Props = {
	range: MiniChartRanges
}

export function StockIndexMiniCharts({ range }: Props) {
	const bulkSymbols: BulkSymbols = {
		etfs: ['SPY', 'QQQ', 'DIA', 'IWM']
	}

	const { data, isFetching } = useBulkMiniChart({ bulkSymbols, range })

	return (
		<div className="mcwidgets">
			<MiniChartWidget title="S&P500" symbol="SPY" type="etf" data={data} isFetching={isFetching} />
			<MiniChartWidget title="Nasdaq 100" symbol="QQQ" type="etf" data={data} isFetching={isFetching} />
			<MiniChartWidget title="Dow Jones" symbol="DIA" type="etf" data={data} isFetching={isFetching} />
			<MiniChartWidget title="Russell 2000" symbol="IWM" type="etf" data={data} isFetching={isFetching} />
		</div>
	)
}
