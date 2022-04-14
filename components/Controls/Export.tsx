import { useAuthState } from 'auth/useAuthState'
import { useEvent } from 'hooks/useEvent'
import { Dropdown } from '../Dropdown/_Dropdown'
import { ExportButtons } from './Export/ExportButtons'

type Button = {
	title: string
	type: 'csv' | 'xlsx'
	data?: any
	bulkData?: any
}

type Props = {
	tableId?: string
	buttons?: Button[]
	fileName?: string
	data?: any
}

export function Export({ buttons, tableId, fileName, data }: Props) {
	const { isPro } = useAuthState()
	const { event } = useEvent()

	return (
		<Dropdown
			title="Export"
			id={`tag-feat-export${isPro ? '-pro' : '-notpro'}`}
			onClick={() => event('Export_Button', { isPro })}
		>
			<ExportButtons buttons={buttons} tableId={tableId} fileName={fileName} data={data} />
		</Dropdown>
	)
}
