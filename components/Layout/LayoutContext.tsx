import { createContext, useContext, useState } from 'react'
import { PathType } from 'types/Path'

interface InitialContextProps {
	url: string
	path: PathType
}

interface ContextProps extends InitialContextProps {
	initial: boolean
	setInitial: (initial: boolean) => void
}

export const LayoutContext = createContext({} as ContextProps)

type ProviderProps = {
	value: InitialContextProps
	children: React.ReactNode
}

export function LayoutContextProvider({ value, children }: ProviderProps) {
	const [initial, setInitial] = useState(true) // initial load or not

	const state = {
		url: value.url,
		path: value.path,
		initial,
		setInitial
	}

	return (
		<LayoutContext.Provider value={state}>{children}</LayoutContext.Provider>
	)
}

export function useLayoutContext() {
	return useContext(LayoutContext)
}
