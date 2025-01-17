import { usePageContext } from 'components/Markets/PageContext'
import { useTableContext } from '../TableContext'

type Props = {
	title?: string
	tableId?: string
}

export function TableTitle({ title, tableId }: Props) {
	const { dynamic } = useTableContext()
	const { main, sortDirection } = dynamic
	const { page, count } = usePageContext()

	let printTitle = title || `${count} ${page.tableTitleObject || 'Stocks'}`

	// Change the title from "Today" if a different time range is selected
	if ((tableId === 'gainers' || tableId === 'losers') && main !== 'change') {
		printTitle = printTitle.replace(/Today/, main.replace(/ch/, '').toUpperCase())
	}

	if (tableId === 'premarket' && sortDirection === 'asc') {
		printTitle = printTitle.replace('Gainers', 'Losers')
	}

	switch (page?.headingType) {
		case 'h1':
			return <h1>{printTitle}</h1>

		case 'div':
			return <div className="head">{printTitle}</div>

		default:
			return <h2>{printTitle}</h2>
	}
}
