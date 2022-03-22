import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { useRouter } from 'next/router'

interface ExportItemProps {
	title: string
	type: string
}

export default function Restricted({ title, type }: ExportItemProps) {
	const router = useRouter()
	const id = `tag-upgr-controls-export-${title === 'Bulk Export' ? 'bulk' : type.toLowerCase()}`

	return (
		<div
			className="dd"
			onClick={() => router.push('/pro/')}
			title="This feature is available for Pro members."
			id={id}
		>
			{title}
			<LockClosedIcon className="lock-icon" aria-hidden="true" />
		</div>
	)
}
