/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from 'functions/supabase'
import { useEffect, useState } from 'react'
import { authState } from 'state/authState'

export function useAuth() {
	const user = authState((state) => state.user)
	const setUser = authState((state) => state.setUser)
	const isLoggedIn = authState((state) => state.isLoggedIn)
	const setIsLoggedIn = authState((state) => state.setIsLoggedIn)
	const isPro = authState((state) => state.isPro)
	const setIsPro = authState((state) => state.setIsPro)
	const checked = authState((state) => state.checked)
	const setChecked = authState((state) => state.setChecked)

	useEffect(() => {
		console.log('hello from useeffect')

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

	async function checkUser() {
		let userCheck = supabase.auth.user()

		// if logged in
		if (userCheck) {
			setUser(userCheck)
			setIsLoggedIn(true)

			// if pro
			let { data } = await supabase.from('userdata').select()
			if (data) {
				console.log(data)
				console.log(data[0].status)

				let status = data[0].status

				if (['trialing', 'active', 'past_due'].includes(status)) {
					setIsPro(true)
				}

				if (status === 'deleted' || status === 'paused') {
					let stopDate =
						data[0].cancelled_date ?? data[0].paused_date ?? null

					if (stopDate) {
						let today = new Date()
						let stop = new Date(stopDate)

						if (today < stop) {
							setIsPro(true)
						}
					}
				}
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
