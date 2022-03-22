import { DataId } from 'types/DataId'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function TooltipContent({ id }: { id: DataId }) {
	const { dataPoints } = useScreenerContext()
	const data = dataPoints.find(item => item.id === id)

	if (!data || !data.name || !data.tooltipText) {
		return null
	}

	return (
		<div className="p-1">
			<h4 className="mb-2 text-xl font-semibold">{data.tooltipTitle || data.name}</h4>
			<div className="border-t border-gray-300 pt-2 text-smaller">{data.tooltipText}</div>
			{data.tooltipFormula && (
				<div className="mt-3 border-t border-gray-300 pt-2 text-sm">{data.tooltipFormula}</div>
			)}
		</div>
	)
}
