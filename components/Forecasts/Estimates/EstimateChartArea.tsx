import { EstimateChart } from './EstimateChart'

export function EstimateChartArea() {
	return (
		<div className="space-y-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-6 lg:space-y-0">
			<EstimateChart title="Revenue Forecast" type="revenue" />
			<EstimateChart title="Revenue Growth" type="revenueGrowth" />
			<EstimateChart title="EPS Forecast" type="eps" />
			<EstimateChart title="EPS Growth" type="epsGrowth" />
		</div>
	)
}
