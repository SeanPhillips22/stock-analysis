import { Button } from 'components/Buttons/Button'
import { useAuthState } from 'hooks/useAuthState'

interface Props {
	count: number
	fullCount: number
	title: string
}

export const ActionsPaywall = ({ count, fullCount, title }: Props) => {
	const { isPro } = useAuthState()

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
			/>
		</div>
	)
}
