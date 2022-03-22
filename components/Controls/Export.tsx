import { ExportItem } from './Export/ExportItem'
import { ExportItemRestricted } from './Export/ExportItemRestricted'
import { useAuthState } from 'hooks/useAuthState'
import { Dropdown } from '../Dropdown/_Dropdown'

type Button = {
	title: string
	type: 'csv' | 'xlsx'
	data?: any
	bulkData?: any
}

const Buttons: Button[] = [
	{ title: 'Export to Excel', type: 'xlsx' },
	{ title: 'Export to CSV', type: 'csv' }
]

type Props = {
	tableId?: string
	buttons?: Button[]
	fileName?: string
	data?: any
}

export function Export({ buttons = Buttons, tableId, fileName, data }: Props) {
	const { isPro } = useAuthState()

	return (
		<Dropdown title="Export" id={`tag-feat-export${isPro ? '-pro' : '-notpro'}`}>
			{buttons &&
				buttons.map(button =>
					!isPro ? (
						<ExportItemRestricted key={button.type} title={button.title} type={button.type} />
					) : (
						<ExportItem
							key={button.title}
							title={button.title}
							type={button.type}
							tableId={tableId}
							data={data}
							fileName={fileName}
							bulkData={button.bulkData}
						/>
					)
				)}
		</Dropdown>
	)
}
