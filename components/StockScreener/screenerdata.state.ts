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
	type: ScreenerTypes
	setType: (type: ScreenerTypes) => void

	data: SingleStock[]
	setData: (data: SingleStock[]) => void
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) => void
	loaded: boolean
	setLoaded: (loaded: boolean) => void
	fullyLoaded: boolean
	setFullyLoaded: (fullyLoaded: boolean) => void
	fullCount: number
	setFullCount: (fullCount: number) => void
}

export const screenerDataState = create<ScreenerDataState>((set) => ({
	// Type
	type: 'stocks',
	setType: (newType: ScreenerTypes) =>
		set((state) => ({ ...state, type: newType })),

	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id)
		})),
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
	fullyLoaded: false,
	setFullyLoaded: (newFullyLoaded: boolean) =>
		set({ fullyLoaded: newFullyLoaded }),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount })
}))
