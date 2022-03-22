import { ColumnItemWrap } from './ColumnItemWrap'
import { ColumnSearch } from './ColumnSearch'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'
import { ClearColumns } from 'components/Dropdown/SelectColumns/ClearColumns'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

/**
 * The custom columns dropdown. It contains a search filter and checkbox for each column.
 * @return {JSX.Element}
 */
export function ColumnDropdown() {
	const { state, dispatch, initial } = useScreenerContext()
	const [search, setSearch] = useState('')

	/**
	 * If the columns have been changed, this function resets them to their initial values
	 */
	function resetColumns() {
		dispatch({ type: 'SET_COLUMNS', value: initial.columns.all[state.resultsMenu] })
	}

	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch search={search} setSearch={setSearch} />
			<ColumnItemWrap search={search} />
			{state.columns.all[state.resultsMenu] !== initial.columns.all[state.resultsMenu] && (
				<ClearColumns clear={resetColumns} />
			)}
		</Dropdown>
	)
}
