import { createContext, useContext } from 'react'
import { PathType } from 'types/Path'

type ContextProps = {
	url: string
	path: PathType
}

export const LayoutContext = createContext({} as ContextProps)

type ProviderProps = {
	value: ContextProps
	children: React.ReactNode
}

export function LayoutContextProvider({ value, children }: ProviderProps) {
	return (
		<LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
	)
}

export function useLayoutContext() {
	return useContext(LayoutContext)
}
