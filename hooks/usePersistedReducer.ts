// Adapted from: https://www.benmvp.com/blog/sync-localstorage-react-usereducer-hook/
import { ScreenerState } from 'components/Screener/screener.types'
import { useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { useLocalStorage } from './useLocalStorage'

/**
 * This custom hooks is similar to useReducer, except the value is stored in localStorage
 * @param reducer the reducer function
 * @param storageKey the key to store the state under in localStorage
 * @param initialState the initial state
 * @returns
 */
export function usePersistedReducer(reducer: any, storageKey: string, initialState: ScreenerState) {
	// useLocalStorage stores the current value of the state in localStorage
	const [savedState, saveState] = useLocalStorage(storageKey, initialState)

	// Wrap reducer with a memoized function that syncs the new state to
	// localStorage before returning the newState
	const reducerLocalStorage = useCallback(
		(state, action) => {
			const newState = reducer(state, action)
			saveState(newState)
			return newState
		},
		[reducer, saveState]
	)

	// This returns a [state, dispatch]
	// const [state, dispatch] = useImmerReducer(reducerLocalStorage, savedState)
	// return [state, dispatch]
	return useImmerReducer(reducerLocalStorage, savedState)
}
