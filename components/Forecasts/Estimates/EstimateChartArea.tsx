import { useSymbolContext } from 'components/Layout/SymbolContext'
import { Info } from 'types/Info'
import { EstimateChart } from './EstimateChart'
import { EstimateGrowthChart } from './EstimateGrowthChart'

export function EstimateChartArea() {
	const { info }: { info: Info } = useSymbolContext()

	return (
		<div className="space-y-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-6 lg:space-y-0">
			<EstimateChart
				title="Revenue Forecast"
				type="revenue"
				key={info.symbol + 'revenue'}
			/>
			<EstimateGrowthChart
				title="Revenue Growth"
				type="revenueGrowth"
				key={info.symbol + 'revenueGrowth'}
			/>
			<EstimateChart
				title="EPS Forecast"
				type="eps"
				key={info.symbol + 'eps'}
			/>
			<EstimateGrowthChart
				title="EPS Growth"
				type="epsGrowth"
				key={info.symbol + 'epsGrowth'}
			/>
		</div>
	)
}
