import { createContext, useContext, useEffect } from 'react'
import { FilterProps, ScreenerEndpoints, ScreenerIDs, ScreenerState, ScreenerTypes } from './screener.types'
import { usePersistedReducer } from 'hooks/usePersistedReducer'
import { useModifyColumns } from './functions/useModifyColumns'
import { screenerState } from './screener.state'
import { PresetFilter } from './maps/presetFilters.map'

interface InitialScreenerProps {
	id: ScreenerIDs
	endpoint: ScreenerEndpoints // The name of the endpoint on the back-end
	type: ScreenerTypes
	title: string
	presets: PresetFilter[]
	dataPoints: FilterProps[]
	initial: ScreenerState
	// resetState?: () => void
}

// Used to remove "columns" from the state passed via context
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface ScreenerContextProps extends InitialScreenerProps {
	state: ScreenerState
	dispatch: React.Dispatch<{ type: string; value: any }>
}

export const ScreenerContext = createContext({} as ScreenerContextProps)

type ProviderProps = {
	value: InitialScreenerProps
	children: React.ReactNode
}

function reducer(state: ScreenerState, action: { type: string; value: any }) {
	switch (action.type) {
		case 'SET_FILTERS':
			state.filters = action.value
			state.filters.forEach(filter => state.columns.all.Filtered.push(filter.id))
			break

		case 'ADD_FILTER':
			state.filters = state.filters.filter(filter => filter.id !== action.value.id)
			state.filters.push(action.value)
			if (!state.columns.all.Filtered.includes(action.value.id)) {
				state.columns.all.Filtered.push(action.value.id)
			}
			if (state.activePreset) state.activePreset = ''
			break

		case 'REMOVE_FILTER':
			state.filters = state.filters.filter(filter => filter.id !== action.value)
			if (state.activePreset) state.activePreset = ''
			break

		case 'CLEAR_FILTERS':
			state.activePreset = ''
			state.filters = []
			state.columns.all.Filtered = state.columns.filtered
			state.sort.active = state.sort.default
			break

		case 'ADD_COLUMN':
			state.columns.all[action.value[0]].push(action.value[1])
			break

		case 'REMOVE_COLUMN':
			state.columns.all[action.value[0]] = state.columns.all[action.value[0]].filter(
				column => column !== action.value[1]
			)
			break

		case 'REMOVE_FILTERED_COLUMN':
			state.columns.all.Filtered = state.columns.all.Filtered.filter((column: string) => column !== action.value)
			break

		case 'SET_COLUMNS':
			state.columns.all[action.value[0]] = action.value[1]
			break

		case 'SET_ACTIVE_PRESET':
			state.activePreset = action.value
			break

		case 'SET_SORT':
			state.sort.active = action.value
			break

		case 'RESET_SORT':
			state.sort.active = state.sort.default
			break

		// case 'RESET_STATE':
		// 	state = action.value
		// 	break
	}
	return state
}

export function ScreenerContextProvider({ value, children }: ProviderProps) {
	const { id, endpoint, title, type, initial, presets, dataPoints } = value
	const [state, dispatch] = usePersistedReducer(reducer, id, initial)
	const loaded = screenerState(state => state.loaded)
	const { fetchManyColumns } = useModifyColumns(endpoint)
	const resultsMenu = screenerState(state => state.resultsMenu)

	/**
	 * Reset the entire state to its initial value
	 */
	// function resetState() {
	// 	dispatch({ type: 'RESET_STATE', value: initial })
	// }

	// Load the required data columns on mount
	useEffect(() => {
		if (loaded) {
			let activeFilterIds = state.filters.map(f => f.id)
			let columnsToFetch = [...state.columns.all.Filtered, ...state.columns.all[resultsMenu], ...activeFilterIds]
			columnsToFetch = columnsToFetch.filter(i => !state.columns.default.includes(i))
			fetchManyColumns(columnsToFetch)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loaded])

	// The main state object to be passed via the context provider
	const stateObject = { id, endpoint, type, title, state, dispatch, presets, dataPoints, initial }

	return <ScreenerContext.Provider value={stateObject}>{children}</ScreenerContext.Provider>
}

export function useScreenerContext() {
	return useContext(ScreenerContext)
}
