import { useContext } from 'react'
import { TableTimestamp } from 'types/Tables'
import { TableContext } from '../TableContext'

type Props = {
	timestamp: TableTimestamp
}

export function TableTimestamp({ timestamp }: Props) {
	const c = useContext(TableContext)

	return (
		<div className="controls-timestamp">
			<span>Updated</span>{' '}
			{c.config.active === 'premarket'
				? timestamp.premarket
				: timestamp.last}
		</div>
	)
}
