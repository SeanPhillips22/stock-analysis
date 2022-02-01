import { objString } from 'functions/helpers/objString'
import { createContext, useContext, useEffect, useState } from 'react'
import { TableDynamic, TableFixed } from './TableTypes'

interface InitialProps {
	type: 'stocks' | 'etf' | 'histip' // The stock index type (more specific is faster)
	title: string // The title of the table
	tableId: string // The unique ID for the table
	fixed: TableFixed // Table data that does not change
	dynamic: TableDynamic // Table data that becomes state and changes
}

interface ContextProps extends InitialProps {
	setState: (newState: Partial<TableDynamic>) => void // Set the table state
	enabled: boolean // Whether react-query fetching is enabled
}

export const TableContext = createContext({} as ContextProps)

type ProviderProps = {
	value: InitialProps
	children: React.ReactNode
}

let parsed: {
	stored: TableDynamic | null
	tableId: string
} = {
	stored: null,
	tableId: ''
}

export function TableContextProvider({ value, children }: ProviderProps) {
	const initialState = value.dynamic
	const [enabled, setEnabled] = useState(false)
	const [dynamic, setDynamic] = useState(
		value.tableId === parsed.tableId && parsed.stored
			? parsed.stored
			: initialState
	)

	// Recover the state from localStorage, if it exists
	useEffect(() => {
		let stored = localStorage.getItem(value.tableId)
		if (stored) {
			let obj = JSON.parse(stored)
			if (obj) {
				parsed.tableId = value.tableId
				parsed.stored = obj
				setDynamic(obj)
				setEnabled(true)
			}
		}
	}, [initialState, value.tableId])

	// Update the table state
	// Then save it in localStorage
	function setState(newState: Partial<TableDynamic>) {
		let combined = { ...dynamic, ...newState }

		setDynamic(combined)

		let stringified = objString(combined)
		// If both objects are equal, delete the entry from localStorage
		if (stringified === objString(initialState)) {
			localStorage.removeItem(value.tableId)
			parsed.tableId = value.tableId
			parsed.stored = null
			// If they are not equal, save current state to localStorage
		} else {
			setEnabled(true)
			localStorage.setItem(value.tableId, stringified)
			parsed.tableId = value.tableId
			parsed.stored = combined
		}
	}

	// The full state to pass as context
	const state = {
		type: value.type,
		title: value.title,
		tableId: value.tableId,
		fixed: value.fixed,
		dynamic,
		setState,
		enabled
	}

	return (
		<TableContext.Provider value={state}>{children}</TableContext.Provider>
	)
}

export function useTableContext() {
	return useContext(TableContext)
}
