import { ColumnItemWrap } from './ColumnItemWrap'
import { ColumnSearch } from './ColumnSearch'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'
import { ClearColumns } from 'components/Dropdown/SelectColumns/ClearColumns'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { screenerState } from 'components/Screener/screener.state'

/**
 * The custom columns dropdown. It contains a search filter and checkbox for each column.
 * @return {JSX.Element}
 */
export function ColumnDropdown() {
	const { state, dispatch, initial } = useScreenerContext()
	const resultsMenu = screenerState(state => state.resultsMenu)
	const [search, setSearch] = useState('')

	/**
	 * If the columns have been changed, this function resets them to their initial values
	 */
	function resetColumns() {
		dispatch({ type: 'SET_COLUMNS', value: [resultsMenu, initial.columns.all[resultsMenu]] })
	}

	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch search={search} setSearch={setSearch} />
			<ColumnItemWrap search={search} />
			{state.columns.all[resultsMenu] !== initial.columns.all[resultsMenu] && <ClearColumns clear={resetColumns} />}
		</Dropdown>
	)
}
