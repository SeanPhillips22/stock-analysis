import { stockTableState } from '../stockTableState'

type Props = {
	title: string
	active?: string
}

export function TableTitle({ title, active }: Props) {
	const main = stockTableState(state => state.main)
	let printTitle = title

	// Change the title from "Today" if a different time range is selected
	if ((active === 'gainers' || active === 'losers') && main !== 'change') {
		printTitle = printTitle.replace(
			/Today/,
			main.replace(/ch/, '').toUpperCase()
		)
	}

	return <h2>{printTitle}</h2>
}
