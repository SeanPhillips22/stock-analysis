import { stockTableState } from 'components/StockTable/stockTableState'
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
	const toggleColumn = stockTableState((state) => state.toggleColumn)

	return (
		<div className="column-items">
			<input
				type="checkbox"
				checked={checked}
				onChange={() => toggleColumn(id)}
			/>
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
