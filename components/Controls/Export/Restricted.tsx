import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { useEvent } from 'hooks/useEvent'
import { useRouter } from 'next/router'

interface ExportItemProps {
	title: string
	type: string
}

export default function Restricted({ title, type }: ExportItemProps) {
	const router = useRouter()
	const { event } = useEvent()
	const id = `tag-upgr-controls-export-${title === 'Bulk Export' ? 'bulk' : type.toLowerCase()}`

	return (
		<div
			className="dd"
			onClick={() => {
				event('Free_Trial_Click', { location: 'Export_Menu', type: title })
				router.push('/pro/')
			}}
			title="This feature is available for Pro members."
			id={id}
		>
			{title}
			<LockClosedIcon className="lock-icon" aria-hidden="true" />
		</div>
	)
}
