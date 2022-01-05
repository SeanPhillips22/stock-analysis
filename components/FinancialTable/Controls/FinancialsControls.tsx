import { LeftRightIcon } from 'components/Icons/LeftRight'
import { financialsState } from 'state/financialsState'
import { Export } from 'components/Controls/Export'
import { SelectFormat } from './SelectFormat'
import { ShowTrailing } from './ShowTrailing'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'
import { useFetchBulk } from './Export/useFetchBulk'
import { useEffect, useState } from 'react'
import { useAuth } from 'hooks/useAuth'
import { buildReturnArray } from './Export/buildReturnArray'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

export function FinancialsControls({ info, statement, range }: Props) {
	const reversed = financialsState((state) => state.reversed)
	const toggleReversed = financialsState((state) => state.toggleReversed)
	const controls = financialsState((state) => state.controls)
	const [fullData, setFullData] = useState<any>([])
	const [fetched, setFetched] = useState(false)
	const { checked, isPro } = useAuth()
	const fetchBulkFinancials = useFetchBulk()

	useEffect(() => {
		async function fetchFull() {
			setFetched(true)
			let d = await fetchBulkFinancials(info.symbol)
			let dt = buildReturnArray(d.data)

			setFullData(dt)
		}

		if (checked && isPro && !fetched) {
			fetchFull()
		}
	}, [checked, fetchBulkFinancials, fetched, info.symbol, isPro])

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
					{ title: 'Export to CSV', type: 'csv', restricted: true },
					{
						title: 'Bulk Export',
						type: 'xlsx',
						restricted: true,
						data: fullData
					}
				]}
				tableId="financial-table"
				fileName={`${info.symbol}-${statement}-${range}`}
			/>
		</div>
	)
}
