import { financialsState } from 'state/financialsState'
import { Range, Statement } from 'types/Financials'

type Props = {
	range: Range
	statement: Statement
}

export function ShowTrailing({ range, statement }: Props) {
	const trailing = financialsState((state) => state.trailing)
	const toggleTrailing = financialsState((state) => state.toggleTrailing)

	if (range !== 'annual' && statement !== 'ratios') return null

	return (
		<button
			className={trailing ? 'controls-btn active' : 'controls-btn'}
			title="Include most recent values"
			onClick={toggleTrailing}
		>
			{statement === 'ratios' ? 'Current' : 'TTM'}
		</button>
	)
}
