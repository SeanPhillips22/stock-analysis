import { screenerState } from 'components/StockScreener/screener.state'
import {
	ColumnName,
	ScreenerTypes
} from 'components/StockScreener/screener.types'
import { returnResultColumns } from 'components/StockScreener/maps/resultColumns.map'
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns'

type Props = {
	name: ColumnName
	type: ScreenerTypes
}

export function ResultsMenuItem({ name, type }: Props) {
	const filters = screenerState(state => state.filters)
	const resultsMenu = screenerState(state => state.resultsMenu)
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const { fetchManyColumns } = useModifyColumns()

	let display = name.toString()
	let dataTitle = name.toString()
	if (name === 'Filtered') {
		display = `${name} (${filters.length})`
		dataTitle = `${name} (5)`
	}

	// When hovering over a results tab, fetch the required columns
	function handleHover(name: ColumnName) {
		if (name !== 'Filtered' && name !== 'General') {
			fetchManyColumns(returnResultColumns(type, name), type)
		}
	}

	if (resultsMenu === name) {
		return (
			<li>
				<span
					className="rounded-md bg-gray-100 py-1 px-2 font-medium focus:outline-none"
					data-title={dataTitle}
					tabIndex={0}
				>
					{display}
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="cursor-pointer py-1 px-2 hover:rounded-md hover:bg-gray-100 focus:outline-none"
				data-title={dataTitle}
				onClick={() => setResultsMenu(name)}
				onKeyPress={e => {
					e.key === 'Enter' && setResultsMenu(name)
				}}
				onMouseOver={() => handleHover(name)}
				onFocus={() => handleHover(name)}
				tabIndex={0}
			>
				{display}
			</span>
		</li>
	)
}
