import { createContext } from 'react'
import { PageConfig } from 'types/PageConfig'
import { TableTimestamp } from 'types/Tables'

type ContextProps = {
	config: PageConfig
	updated: TableTimestamp
}

export const TableContext = createContext({} as ContextProps)

type Props = {
	value: any
	children: React.ReactNode
}

export function TableContextProvider({ value, children }: Props) {
	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	)
}
