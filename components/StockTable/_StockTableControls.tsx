import { TableExport } from './Controls/TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './Controls/TableFilter'
import { TableColumns } from './Controls/TableColumns'
import { TableResults } from './Controls/TableResults'
import { TableRange } from './Controls/TableRange'
import { usePageContext } from 'components/Markets/PageContext'
import { TableTimestamp } from './Controls/TableTimestamp'
import { TableTitle } from './Controls/TableTitle'
import { TableMoverType } from './Controls/TableMoverType'
import { useTableContext } from './TableContext'

type Props = {
	filter: FilterObject
}

export function StockTableControls({ filter }: Props) {
	const { fixed, tableId, title } = useTableContext()
	const { updated } = usePageContext()

	return (
		<div className="controls groups">
			<div className="title-group">
				{/* Table Title */}
				<TableTitle title={title} tableId={tableId} />
				{/* Updated timestamp*/}
				{updated && <TableTimestamp />}
			</div>

			{/* Button group */}
			<div className="btn-group">
				{/* MoverType Select */}
				{fixed.controls?.moverType && <TableMoverType />}
				{/* Time Range */}
				{fixed.controls?.range && <TableRange />}
				{/* Search Filter */}
				{fixed.controls?.filter && <TableFilter filter={filter} />}
				{/* Results Count */}
				{fixed.controls?.results && <TableResults />}
				{/* Export Button */}
				{fixed.controls?.export && <TableExport tableId={tableId} />}
				{/* Select Columns */}
				{fixed.controls?.columns && <TableColumns />}
			</div>
		</div>
	)
}
