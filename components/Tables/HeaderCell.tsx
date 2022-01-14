import { ColumnSort } from './ColumnSort'

/**
 * Render a Header cell element with sort functionality
 */
export function HeaderCell({ column }: { column: any }) {
	let { Header } = column

	let css =
		Header === 'Symbol' || Header === 'Name'
			? 'inline-flex flex-row items-center'
			: 'flex flex-row items-center justify-end'

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
