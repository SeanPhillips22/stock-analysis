import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { useEffect, useState } from 'react'
import { useAuthState } from 'auth/useAuthState'
import { CancelSubscriptionBody } from 'components/Pro/CancelSubscription'
import { getUserInfo } from 'auth/supabase/getUserInfo'

export default function CancelSubscription() {
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

	return (
		<>
			<SEO title="Cancel Subscription" canonical="/pro/cancel/" noindex={true} />
			<UserLayout url="/pro/cancel/">
				<CancelSubscriptionBody isLoggedIn={isLoggedIn} loaded={loaded} cancelUrl={userInfo?.cancel_url} />
			</UserLayout>
		</>
	)
}
