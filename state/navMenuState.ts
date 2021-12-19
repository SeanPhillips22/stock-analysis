import create from 'zustand'

interface NavMenuState {
	visible: boolean
	toggle: () => void
	close: () => void
	iposOpen: boolean
	toggleIpos: () => void
}

export const navMenuState = create<NavMenuState>((set) => ({
	visible: false,
	toggle: () => set((state) => ({ visible: !state.visible })),
	close: () => set(() => ({ visible: false })),
	iposOpen: false,
	toggleIpos: () => set((state) => ({ iposOpen: !state.iposOpen }))
}))
