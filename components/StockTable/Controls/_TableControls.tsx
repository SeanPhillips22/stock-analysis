import { TableExport } from './TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './TableFilter'
import { TableColumns } from './TableColumns'
import { TableResults } from './TableResults'
import { TableRange } from './TableRange'
import { useContext } from 'react'
import { TableContext } from 'components/StockTable/TableContext'
import { TableTimestamp } from './TableTimestamp'

type Props = {
	filter: FilterObject
	tableId: string
}

export function TableControls({ filter, tableId }: Props) {
	const c = useContext(TableContext)

	return (
		<div className="controls groups">
			<div className="title-group">
				{/* Table Title */}
				<h2>{c?.config.title}</h2>
				{/* Updated timestamp*/}
				{c?.updated && <TableTimestamp timestamp={c?.updated} />}
			</div>

			{/* Button group */}
			<div className="btn-group">
				{/* Time Range */}
				{c?.config.controls?.range && <TableRange />}
				{/* Results Count */}
				{c?.config.controls?.results && <TableResults />}
				{/* Search Filter */}
				{c?.config.controls?.filter && <TableFilter filter={filter} />}
				{/* Export Button */}
				{c?.config.controls?.export && <TableExport tableId={tableId} />}
				{/* Select Columns */}
				{c?.config.controls?.columns && <TableColumns />}
			</div>
		</div>
	)
}
