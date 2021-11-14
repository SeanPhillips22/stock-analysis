import { User } from '@supabase/gotrue-js'
import { supabase } from 'functions/supabase'
import { useEffect, useState } from 'react'

export function useAuth() {
	const [user, setUser] = useState<User>()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isPro, setIsPro] = useState(false)
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_IN') {
					setIsLoggedIn(true)
				}
				if (event === 'SIGNED_OUT') {
					setUser(undefined)
					setIsLoggedIn(false)
				}
				fetch('/api/auth', {
					method: 'POST',
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'same-origin',
					body: JSON.stringify({ event, session }),
				})
			}
		)

		checkUser()

		return () => authListener?.unsubscribe()
	}, [])

	// TODO add checks if cancelled to compare to last payment date?
	async function checkUser() {
		const userCheck = supabase.auth.user()

		if (userCheck) {
			setUser(userCheck)
			setIsLoggedIn(true)
			if (userCheck.user_metadata.status === 'active') {
				setIsPro(true)
			}
		}
		setChecked(true)
	}

	async function signIn(email: string) {
		const { error } = await supabase.auth.signIn({ email })
		return { error }
	}

	async function signOut() {
		await supabase.auth.signOut()
	}

	return { user, signIn, signOut, checked, isLoggedIn, isPro }
}
