import { DataId } from 'types/DataId'
import { screenerState } from 'components/Screener/screener.state'
import { getData } from 'functions/apis/API'
import { useScreenerContext } from '../ScreenerContext'
import { ScreenerEndpoints } from '../screener.types'

/**
 * A custom hook with functions to manipulate the columns in the stock screener results table
 */
export function useModifyColumns(endpoint: ScreenerEndpoints) {
	const { state, dispatch } = useScreenerContext()
	const fetchedColumns = screenerState(state => state.fetchedColumns)
	const addFetchedColumn = screenerState(state => state.addFetchedColumn)
	const addDataColumn = screenerState(state => state.addDataColumn)
	const addFetching = screenerState(state => state.addFetching)
	const removeFetching = screenerState(state => state.removeFetching)

	// Fetch a new data column
	async function fetchColumn(id: DataId) {
		if (!isFetched(id)) {
			addFetching(id)
			addFetchedColumn(id)
			const fetched = await getData(endpoint + `?type=${id}`)
			addDataColumn(fetched, id)
			removeFetching(id)
		}
	}

	// Fetch many data columns at a time
	async function fetchManyColumns(columns: DataId[]) {
		columns.forEach(async id => {
			if (!fetchedColumns.includes(id)) {
				fetchColumn(id)
			}
		})
	}

	// Check if data for a column has been fetched
	function isFetched(id: DataId) {
		return fetchedColumns.includes(id)
	}

	// Toggle a column to either show or hide
	function toggle(id: DataId) {
		dispatch({ type: 'TOGGLE_COLUMN', value: id })
		if (!isFetched(id)) {
			fetchColumn(id)
		}
	}

	// Check if a column is showing
	function isShowing(id: DataId) {
		return state.columns.all[state.resultsMenu].includes(id)
	}

	return { fetchColumn, fetchManyColumns, isFetched, toggle, isShowing }
}
