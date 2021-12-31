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
		<div className="hidden sm:flex sm:flex-row sm:space-x-2 pb-2">
			<Export
				title="Export"
				buttons={[
					{ title: 'Export to Excel', type: 'xlsx', restricted: true },
					{ title: 'Export to CSV', type: 'csv', restricted: true }
				]}
				tableId="financial-table"
				fileName={`${symbol}-${statement}-${range}`}
			/>
			<div>
				<button
					className="bg-gray-100 border border-gray-300 h-12 rounded-sm hover:bg-white px-3"
					onClick={() => clickLeftRight()}
					id="tag-feat-fin-leftright"
				>
					<LeftRightIcon classes="h-9 w-9 pointer-events-none" />
				</button>
			</div>
		</div>
	)
}
