import { useAuth } from 'hooks/useAuth'
import { SEO } from 'components/SEO'
import { useState } from 'react'
import { LogIn } from 'components/Login/LogIn'
import { LogOut } from 'components/Login/LogOut'
import { Submitted } from 'components/Login/Submitted'

export default function Login() {
	const { user, signIn, signOut } = useAuth()
	const [loading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	async function logIn(email: string) {
		setErrorMsg('')

		setLoading(true)
		let { error } = await signIn(email)
		setLoading(false)

		if (error) {
			setErrorMsg(error.message)
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
			<div className="flex flex-col justify-center py-5 xs:py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
				<Display />
			</div>
		</>
	)
}
