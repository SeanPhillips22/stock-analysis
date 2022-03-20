import { useState } from 'react'

/**
 * A hook that works just like useState, except stores the state in localStorage.
 * @param key a unique key to store the state under
 * @param initialValue the initial or default state
 * @returns
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
	// useState stores the current value of the state
	const [storedValue, setStoredValue] = useState<T>(() => {
		// Do not run server-side
		if (typeof window === 'undefined') return initialValue

		try {
			// Get from localSorage
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			// If unable to fetch or parse from localStorage, return the initialValue
			return initialValue
		}
	})

	// Make a wrapped version of useState setter function that
	// also persists the state in localStorage before updating the state
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function to replicate the API of useState
			const valueToStore = value instanceof Function ? value(storedValue) : value

			// Save the state in the useState
			setStoredValue(valueToStore)

			// Save to localStorage
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		} catch (error) {
			console.log(error)
		}
	}

	return [storedValue, setValue] as const
}
