import { ColumnName } from 'components/Screener/screener.types'
import { useModifyColumns } from 'components/Screener/functions/useModifyColumns'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	name: ColumnName
}

export function ResultsMenuItem({ name }: Props) {
	const { endpoint, state, dispatch } = useScreenerContext()
	const { fetchManyColumns } = useModifyColumns(endpoint)

	// Format the tab title
	let display = name.toString()
	let dataTitle = name.toString()
	if (name === 'Filtered') {
		display = `${name} (${state.filters.length})`
		dataTitle = `${name} (5)`
	}

	// When hovering over a results tab, fetch the required columns
	function handleHover(name: ColumnName) {
		if (name !== 'Filtered' && name !== 'General') {
			fetchManyColumns(state.columns.all[name])
		}
	}

	// Change the active results menu
	function setMenu(name: ColumnName) {
		dispatch({ type: 'SET_RESULTS_MENU', value: name })
	}

	if (state.resultsMenu === name) {
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
				onClick={() => setMenu(name)}
				onKeyPress={e => {
					e.key === 'Enter' && setMenu(name)
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
