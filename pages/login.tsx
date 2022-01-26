import { useAuth } from 'hooks/useAuth'
import { SEO } from 'components/SEO'
import { useEffect, useState } from 'react'
import { LogIn } from 'components/Login/LogIn'
import { LogOut } from 'components/Login/LogOut'
import { Submitted } from 'components/Login/Submitted'
import { UserLayout } from 'components/Layout/UserLayout'
import { navState } from 'state/navState'

export default function Login() {
	const { user, signIn, signOut } = useAuth()
	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState('')
	const [errorMsg, setErrorMsg] = useState('')
	const route = navState(state => state.route)

	useEffect(() => {
		if (route === '/login/?error=Login+failed') {
			setErrorMsg(
				"Login failed. Please request a new login link in the form below (each link can only be used once). If it doesn't work, please contact us or send an email directly to support@stockanalysis.com."
			)
		}
	}, [route])

	async function logIn(email: string) {
		setErrorMsg('')

		setLoading(true)
		let { error } = await signIn(email)
		setLoading(false)

		if (error) {
			if (
				error.message ===
				'You must provide either an email, phone number or a third-party provider.'
			) {
				setErrorMsg('You must provide a valid email address.')
			} else {
				setErrorMsg(error.message)
			}
		} else {
			setSubmitted(email)
		}
	}

	function Display() {
		return user ? (
			<LogOut email={user.email} signOut={signOut} />
		) : submitted ? (
			<Submitted />
		) : (
			<LogIn signIn={logIn} loading={loading} errorMsg={errorMsg} />
		)
	}

	return (
		<>
			<SEO
				title="Log in to Stock Analysis"
				description="Log in to your Stock Analysis Pro account using your email and password."
				canonical="/login/"
			/>
			<UserLayout>
				<Display />
			</UserLayout>
		</>
	)
}
