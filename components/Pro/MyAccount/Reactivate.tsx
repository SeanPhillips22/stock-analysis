import { useAuth } from 'auth/useAuth'
import { useEvent } from 'hooks/useEvent'
import { usePaddleCheckout } from '../Payments/usePaddleCheckout'
import { useModifyUser } from '../Payments/useModifyUser'
import { UserStatus } from '../user.types'

type Props = {
	email: string
	status: string | undefined
}

export function ReActivate({ email, status }: Props) {
	const { isPro } = useAuth()
	const { modifyOrCreateUser } = useModifyUser()
	const { event } = useEvent()
	usePaddleCheckout()

	// The new status to set after successful checkout
	// If previously active, set to active
	// If no previous subscription, set to trialing
	let newStatus: UserStatus = status && ['deleted', 'cancelled', 'paused'].includes(status) ? 'active' : 'trialing'

	// This function is called after a successful checkout
	// It updates the user's info in the database and re-enables
	// pro access. Then it redirects to the confirmation page.
	async function upgradeComplete(data: any) {
		await modifyOrCreateUser(data, newStatus, 'Stock Analysis Pro - Reactivate', '/pro/confirmation/', email)
	}

	if (!status) {
		return (
			<div>
				<p>There is no active subscription on this account.</p>
				<div
					className="bll cursor-pointer font-medium"
					onClick={() => {
						window.Paddle.Checkout.open({
							product: 649892,
							email: email,
							successCallback: upgradeComplete
						})
						event('Checkout', { type: 'Reactivate_No_Active_Subscription' })
					}}
				>
					Start your free 30-day trial now.
				</div>
			</div>
		)
	}

	if (['deleted', 'cancelled', 'paused'].includes(status) && !isPro) {
		return (
			<div
				className="bll cursor-pointer font-medium"
				onClick={() => {
					window.Paddle.Checkout.open({
						product: 747289,
						email: email,
						successCallback: upgradeComplete
					})
					event('Checkout', { type: 'Reactivate_Previously_Cancelled' })
				}}
			>
				Reactivate your Stock Analysis Pro subscription.
			</div>
		)
	}

	return null
}
