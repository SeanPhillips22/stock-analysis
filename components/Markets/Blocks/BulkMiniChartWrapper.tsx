import { BulkMiniCharts } from 'components/MiniChart/Wrappers/BulkMiniCharts'
import { MiniChartData, MiniChartRanges } from 'components/MiniChart/Wrappers/MiniChart.types'

type Props = {
	range: MiniChartRanges
	initialData?: MiniChartData[]
	appendToTitle?: string
}

export const miniChartSymbols = {
	etfs: ['SPY', 'QQQ', 'DIA', 'IWM']
}

export function BulkMiniChartWrapper({ range, initialData, appendToTitle }: Props) {
	const title = appendToTitle ? 'Stock Indexes - ' + appendToTitle : 'Stock Indexes'

	return (
		<div className="mb-4 lg:mb-5">
			<div className="text-sm font-semibold text-gray-600">{title}</div>
			<BulkMiniCharts range={range} symbols={miniChartSymbols} initialData={initialData} />
		</div>
	)
}
