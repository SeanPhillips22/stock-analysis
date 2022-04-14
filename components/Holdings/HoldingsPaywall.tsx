import { useAuthState } from 'auth/useAuthState'
import { Button } from 'components/Buttons/Button'
import { useEvent } from 'hooks/useEvent'

export const HoldingsPaywall = ({ total }: { total: number }) => {
	const { isPro } = useAuthState()
	const { event } = useEvent()

	if (isPro || total < 200) {
		return null
	}

	return (
		<div className="mt-4 border border-gray-200 p-6 text-center">
			<h4 className="mb-3 text-2xl font-bold text-gray-900 xs:text-3xl">Showing 200 of {total} holdings</h4>
			<div className="text-xl">Subscribe to see the full list</div>
			<Button
				text="Start Free Trial"
				url="/pro/"
				className="w-44"
				id="tag-upgr-holdings-below"
				onClick={() => event('Free_Trial_Click', { location: 'Holdings_Below_Table' })}
			/>
		</div>
	)
}
