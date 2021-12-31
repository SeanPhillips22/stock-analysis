import create from 'zustand'

interface FinancialsState {
	range: 'annual' | 'quarterly' | 'trailing'
	setRange: (newRange: 'annual' | 'quarterly' | 'trailing') => void

	divider: number
	setDivider: (newDivider: number) => void

	leftRight: 'left' | 'right'
	setLeftRight: (newLeftRight: 'left' | 'right') => void

	reversed: boolean
	setReversed: (newReversed: boolean) => void
}

export const financialsState = create<FinancialsState>((set) => ({
	range: 'annual',
	setRange: (newRange) => set({ range: newRange }),

	divider: 1000000,
	setDivider: (newDivider) => set({ divider: newDivider }),

	leftRight: 'left',
	setLeftRight: (newLeftRight) => set({ leftRight: newLeftRight }),

	reversed: false,
	setReversed: (newReversed) => set({ reversed: newReversed })
}))
