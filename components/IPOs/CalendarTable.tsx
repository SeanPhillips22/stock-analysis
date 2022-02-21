import {
	Column,
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy
} from 'react-table'
import { IpoUpcoming } from 'types/Ipos'
import 'regenerator-runtime/runtime'
import { Export } from 'components/Controls/Export'
import { Filter } from 'components/Controls//Filter'
import { SortUpIcon } from 'components/Icons/SortUp'
import { SortDownIcon } from 'components/Icons/SortDown'
import { formatCells } from 'functions/tables/formatCells'

const columns: Column[] = [
	{
		Header: 'IPO Date',
		accessor: 'date',
		Cell: (props: any) => {
			if (props.value) {
				if (props.data[props.row.id].weekOf)
					return <span className="weekof">{props.value}</span>
			}
			return props.value
		},
		sortType: (a, b) => {
			const ad = new Date(a.values.date).getTime()
			const bd = new Date(b.values.date).getTime()
			if (ad < bd) return 1
			if (ad > bd) return -1
			else return 0
		},
		sortInverted: true
	},
	{
		Header: 'Symbol',
		accessor: 'symbol',
		Cell: (props: any) => formatCells('linkSymbol', props)
	},
	{
		Header: 'Company Name',
		accessor: 'name',
		sortType: (a, b) => {
			const ad = a.values.name.toUpperCase()
			const bd = b.values.name.toUpperCase()
			if (ad < bd) {
				return 1
			}
			if (ad > bd) {
				return -1
			} else {
				return 0
			}
		},
		sortInverted: true
	},
	{
		Header: 'Exchange',
		accessor: 'exchange'
	},
	{
		Header: 'Price Range',
		accessor: 'price'
	},
	{
		Header: 'Shares',
		accessor: 'shares',
		Cell: (props: any) =>
			props.value === 'n/a' ? 'n/a' : formatCells('integer', props)
	}
]

const NoIpos = ({ title }: { title: string }) => {
	switch (title) {
		case 'This Week': {
			return (
				<div>
					<h2 className="hh2 mb-2 font-semibold text-gray-800">{`${title} · 0 IPOs`}</h2>
					<p className="text-lg text-gray-900">
						There are no upcoming IPOs remaining for this week.
					</p>
				</div>
			)
		}

		case 'Next Week': {
			return (
				<div>
					<h2 className="hh2 font-semibold text-gray-800">{`${title} · 0 IPOs`}</h2>
					<p className="text-lg text-gray-900">
						There are no IPOs scheduled for next week.
					</p>
				</div>
			)
		}

		default:
			return null
	}
}

interface Props {
	title: string
	data: IpoUpcoming[]
	tableId: string
	border?: boolean
	filter?: boolean
}

export function CalendarTable({ title, data, tableId, border, filter }: Props) {
	const initialState = !data[0]?.date ? { hiddenColumns: ['date'] } : {}

	const tableInstance = useTable(
		{ columns, data, initialState },
		useGlobalFilter,
		useSortBy
	)
	const {
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state: { globalFilter }
	} = tableInstance

	const count = data.length

	if (count === 0) {
		return <NoIpos title={title} />
	}

	return (
		<div>
			<div
				className={`flex items-end space-x-6 mb-1.5${
					border ? ' border-t pt-1.5' : ''
				}`}
			>
				<h2 className="hh2 mb-0 mr-auto text-[1.4rem] font-semibold text-gray-800 lg:mb-0.5">
					{title === 'This Week' || title === 'Next Week'
						? `${title} · ${count} IPOs`
						: title}
				</h2>
				<div className="hidden sm:block">
					<Export tableId={tableId} />
				</div>
				{filter && (
					<div className="hidden md:block">
						<Filter
							useAsyncDebounce={useAsyncDebounce}
							globalFilter={globalFilter}
							setGlobalFilter={setGlobalFilter}
						/>
					</div>
				)}
			</div>
			<div className="overflow-x-auto">
				<table className="ipotable calendar" id={tableId}>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										{...column.getSortByToggleProps({
											title: `Sort by: ${column.Header}`
										})}
									>
										<span className="inline-flex flex-row items-center">
											{column.render('Header')}

											{column.isSorted ? (
												column.isSortedDesc ? (
													<SortDownIcon classes="h-5 w-5 text-gray-800" />
												) : (
													<SortUpIcon classes="h-5 w-5 text-gray-800" />
												)
											) : (
												''
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{rows.map((row, index) => {
							prepareRow(row)
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
