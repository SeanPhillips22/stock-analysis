import { TableTimestamp } from 'types/Tables'

type Props = {
	timestamp: TableTimestamp
}

export function TableTimestamp({ timestamp }: Props) {
	return (
		<div className="controls-timestamp">
			<span>Updated</span> {timestamp.premarket}
		</div>
	)
}
