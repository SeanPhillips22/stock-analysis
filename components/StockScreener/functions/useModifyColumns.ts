import { DataId } from 'types/Data'
import { ScreenerTypes } from '../screener.types'
import { screenerState } from 'components/StockScreener/screener.state'
import { getData } from 'functions/apis/API'
import { getScreenerUrl } from './getScreenerUrl'

/**
 * A custom hook with functions to manipulate the columns in the stock screener results table
 * @return {functions}
 */
export function useModifyColumns() {
	const showColumns = screenerState((state) => state.showColumns)
	const setShowColumns = screenerState((state) => state.setShowColumns)
	const fetchedColumns = screenerState((state) => state.fetchedColumns)
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn)
	const addDataColumn = screenerState((state) => state.addDataColumn)
	const addFetching = screenerState((state) => state.addFetching)
	const removeFetching = screenerState((state) => state.removeFetching)

	// Fetch a new data column
	async function fetchColumn(id: DataId, type: ScreenerTypes) {
		if (!isFetched(id)) {
			addFetching(id)
			addFetchedColumn(id)
			const fetched = await getData(getScreenerUrl(type) + `?type=${id}`)
			addDataColumn(fetched, id)
			removeFetching(id)
		}
	}

	// Fetch many data columns at a time
	async function fetchManyColumns(columns: DataId[], type: ScreenerTypes) {
		columns.forEach(async (id) => {
			if (!fetchedColumns.includes(id)) {
				fetchColumn(id, type)
			}
		})
	}

	// Check if data for a column has been fetched
	function isFetched(id: DataId) {
		return fetchedColumns.includes(id)
	}

	// Toggle a column to either show or hide
	function toggle(id: DataId, type: ScreenerTypes) {
		if (showColumns.includes(id)) {
			setShowColumns(showColumns.filter((filter) => filter !== id))
		} else {
			if (!isFetched(id)) {
				fetchColumn(id, type)
			}
			setShowColumns([...showColumns, id])
		}
	}

	// Check if a column is showing
	function isShowing(id: DataId) {
		return showColumns.includes(id)
	}

	return { fetchColumn, fetchManyColumns, isFetched, toggle, isShowing }
}
