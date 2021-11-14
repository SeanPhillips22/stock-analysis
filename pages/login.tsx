/* eslint-disable @next/next/no-img-element */
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth'
import { SEO } from 'components/SEO'
import { useState } from 'react'
import { LogIn } from 'components/Login/LogIn'
import { useAuth } from 'hooks/useAuth'
import { LogOut } from 'components/Login/LogOut'
import { Submitted } from 'components/Login/Submitted'

export default function Login() {
	const { user, signIn, signOut } = useAuth()
	const [submitted, setSubmitted] = useState('')

	async function logIn(email: string) {
		const { error } = await signIn(email)

		if (error) {
			console.log(error)
		} else {
			setSubmitted(email)
		}
	}

	function Display() {
		return user ? (
			<LogOut email={user.email} signOut={signOut} />
		) : submitted ? (
			<Submitted email={submitted} />
		) : (
			<LogIn signIn={logIn} />
		)
	}

	return (
		<>
			<SEO
				title="Log in to Stock Analysis"
				description="Log in to your Stock Analysis Pro account using your email and password."
				canonical="/login/"
			/>
			<LayoutFullWidth>
				<div className="flex flex-col justify-center py-5 xs:py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
					<Display />
				</div>
			</LayoutFullWidth>
		</>
	)
}
