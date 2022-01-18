import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnSort } from './ColumnSort'

type Props = {
	column: any
	updateSort: (column: any) => void
}

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column, updateSort }: Props) {
	const { id }: { id: DataId } = column
	const { format, name } = DataPoints[id]

	let css =
		format && ['string', 'linkSymbol'].includes(format)
			? 'head-left'
			: 'head-right'

	return (
		<th
			{...column.getSortByToggleProps({
				title: name
			})}
		>
			<div className={css} onClick={() => updateSort(column)}>
				{column.render('Header')}
				<ColumnSort column={column} />
			</div>
		</th>
	)
}
