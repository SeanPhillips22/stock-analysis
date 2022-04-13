import { Button } from 'components/Buttons/Button'
import { useEvent } from 'hooks/useEvent'
import { LoginPrompt } from './LoginPrompt'

type Props = {
	isLoggedIn: boolean
	loaded: boolean
	cancelUrl?: string
}

export function CancelSubscriptionBody({ isLoggedIn, loaded, cancelUrl }: Props) {
	const { event } = useEvent()

	if (!isLoggedIn) return <LoginPrompt />

	if (!loaded || !cancelUrl) return <div>Loading...</div>

	return (
		<>
			<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">Cancel subscription</h1>

			<p className="mb-4 text-lg leading-relaxed text-gray-900 sm:text-xl">
				Are you sure you want to cancel the subscription?
			</p>

			<p className="mb-6 text-lg leading-relaxed text-gray-900 sm:text-xl">
				If yes, click the button below to proceed.
			</p>

			<Button
				url={cancelUrl}
				text="Cancel Subscription"
				className="mt-8"
				onClick={() => event('Cancel', { step: 'Cancel_Page' })}
			/>
		</>
	)
}
