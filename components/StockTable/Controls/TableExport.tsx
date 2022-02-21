import { Export } from 'components/Controls/Export'

type Props = {
	tableId: string
}

export function TableExport({ tableId }: Props) {
	return (
		<div className="controls-export">
			<Export tableId={tableId} />
		</div>
	)
}
