import { createContext, useContext } from 'react'
import { PageConfig } from 'types/PageConfig'
import { TableTimestamp } from 'types/Tables'

type ContextProps = {
	page: PageConfig
	updated: TableTimestamp
}

export const PageContext = createContext({} as ContextProps)

type Props = {
	value: {
		page: PageConfig
		updated: TableTimestamp
	}
	children: React.ReactNode
}

export function PageContextProvider({ value, children }: Props) {
	return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

/**
 * Return static properties for the current page
 */
export function usePageContext() {
	return useContext(PageContext)
}
