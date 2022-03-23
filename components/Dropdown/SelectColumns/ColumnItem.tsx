import { cn } from 'functions/helpers/classNames'
import { useState } from 'react'
import { DataId } from 'types/DataId'

type Props = {
	id: DataId
	name: string
	checked: boolean
	toggle: (id: DataId) => void
	fixed?: boolean
}

/**
 * A checkbox that activates/deactivates a column for the stock table
 */
export function ColumnItem({ id, name, checked, toggle, fixed }: Props) {
	const [check, setCheck] = useState(checked)

	return (
		<div
			className={cn('column-items', fixed ? 'fixed-option' : '')}
			title={fixed ? 'This column cannot be unchecked' : ''}
		>
			<input
				type="checkbox"
				checked={check}
				onChange={() => {
					toggle(id)
					setCheck(!check)
				}}
				disabled={fixed}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
