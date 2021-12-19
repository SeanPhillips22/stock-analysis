import create from 'zustand'

interface AuthState {
	checked: boolean
	isLoggedIn: boolean
	isPro: boolean
	user: any

	setChecked: (newChecked: boolean) => void
	setIsLoggedIn: (newIsLoggedIn: boolean) => void
	setIsPro: (newIsPro: boolean) => void
	setUser: (newUser: any) => void
}

export const authState = create<AuthState>((set) => ({
	checked: false,
	isLoggedIn: false,
	isPro: false,
	user: null,

	setChecked: (newChecked) => set({ checked: newChecked }),
	setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
	setIsPro: (newIsPro) => set({ isPro: newIsPro }),
	setUser: (newUser) => set({ user: newUser }),
}))
