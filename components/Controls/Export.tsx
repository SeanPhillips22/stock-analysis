import { useAuthState } from 'hooks/useAuthState'
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

	return (
		<Dropdown title="Export" id={`tag-feat-export${isPro ? '-pro' : '-notpro'}`}>
			<ExportButtons buttons={buttons} tableId={tableId} fileName={fileName} data={data} />
		</Dropdown>
	)
}
