import { createContext, useContext } from 'react'
import { PathType } from 'types/Path'

interface ContextProps {
	url: string
	path: PathType
}

export const LayoutContext = createContext({} as ContextProps)

type ProviderProps = {
	value: ContextProps
	children: React.ReactNode
}

export function LayoutContextProvider({ value, children }: ProviderProps) {
	const state = {
		url: value.url,
		path: value.path
	}

	return <LayoutContext.Provider value={state}>{children}</LayoutContext.Provider>
}

export function useLayoutContext() {
	return useContext(LayoutContext)
}
