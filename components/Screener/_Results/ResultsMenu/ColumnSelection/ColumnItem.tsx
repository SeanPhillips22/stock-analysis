import { screenerState } from 'components/Screener/screener.state'
import { DataId } from 'types/DataId'
import { useModifyColumns } from 'components/Screener/functions/useModifyColumns'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	name: string
	id: DataId
}

/**
 * A checkbox that activates/deactivates a custom column for the screener results table
 * @return {JSX.Element}
 */
export function ColumnItem({ name, id }: Props): JSX.Element {
	const { endpoint } = useScreenerContext()
	const { fetchColumn, toggle, isShowing } = useModifyColumns(endpoint)
	const setOpen = screenerState(state => state.setColumnDropdownOpen)

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'Enter') toggle(id)
		if (e.key === 'Escape') setOpen(false)
	}

	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id={id}
				checked={isShowing(id)}
				onChange={() => toggle(id)}
				onMouseEnter={() => fetchColumn(id)}
				onFocus={() => fetchColumn(id)}
				onKeyDown={handleKeyDown}
				className="h-4 w-4 rounded border border-gray-500 text-blue-600 focus:ring-blue-500"
			/>
			<label htmlFor={id} className="ml-2 text-gray-800">
				{name}
			</label>
		</div>
	)
}
