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
		<div className="border border-gray-200 mt-7 p-6 text-center">
			<h4 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-3">
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
