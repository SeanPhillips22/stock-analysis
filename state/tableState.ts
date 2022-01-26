import { SortObject } from 'components/StockScreener/screener.types'
import create from 'zustand'

interface TableState {
	tablePage: number
	tableSize: number
	sort: SortObject[]
	setTablePage: (newTablePage: number) => void
	setTableSize: (tableSize: number) => void
	setSort: (sort: SortObject[]) => void
}

export const tableState = create<TableState>(set => ({
	tablePage: 0,
	tableSize: 500,
	sort: [{ id: 's', desc: true }],
	setTablePage: newTablePage => set({ tablePage: newTablePage }),
	setTableSize: newTableSize => set({ tableSize: newTableSize }),
	setSort: newSort => set({ sort: newSort })
}))
