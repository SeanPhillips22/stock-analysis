import { createContext, useContext, useEffect, useState } from 'react'
import { TableDynamic, TableFixed } from './TableTypes'

interface InitialProps {
	type: 'stocks' | 'etf' // The symbol type
	tableId: string // The unique ID for the table
	fixed: TableFixed // Table data that does not change
	dynamic: TableDynamic // Table data that becomes state and changes
}

interface ContextProps extends InitialProps {
	setState: (newState: Partial<TableDynamic>) => void // Set the table state
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
	const [dynamic, setDynamic] = useState(
		value.tableId === parsed.tableId && parsed.stored
			? parsed.stored
			: value.dynamic
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
			}
		}
	}, [value.tableId])

	// Update the table state
	// Then save it in localStorage
	function setState(newState: Partial<TableDynamic>) {
		let combined = { ...dynamic, ...newState }
		setDynamic(combined)
		localStorage.setItem(value.tableId, JSON.stringify(combined))
	}

	// The full state to pass as context
	const state = {
		type: value.type,
		tableId: value.tableId,
		fixed: value.fixed,
		dynamic,
		setState
	}

	return (
		<TableContext.Provider value={state}>{children}</TableContext.Provider>
	)
}

export function useTableContext() {
	return useContext(TableContext)
}
