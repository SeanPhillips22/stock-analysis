import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'
import { SelectRange } from './SelectRange'
import { SelectStatement } from './SelectStatement'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

export function FinancialsNavigation({ info, statement, range }: Props) {
	return (
		<div className="finnav-wrap">
			<SelectStatement info={info} statement={statement} range={range} />
			<SelectRange info={info} statement={statement} range={range} />
		</div>
	)
}
