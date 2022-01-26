/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from 'functions/supabase'
import { useEffect } from 'react'
import { authState } from 'state/authState'
import { navState } from 'state/navState'

export function useAuth() {
	const user = authState(state => state.user)
	const setUser = authState(state => state.setUser)
	const isLoggedIn = authState(state => state.isLoggedIn)
	const setIsLoggedIn = authState(state => state.setIsLoggedIn)
	const isPro = authState(state => state.isPro)
	const setIsPro = authState(state => state.setIsPro)
	const checked = authState(state => state.checked)
	const setChecked = authState(state => state.setChecked)
	const checking = authState(state => state.checking)
	const setChecking = authState(state => state.setChecking)
	const route = navState(state => state.route)

	useEffect(() => {
		// subscribe to login and logout events
		// auth state is stored in localstorage
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_IN') {
					setUser(session?.user)
					setIsLoggedIn(true)
					checkPro(session?.user)
				}
				if (event === 'SIGNED_OUT') {
					setUser(undefined)
					setIsLoggedIn(false)
				}
				// set a cookie in order to use server-side rendered features
				// fetch('/api/auth/', {
				// 	method: 'POST',
				// 	headers: new Headers({ 'Content-Type': 'application/json' }),
				// 	credentials: 'same-origin',
				// 	body: JSON.stringify({ event, session })
				// })
			}
		)

		if (!checking) {
			setChecking(true)
			checkUser()
		}

		return () => authListener?.unsubscribe()
	}, [])

	async function checkUser() {
		const userCheck = supabase.auth.user()

		// if user is logged in
		if (userCheck) {
			setUser(userCheck)
			setIsLoggedIn(true)
			await checkPro(userCheck)
		}
		setChecked(true)
	}

	async function checkPro(user: any) {
		const auth = user.user_metadata // auth for the auth.users table

		// Set the pro status based on auth metadata (fast)
		if (['trialing', 'active', 'past_due'].includes(auth.status)) {
			setIsPro(true)
		}

		if (auth.status === 'deleted' || auth.status === 'paused') {
			let stopDate = auth.cancelled_date ?? auth.paused_date ?? null

			if (stopDate) {
				if (new Date() < new Date(stopDate)) {
					setIsPro(true)
				}
			}
		}

		// Check if stored pro status is different from auth metadata (slow).
		// If it's different, update the meta data so the changes are reflected
		// on next refresh.
		const { data } = await supabase.from('userdata').select()

		if (data && data[0]) {
			let userdata = data[0] // userdata for the public.userdata table

			if (userdata.status !== auth.status) {
				await supabase.auth.update({
					data: { status: userdata.status }
				})
			}

			if (
				userdata.status === 'deleted' &&
				auth.cancelled_date !== userdata.cancelled_date
			) {
				await supabase.auth.update({
					data: { cancelled_date: userdata.cancelled_date }
				})
			}

			if (
				userdata.status === 'paused' &&
				auth.paused_date !== userdata.paused_date
			) {
				await supabase.auth.update({
					data: { paused_date: userdata.paused_date }
				})
			}
		}
	}

	/*
		// @ts-ignore
		create_user: false
	*/
	async function signIn(email: string) {
		const { error } = await supabase.auth.signIn({ email })
		return { error }
	}

	async function signOut() {
		await supabase.auth.signOut()
	}

	// If there is a login error, redirect to the login page and show an error message
	if (route === '/#error_code=404&error_description=User+not+found') {
		if (typeof window !== 'undefined') {
			window.location.href = '/login/?error=Login+failed'
		}
	}

	return {
		user,
		signIn,
		signOut,
		checked,
		isLoggedIn,
		isPro,
		setIsPro
	}
}
