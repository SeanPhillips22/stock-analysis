import { PageConfig } from 'types/PageConfig'
import { TableExport } from './TableExport'
import { FilterObject } from 'types/Filters'
import { TableFilter } from './TableFilter'
import { TableColumns } from './TableColumns'
import { TableResults } from './TableResults'
import { TableRange } from './TableRange'

type Props = {
	config: PageConfig
	filter: FilterObject
	tableId: string
}

export function TableControls({ config, filter, tableId }: Props) {
	return (
		<div className="controls">
			{/* Table Title */}
			<h2>{config.title}</h2>

			{/* Time Range */}
			{config.controls?.range && <TableRange />}

			{/* Results Count */}
			{config.controls?.results && <TableResults />}

			{/* Search Filter */}
			{config.controls?.filter && <TableFilter filter={filter} />}

			{/* Export Button */}
			{config.controls?.export && <TableExport tableId={tableId} />}

			{/* Select Columns */}
			{config.controls?.columns && <TableColumns />}
		</div>
	)
}
