import { LeftRightIcon } from 'components/Icons/LeftRight'
import { financialsState } from 'state/financialsState'
import { Export } from 'components/Controls/Export'
import { SelectFormat } from './SelectFormat'
import { ShowTrailing } from './ShowTrailing'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'
import { useFetchBulk } from './Export/useFetchBulk'
import { useState } from 'react'
import { useEvent } from 'hooks/useEvent'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

export function FinancialsControls({ info, statement, range }: Props) {
	const reversed = financialsState(state => state.reversed)
	const toggleReversed = financialsState(state => state.toggleReversed)
	const controls = financialsState(state => state.controls)
	const [fetchBulk, setFetchBulk] = useState(false)
	const data = useFetchBulk(info.symbol, fetchBulk)
	const { event } = useEvent()

	return (
		<div className={controls ? 'finctrl vis' : 'finctrl'}>
			<button
				className={reversed ? 'controls-btn active' : 'controls-btn'}
				onClick={() => {
					toggleReversed()
					event('Financial_Controls', { type: 'LeftRight' })
				}}
				id="tag-feat-fin-leftright"
				title="Switch order of columns"
			>
				<LeftRightIcon classes="w-4 bp:w-5 h-4 bp:h-5 pointer-events-none" />
			</button>
			{!info.exceptions.hideTTM && <ShowTrailing range={range} statement={statement} />}
			<SelectFormat />
			<div
				onMouseEnter={() => {
					setFetchBulk(true)
				}}
				onTouchStart={() => {
					setFetchBulk(true)
				}}
			>
				<Export
					buttons={[
						{ title: 'Export to Excel', type: 'xlsx' },
						{ title: 'Export to CSV', type: 'csv' },
						{
							title: 'Bulk Export',
							type: 'xlsx',
							bulkData: data
						}
					]}
					tableId="financial-table"
					fileName={`${info.symbol}-${statement}-${range}`}
				/>
			</div>
		</div>
	)
}
