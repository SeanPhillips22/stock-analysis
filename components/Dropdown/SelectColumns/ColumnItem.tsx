import { stockTableState } from 'components/StockTable/stockTableState'
import { useState } from 'react'
import { DataId } from 'types/Data'

type Props = {
	id: DataId
	name: string
	checked: boolean
}

/**
 * A checkbox that activates/deactivates a column for the stock table
 */
export function ColumnItem({ id, name, checked }: Props) {
	const [check, setCheck] = useState(checked)
	const toggleColumn = stockTableState((state) => state.toggleColumn)

	return (
		<div className="column-items">
			<input
				type="checkbox"
				checked={check}
				onChange={() => {
					toggleColumn(id)
					setCheck(!check)
				}}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
