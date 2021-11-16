import { authState } from 'state/authState'

export function useAuthState() {
	const user = authState((state) => state.user)
	const isLoggedIn = authState((state) => state.isLoggedIn)
	const isPro = authState((state) => state.isPro)
	const checked = authState((state) => state.checked)

	return { user, isLoggedIn, isPro, checked }
}
