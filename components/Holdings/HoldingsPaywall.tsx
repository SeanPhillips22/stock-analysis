import { useAuthState } from 'hooks/useAuthState'
import { Button } from 'components/Buttons/Button'

export const HoldingsPaywall = ({ total }: { total: number }) => {
	const { isPro } = useAuthState()

	if (isPro || total < 200) {
		return null
	}

	return (
		<div className="mt-4 border border-gray-200 p-6 text-center">
			<h4 className="mb-3 text-2xl font-bold text-gray-900 xs:text-3xl">Showing 200 of {total} holdings</h4>
			<div className="text-xl">Subscribe to see the full list</div>
			<Button text="Start Free Trial" url="/pro/" className="w-44" id="tag-upgr-holdings-below" />
		</div>
	)
}
