import { DataId } from 'types/DataId'
import { getDataPoints } from 'components/StockScreener/maps/dataPoints'
import { screenerState } from 'components/StockScreener/screener.state'

export function TooltipContent({ id }: { id: DataId }) {
	const type = screenerState(state => state.type)
	const DataPoints = getDataPoints(type)
	const data = DataPoints.find(item => item.id === id)

	if (!data || !data.name || !data.tooltipText) {
		return null
	}

	return (
		<div className="p-1">
			<h4 className="text-xl font-semibold mb-2">
				{data.tooltipTitle || data.name}
			</h4>
			<div className="text-smaller border-t border-gray-300 pt-2">
				{data.tooltipText}
			</div>
			{data.tooltipFormula && (
				<div className="text-sm border-t border-gray-300 mt-3 pt-2">
					{data.tooltipFormula}
				</div>
			)}
		</div>
	)
}
