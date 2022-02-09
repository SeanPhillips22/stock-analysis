import { useTableContext } from '../TableContext'

type Props = {
	title: string
	tableId?: string
}

export function TableTitle({ title, tableId }: Props) {
	const { dynamic } = useTableContext()
	const { main, sortDirection } = dynamic

	let printTitle = title

	// Change the title from "Today" if a different time range is selected
	if ((tableId === 'gainers' || tableId === 'losers') && main !== 'change') {
		printTitle = printTitle.replace(
			/Today/,
			main.replace(/ch/, '').toUpperCase()
		)
	}

	if (tableId === 'premarket' && sortDirection === 'asc') {
		printTitle = printTitle.replace('Gainers', 'Losers')
	}

	return <h2>{printTitle}</h2>
}
