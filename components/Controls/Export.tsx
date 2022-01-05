import { ExportItem } from './Export/ExportItem'
import { ExportItemRestricted } from './Export/ExportItemRestricted'
import { useAuthState } from 'hooks/useAuthState'
import { Dropdown } from '../Dropdown/_Dropdown'

type Button = {
	title: string
	type: 'csv' | 'xlsx'
	restricted: boolean
	active?: boolean
	data?: any
}

type Props = {
	buttons: Button[]
	tableId: string
	fileName?: string
}

export function Export({ buttons, tableId, fileName }: Props) {
	const { isPro } = useAuthState()

	return (
		<Dropdown title="Export">
			{buttons &&
				buttons.map((button, index) =>
					button.restricted && !isPro ? (
						<ExportItemRestricted
							key={index}
							title={button.title}
							type={button.type}
						/>
					) : (
						<ExportItem
							key={index}
							title={button.title}
							type={button.type}
							data={tableId}
							fileName={fileName}
							returnData={button.data}
						/>
					)
				)}
		</Dropdown>
	)
}
