import { MiniChartWidget } from '../MiniChartWidget'

type Props = {
	range: '1D' | '5D' | '1M' | 'YTD' | '1Y' | '3Y' | '5Y'
}

export function StockIndexMiniCharts({ range }: Props) {
	return (
		<div className="flex justify-start space-x-1 md:space-x-2">
			<MiniChartWidget title="S&P500" symbol="SPY" type="etf" range={range} />
			<MiniChartWidget title="Nasdaq 100" symbol="QQQ" type="etf" range={range} />
			<MiniChartWidget title="Dow Jones" symbol="DIA" type="etf" range={range} />
			<MiniChartWidget title="Russell 2000" symbol="IWM" type="etf" range={range} />
		</div>
	)
}
