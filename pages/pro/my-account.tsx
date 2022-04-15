import { SEO } from 'components/SEO'
import { LoginPrompt } from 'components/Pro/LoginPrompt'
import { useState, useEffect } from 'react'
import { CrispChat } from 'components/Scripts/CrispChat'
import { useAuthState } from 'auth/useAuthState'
import { Layout } from 'components/Layout/_Layout'
import { MyAccount } from 'components/Pro/MyAccount/_MyAccount'
import { Spinner } from 'components/Loading/Spinner'
import { getUserInfo } from 'auth/supabase/getUserInfo'

export default function MyAccountPage() {
	const { isLoggedIn } = useAuthState()
	const [userInfo, setUserInfo] = useState<any>()
	const [loaded, setLoaded] = useState(false)

	async function getUser() {
		let data = await getUserInfo()
		if (data) setUserInfo(data)
		setLoaded(true)
	}

	useEffect(() => {
		if (isLoggedIn) getUser()
	}, [isLoggedIn])

	// If not logged in, show login prompt
	// If logged in but user is not loaded, show spinner
	// Then if logged in AND loaded, show the my account page
	const Component = () => {
		if (!isLoggedIn) return <LoginPrompt />
		else if (!loaded) return <Spinner />
		else return <MyAccount u={userInfo} />
	}

	return (
		<>
			<SEO title="My Account" canonical="/pro/my-account/" noindex={true} />
			<CrispChat />
			<Layout url="/pro/my-account/">
				<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 xs:space-y-8 xs:px-6 xs:py-12">
					<Component />
				</div>
			</Layout>
		</>
	)
}
