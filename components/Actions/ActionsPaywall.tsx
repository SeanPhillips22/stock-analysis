import { Button } from 'components/Buttons/Button'
import { useAuthState } from 'auth/useAuthState'
import { useEvent } from 'hooks/useEvent'

interface Props {
	count: number
	fullCount: number
	title: string
}

export const ActionsPaywall = ({ count, fullCount, title }: Props) => {
	const { isPro } = useAuthState()
	const { event } = useEvent()

	if (isPro || count === fullCount) {
		return null
	}

	return (
		<div className="mt-7 border border-gray-200 p-6 text-center">
			<h4 className="mb-3 text-2xl font-bold text-gray-900 xs:text-3xl">
				Showing {count} of {fullCount} {title.toLowerCase()}
			</h4>
			<div className="text-xl">Subscribe to see the full list</div>
			<Button
				text="Start Free Trial"
				url="/pro/"
				className="w-44"
				id="tag-upgr-actions-below"
				onClick={() => event('Free_Trial_Click', { location: 'Corporate_Actions_Below_Table' })}
			/>
		</div>
	)
}
