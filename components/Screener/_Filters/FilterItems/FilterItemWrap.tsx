import { useModifyColumns } from 'components/Screener/functions/useModifyColumns'
import { screenerState } from 'components/Screener/screener.state'
import { FilterProps } from 'components/Screener/screener.types'
import { Tooltip } from 'components/Tooltips/Tooltip'
import { SingleFilter } from './_Filter'
import { TooltipContent } from './TooltipContent'

type Props = {
	f: FilterProps
}

/**
 * The wrapper around the filter item
 * contains the label name and the tooltip
 */
export function FilterWrap({ f }: Props) {
	const type = screenerState(state => state.type)
	const { fetchColumn } = useModifyColumns()

	return (
		<div
			className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-1 py-1.5 text-smaller text-gray-900"
			key={f.name}
		>
			<div className="hide-scroll cursor-help overflow-x-auto">
				<Tooltip
					content={<TooltipContent id={f.id} />}
					theme="light"
					delay={500}
				>
					<div>{f.name}</div>
				</Tooltip>
			</div>
			<div
				onMouseEnter={() => fetchColumn(f.id, type)}
				onFocus={() => fetchColumn(f.id, type)}
			>
				<SingleFilter filter={f} />
			</div>
		</div>
	)
}