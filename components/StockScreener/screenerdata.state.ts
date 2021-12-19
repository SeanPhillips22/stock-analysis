import create from 'zustand'
import {
	SingleStock,
	SingleDataPoint,
	FilterId,
	ScreenerTypes
} from 'components/StockScreener/screener.types'
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns'

interface ScreenerDataState {
	// Type
	type: ScreenerTypes | ''
	setType: (type: ScreenerTypes) => void

	// Data
	data: SingleStock[]
	setData: (data: SingleStock[]) => void
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) => void
	fullCount: number
	setFullCount: (fullCount: number) => void

	// Loading
	loaded: boolean
	setLoaded: (loaded: boolean) => void
}

export const screenerDataState = create<ScreenerDataState>((set) => ({
	// Type
	type: '',
	setType: (newType: ScreenerTypes) => set({ type: newType }),

	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id)
		})),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),

	// Loading
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded })
}))
