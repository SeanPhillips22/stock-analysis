import { TableExport } from './Controls/TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './Controls/TableFilter'
import { TableColumns } from './Controls/TableColumns'
import { TableResults } from './Controls/TableResults'
import { usePageContext } from 'components/Markets/PageContext'
import { TableTimestamp } from './Controls/TableTimestamp'
import { TableTitle } from './Controls/TableTitle'
import { useTableContext } from './TableContext'
import { ToggleVisible } from './Controls/ToggleVisible'
import { cn } from 'functions/helpers/classNames'
import { OptionsMenu } from './Controls/OptionsMenu'

type Props = {
	filter: FilterObject
}

export function StockTableControls({ filter }: Props) {
	const { fixed, tableId, title, dynamic } = useTableContext()
	const { updated } = usePageContext()

	return (
		<div className="controls groups">
			<div className="title-group">
				{/* Table Title */}
				<TableTitle title={title} tableId={tableId} />
				{/* Updated timestamp*/}
				{updated && <TableTimestamp />}
				{/* The toggle to show/hide controls on mobile */}
				<ToggleVisible />
			</div>

			{/* Button group */}
			<div className={cn('btn-group', dynamic.showOnMobile ? 'block' : 'hidem')}>
				{/* Search Filter */}
				{fixed.controls?.filter && <TableFilter filter={filter} />}
				{/* Results Count */}
				{fixed.controls?.results && <TableResults />}
				{/* Export Button */}
				{fixed.controls?.export && <TableExport tableId={tableId} />}
				{/* Select Columns */}
				{fixed.controls?.columns && <TableColumns />}
				{/* Options Menu*/}
				{fixed.controls?.options && <OptionsMenu />}
			</div>
		</div>
	)
}
