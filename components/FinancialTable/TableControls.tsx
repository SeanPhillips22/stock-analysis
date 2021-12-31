import { LeftRightIcon } from 'components/Icons/LeftRight'
import { financialsState } from 'state/financialsState'
import { Export } from 'components/Controls/Export'

type Props = {
	symbol: string
	statement: string
	range: string
}

export function TableControls({ symbol, statement, range }: Props) {
	const leftRight = financialsState((state) => state.leftRight)
	const setLeftRight = financialsState((state) => state.setLeftRight)

	const clickLeftRight = () => {
		if (leftRight === 'left') {
			setLeftRight('right')
		} else {
			setLeftRight('left')
		}
	}

	return (
		<div className="hidden sm:flex sm:space-x-2 pb-2">
			<Export
				buttons={[
					{ title: 'Export to Excel', type: 'xlsx', restricted: true },
					{ title: 'Export to CSV', type: 'csv', restricted: true }
				]}
				tableId="financial-table"
				fileName={`${symbol}-${statement}-${range}`}
			/>
			<button
				className="controls-btn"
				onClick={() => clickLeftRight()}
				id="tag-feat-fin-leftright"
				title="Switch order of columns"
			>
				<LeftRightIcon classes="h-5 w-5 pointer-events-none" />
			</button>
		</div>
	)
}
