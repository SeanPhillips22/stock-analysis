import { TableExport } from './TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './TableFilter'
import { TableColumns } from './TableColumns'
import { TableResults } from './TableResults'
import { TableRange } from './TableRange'
import { useContext } from 'react'
import { TableContext } from 'components/StockTable/TableContext'

type Props = {
	filter: FilterObject
	tableId: string
}

export function TableControls({ filter, tableId }: Props) {
	const context = useContext(TableContext)

	return (
		<div className="controls">
			{/* Table Title */}
			<h2>{context?.config.title}</h2>
			{context?.updated.last}

			{/* Time Range */}
			{context?.config.controls?.range && <TableRange />}

			{/* Results Count */}
			{context?.config.controls?.results && <TableResults />}

			{/* Search Filter */}
			{context?.config.controls?.filter && <TableFilter filter={filter} />}

			{/* Export Button */}
			{context?.config.controls?.export && <TableExport tableId={tableId} />}

			{/* Select Columns */}
			{context?.config.controls?.columns && <TableColumns />}
		</div>
	)
}
