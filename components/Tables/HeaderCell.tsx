import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnSort } from './ColumnSort'

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column }: { column: any }) {
	let { id }: { id: DataId } = column
	let { format, name } = DataPoints[id]

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
			<div className={css}>
				{column.render('Header')}
				<ColumnSort column={column} />
			</div>
		</th>
	)
}
