import { DataId } from 'types/Data'

type Props = {
	id: DataId
	name?: string
}

/**
 * A checkbox that activates/deactivates a column for the stock table
 */
export function ColumnItem({ id, name }: Props) {
	return (
		<div className="column-items">
			<input type="checkbox" />
			<label htmlFor={id}>{name || id}</label>
		</div>
	)
}
