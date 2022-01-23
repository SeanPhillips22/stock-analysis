import { TableExport } from './Controls/TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './Controls/TableFilter'
import { TableColumns } from './Controls/TableColumns'
import { TableResults } from './Controls/TableResults'
import { TableRange } from './Controls/TableRange'
import { usePageContext } from 'components/StockTable/PageContext'
import { TableTimestamp } from './Controls/TableTimestamp'
import { TableTitle } from './Controls/TableTitle'
import { TableMoverType } from './Controls/TableMoverType'

type Props = {
	filter: FilterObject
	tableId: string
}

export function StockTableControls({ filter, tableId }: Props) {
	const { page, updated } = usePageContext()

	return (
		<div className="controls groups">
			<div className="title-group">
				{/* Table Title */}
				<TableTitle title={page.title} active={page.active} />
				{/* Updated timestamp*/}
				{updated && <TableTimestamp />}
			</div>

			{/* Button group */}
			<div className="btn-group">
				{/* MoverType Select */}
				{page.controls?.moverType && <TableMoverType />}
				{/* Time Range */}
				{page.controls?.range && <TableRange />}
				{/* Search Filter */}
				{page.controls?.filter && <TableFilter filter={filter} />}
				{/* Results Count */}
				{page.controls?.results && <TableResults />}
				{/* Export Button */}
				{page.controls?.export && <TableExport tableId={tableId} />}
				{/* Select Columns */}
				{page.controls?.columns && <TableColumns />}
			</div>
		</div>
	)
}
