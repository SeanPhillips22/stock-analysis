import { objString } from 'functions/helpers/objString'
import { createContext, useContext, useEffect, useState } from 'react'
import { TableDynamic, TableFixed } from './TableTypes'

interface InitialProps {
	title: string // The title of the table
	tableId: string // The unique ID for the table
	fixed: TableFixed // Table data that does not change
	dynamic: TableDynamic // Table data that becomes state and changes
}

interface ContextProps extends InitialProps {
	setState: (newState: Partial<TableDynamic>) => void // Set the table state
	clearState: () => void // Clear the table state
	enabled: boolean // Whether react-query fetching is enabled
}

export const TableContext = createContext({} as ContextProps)

type ProviderProps = {
	value: InitialProps
	children: React.ReactNode
}

// Store data from localStorage outside of the component state
// This is used to persist the table state between page views
// without having to fetch from localStorage again
let parsed: any = {}

export function TableContextProvider({ value, children }: ProviderProps) {
	const { dynamic: initial, tableId: id } = value
	const [enabled, setEnabled] = useState(false)
	const [dynamic, setDynamic] = useState(parsed?.[id] || initial)

	// Recover the state from localStorage, if it exists
	useEffect(() => {
		let stored = localStorage.getItem(id)
		if (stored) {
			let obj = JSON.parse(stored)
			if (obj) {
				parsed[id] = obj
				setDynamic(obj)
				setEnabled(true)
			}
		} else {
			parsed[id] = null
			setDynamic(initial)
			setEnabled(false)
		}
	}, [id, initial])

	// Update the table state
	// Then save it in localStorage
	function setState(newState: Partial<TableDynamic>) {
		let combined = { ...dynamic, ...newState }

		setDynamic(combined)

		let stringified = objString(combined)
		// If both objects are equal, delete the entry from localStorage
		if (stringified === objString(initial)) {
			localStorage.removeItem(id)
			parsed.tableId = id
			parsed.stored = null
			// If they are not equal, save current state to localStorage
		} else {
			setEnabled(true)
			localStorage.setItem(id, stringified)
			parsed.tableId = id
			parsed.stored = combined
		}
	}

	function clearState() {
		localStorage.removeItem(id)
		parsed.tableId = id
		parsed.stored = null
		setDynamic(initial)
	}

	// The full state to pass as context
	const state = {
		title: value.title,
		tableId: id,
		fixed: value.fixed,
		dynamic,
		setState,
		clearState,
		enabled
	}

	return (
		<TableContext.Provider value={state}>{children}</TableContext.Provider>
	)
}

export function useTableContext() {
	return useContext(TableContext)
}
