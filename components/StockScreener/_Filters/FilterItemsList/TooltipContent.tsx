import { DataId } from 'types/DataId'
import { TOOLTIP_MAP } from 'components/StockScreener/maps/tooltip.map'
import { screenerState } from 'components/StockScreener/screener.state'

export function TooltipContent({ id }: { id: DataId }) {
	const type = screenerState(state => state.type)
	const data = TOOLTIP_MAP.find(item => item.id === id)

	if (!data) {
		return null
	}

	return (
		<div className="p-1">
			<h4 className="text-xl font-semibold mb-2">{data.title}</h4>
			<div className="text-smaller border-t border-gray-300 pt-2">
				{data[type] || data.tooltip}
			</div>
			{data.formula && (
				<div className="text-sm border-t border-gray-300 mt-3 pt-2">
					{data.formula}
				</div>
			)}
		</div>
	)
}
