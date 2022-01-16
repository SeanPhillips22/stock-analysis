import { DataPoints } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnSort } from './ColumnSort'
import { useSortState } from 'hooks/useSortState'
import { SortProps } from 'components/StockScreener/screener.types'

type Props = {
	column: any
	sortProps: SortProps
}

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column, sortProps }: Props) {
	const { updateSortState } = useSortState(sortProps)
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
			<div className={css} onClick={() => updateSortState(column)}>
				{column.render('Header')}
				<ColumnSort column={column} />
			</div>
		</th>
	)
}
