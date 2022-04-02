import { ColumnName } from 'components/Screener/screener.types'
import { useModifyColumns } from 'components/Screener/functions/useModifyColumns'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { screenerState } from 'components/Screener/screener.state'

type Props = {
	name: ColumnName
}

export function ResultsMenuItem({ name }: Props) {
	const { endpoint, state } = useScreenerContext()
	const resultsMenu = screenerState(state => state.resultsMenu)
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const { fetchManyColumns } = useModifyColumns(endpoint)

	// When hovering over a results tab, fetch the required columns
	function handleHover(name: ColumnName) {
		fetchManyColumns(state.columns.all[name])
	}

	// Change the active results menu
	function setMenu(name: ColumnName) {
		setResultsMenu(name)
	}

	if (resultsMenu === name) {
		return (
			<li>
				<span
					className="dont-move block rounded-md bg-gray-100 py-1 px-1.5 font-medium focus:outline-none"
					data-title={name}
					tabIndex={0}
				>
					{name}
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="dont-move block cursor-pointer py-1 px-1.5 hover:rounded-md hover:bg-gray-100 focus:outline-none"
				data-title={name}
				onClick={() => setMenu(name)}
				onKeyPress={e => {
					e.key === 'Enter' && setMenu(name)
				}}
				onMouseOver={() => handleHover(name)}
				onFocus={() => handleHover(name)}
				tabIndex={0}
			>
				{name}
			</span>
		</li>
	)
}
