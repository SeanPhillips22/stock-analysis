import { useTableContext } from '../TableContext'

type Props = {
	title: string
	active?: string
}

export function TableTitle({ title, active }: Props) {
	const { dynamic } = useTableContext()
	const { main, sortDirection } = dynamic

	let printTitle = title

	// Change the title from "Today" if a different time range is selected
	if ((active === 'gainers' || active === 'losers') && main !== 'change') {
		printTitle = printTitle.replace(
			/Today/,
			main.replace(/ch/, '').toUpperCase()
		)
	}

	if (active === 'premarket' && sortDirection === 'asc') {
		printTitle = printTitle.replace('Gainers', 'Losers')
	}

	return <h2>{printTitle}</h2>
}
