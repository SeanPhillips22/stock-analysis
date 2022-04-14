import { useAuthState } from 'auth/useAuthState'
import { ExportItem } from './ExportItem'
import { ExportItemRestricted } from './ExportItemRestricted'

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

export function ExportButtons({ buttons = Buttons, tableId, fileName, data }: Props) {
	const { isPro } = useAuthState()

	return (
		<>
			{buttons &&
				buttons.map(button =>
					!isPro ? (
						<ExportItemRestricted key={button.title} title={button.title} type={button.type} />
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
		</>
	)
}
