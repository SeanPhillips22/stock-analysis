import { LeftRightIcon } from 'components/Icons/LeftRight'
import { financialsState } from 'state/financialsState'
import { Export } from 'components/Controls/Export'
import { SelectFormat } from './SelectFormat'
import { ShowTrailing } from './ShowTrailing'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

export function FinancialsControls({ info, statement, range }: Props) {
	const reversed = financialsState((state) => state.reversed)
	const toggleReversed = financialsState((state) => state.toggleReversed)
	const controls = financialsState((state) => state.controls)

	return (
		<div className={controls ? 'finctrl vis' : 'finctrl'}>
			<button
				className={reversed ? 'controls-btn active' : 'controls-btn'}
				onClick={() => toggleReversed()}
				id="tag-feat-fin-leftright"
				title="Switch order of columns"
			>
				<LeftRightIcon classes="w-4 bp:w-5 h-4 bp:h-5 pointer-events-none" />
			</button>
			{!info.exceptions.hideTTM && (
				<ShowTrailing range={range} statement={statement} />
			)}
			<SelectFormat />
			<Export
				buttons={[
					{ title: 'Export to Excel', type: 'xlsx', restricted: true },
					{ title: 'Export to CSV', type: 'csv', restricted: true }
				]}
				tableId="financial-table"
				fileName={`${info.symbol}-${statement}-${range}`}
			/>
		</div>
	)
}
