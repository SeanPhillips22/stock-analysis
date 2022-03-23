import { Export } from 'components/Controls/Export'
import { cn } from 'functions/helpers/classNames'

type Props = {
	tableId: string
	hideOnMobile?: boolean
}

export function TableExport({ tableId, hideOnMobile }: Props) {
	return (
		<div className={cn('controls-export', hideOnMobile ? 'hidden md:block' : '')}>
			<Export tableId={tableId} />
		</div>
	)
}
