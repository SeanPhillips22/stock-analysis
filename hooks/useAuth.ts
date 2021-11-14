import { User } from '@supabase/gotrue-js'
import { supabase } from 'functions/client'
import { useEffect, useState } from 'react'

export function useAuth() {
	const [user, setUser] = useState<User>()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isPro, setIsPro] = useState(false)
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event) => {
				if (event === 'SIGNED_IN') {
					setIsLoggedIn(true)
				}
				if (event === 'SIGNED_OUT') {
					setUser(undefined)
					setIsLoggedIn(false)
				}
			}
		)

		checkUser()

		return () => authListener?.unsubscribe()
	}, [])

	async function checkUser() {
		const userCheck = await supabase.auth.user()

		if (userCheck) {
			console.log(userCheck)
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
