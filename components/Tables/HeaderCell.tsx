import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnSort } from './ColumnSort'

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column }: { column: any }) {
	let { Header, id }: { Header: any; id: DataId } = column
	let { format } = DataPoints[id]

	let css =
		format && ['string', 'linkSymbol'].includes(format)
			? 'head-left'
			: 'head-right'

	return (
		<th
			{...column.getSortByToggleProps({
				title: `Sort by: ${Header}`
			})}
		>
			<div className={css}>
				{column.render('Header')}
				<ColumnSort column={column} />
			</div>
		</th>
	)
}
