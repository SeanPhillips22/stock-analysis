import { financialsState } from 'state/financialsState'
import { Range, Statement } from 'types/Financials'

type Props = {
	range: Range
	statement: Statement
}

export function ShowTrailing({ range, statement }: Props) {
	const trailing = financialsState((state) => state.trailing)
	const toggleTrailing = financialsState((state) => state.toggleTrailing)
	const current = financialsState((state) => state.current)
	const toggleCurrent = financialsState((state) => state.toggleCurrent)

	if (range === 'annual' && statement !== 'ratios') {
		return (
			<button
				className={trailing ? 'controls-btn active' : 'controls-btn'}
				title="Include most recent values"
				onClick={toggleTrailing}
			>
				TTM
			</button>
		)
	}

	if (statement === 'ratios') {
		return (
			<button
				className={current ? 'controls-btn active' : 'controls-btn'}
				title="Include most recent values"
				onClick={toggleCurrent}
			>
				Current
			</button>
		)
	}

	return null
}
