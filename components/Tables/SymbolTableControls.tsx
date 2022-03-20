import { FilterValue } from 'react-table'
import { Export } from 'components/Controls/Export'
import { Filter } from 'components/Controls/Filter'

type Props = {
	count: number
	title: string
	useAsyncDebounce: (value: any, wait: number) => any
	globalFilter: any
	setGlobalFilter: (filterValue: FilterValue) => void
	tableId: string
	append?: string
	setFilterState?: (filterValue: FilterValue) => void
	data: any
}

export const SymbolTableControls = ({
	count,
	title,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	tableId,
	setFilterState,
	append = '',
	data
}: Props) => {
	return (
		<div className="controls space-x-1 xs:space-x-2">
			<h2 className="mr-1 whitespace-nowrap text-xl font-semibold xs:mr-2 bp:mr-3 bp:text-2xl sm:mr-auto">
				{`${append && append + ' '}${count} ${title}`}
			</h2>
			<Export tableId={tableId} data={data} fileName={title === 'Stocks' ? 'stocks-list' : 'etfs-list'} />
			<Filter
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				setFilterState={setFilterState}
			/>
		</div>
	)
}
