import { useState } from 'react'
import { DataId } from 'types/DataId'

type Props = {
	id: DataId
	name: string
	checked: boolean
	toggle: (id: DataId) => void
}

/**
 * A checkbox that activates/deactivates a column for the stock table
 */
export function ColumnItem({ id, name, checked, toggle }: Props) {
	const [check, setCheck] = useState(checked)

	return (
		<div className="column-items">
			<input
				type="checkbox"
				checked={check}
				onChange={() => {
					toggle(id)
					setCheck(!check)
				}}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
