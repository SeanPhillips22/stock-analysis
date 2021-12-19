import create from 'zustand'

type NavMenuState = {
	visible: boolean
	toggle: () => void
	close: () => void
	isOpen: { [key: string]: boolean }
	setIsOpen: (newIsOpen: { [key: string]: boolean }) => void
}
/**
 * The state for the left nav menu
 */
export const navMenuState = create<NavMenuState>((set) => ({
	visible: false,
	toggle: () => set((state) => ({ visible: !state.visible })),
	close: () => set(() => ({ visible: false })),
	isOpen: {},
	setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen })
}))
