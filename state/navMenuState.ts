import create from 'zustand'

type NavMenuState = {
	visible: boolean
	toggle: () => void
	close: () => void
	expanded: boolean
	toggleExpanded: () => void
	expand: () => void
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
	expanded: true,
	toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
	expand: () => set(() => ({ expanded: true })),
	isOpen: {},
	setIsOpen: (newIsOpen) => set({ isOpen: newIsOpen })
}))
