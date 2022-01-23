import { usePageContext } from '../PageContext'

export function TableTimestamp() {
	const { page, updated } = usePageContext()

	return (
		<div className="controls-timestamp">
			<span>Updated</span>{' '}
			{page.active === 'premarket' ? updated.premarket : updated.last}
		</div>
	)
}
