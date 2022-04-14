import { supabase } from 'auth/supabase/supabase'
import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { useEffect, useState } from 'react'
import { useAuthState } from 'auth/useAuthState'
import { CancelSubscriptionBody } from 'components/Pro/CancelSubscription'

export default function CancelSubscription() {
	const { isLoggedIn } = useAuthState()
	const [userInfo, setUserInfo] = useState<any>()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (isLoggedIn) {
			getUserInfo()
		}
	}, [isLoggedIn])

	async function getUserInfo() {
		const { data: profile } = await supabase
			.from('userdata')
			.select(
				'email, status, plan, update_url, cancel_url, receipt_url, payment_method, currency, next_bill_date, next_payment_amount, unit_price, registered_date, cancelled_date, paused_date'
			)

		if (profile) {
			setUserInfo(profile[0])
		}

		setLoaded(true)
	}

	return (
		<>
			<SEO title="Cancel Subscription" canonical="/pro/cancel/" noindex={true} />
			<UserLayout url="/pro/cancel/">
				<CancelSubscriptionBody isLoggedIn={isLoggedIn} loaded={loaded} cancelUrl={userInfo?.cancel_url} />
			</UserLayout>
		</>
	)
}
