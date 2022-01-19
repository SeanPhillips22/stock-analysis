import { stockTableState } from '../stockTableState'

type Props = {
	title: string
	active?: string
}

export function TableTitle({ title, active }: Props) {
	const main = stockTableState(state => state.main)
	const sort = stockTableState(state => state.sort)
	let printTitle = title

	// Change the title from "Today" if a different time range is selected
	if ((active === 'gainers' || active === 'losers') && main !== 'change') {
		printTitle = printTitle.replace(
			/Today/,
			main.replace(/ch/, '').toUpperCase()
		)
	}

	if (active === 'premarket' && sort === 'asc') {
		printTitle = printTitle.replace('Gainers', 'Losers')
	}

	return <h2>{printTitle}</h2>
}
