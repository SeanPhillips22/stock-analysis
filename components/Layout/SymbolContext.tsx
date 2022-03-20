import { createContext, useContext } from 'react'
import { Info } from 'types/Info'

type ContextProps = {
	info: Info
	data: any
}

export const SymbolContext = createContext({} as ContextProps)

type ProviderProps = {
	value: ContextProps
	children: React.ReactNode
}

export function SymbolContextProvider({ value, children }: ProviderProps) {
	return <SymbolContext.Provider value={value}>{children}</SymbolContext.Provider>
}

/**
 * The context that wraps a page, providing access to the props from the server
 */
export function useSymbolContext() {
	return useContext(SymbolContext)
}
