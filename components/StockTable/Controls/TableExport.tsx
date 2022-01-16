import { Export } from 'components/Controls/Export'

type Props = {
	tableId: string
}

export function TableExport({ tableId }: Props) {
	return (
		<div className="hidden md:block">
			<Export
				buttons={[
					{
						title: 'Export to Excel',
						type: 'xlsx',
						restricted: true
					},
					{ title: 'Export to CSV', type: 'csv', restricted: true }
				]}
				tableId={tableId}
			/>
		</div>
	)
}
