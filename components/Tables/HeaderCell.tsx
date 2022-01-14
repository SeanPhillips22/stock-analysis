import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnSort } from './ColumnSort'

type Props = {
	column: {
		Header: string
		id: DataId
		getSortByToggleProps: any
		render: any
	}
}

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column }: Props) {
	let { Header, id } = column
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
