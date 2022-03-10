import { usePageContext } from 'components/Markets/PageContext'
import { useTableContext } from '../TableContext'

type Props = {
	title: string
	tableId?: string
}

export function TableTitle({ title, tableId }: Props) {
	const { dynamic } = useTableContext()
	const { main, sortDirection } = dynamic
	const { page } = usePageContext()

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

	return page?.heading === 'h1' ? <h1>{printTitle}</h1> : <h2>{printTitle}</h2>
}
