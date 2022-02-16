import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ChevronUpIcon } from 'components/Icons/ChevronUpIcon'
import { capitalize } from 'functions/helpers/capitalize'
import { financialsState } from 'state/financialsState'
import { Range } from 'types/Financials'
import { Info } from 'types/Info'
import { getDivider } from './FinancialTable.functions'

type Props = {
	info: Info
	statement: string
	range: Range
}

export function TableTitle({ info, statement, range }: Props) {
	const rangeTitle = range.charAt(0).toUpperCase() + range.slice(1)
	let statementTitle
	switch (statement) {
		case 'income-statement':
			statementTitle = 'Income Statement'
			break

		case 'balance-sheet':
			statementTitle = 'Balance Sheet'
			break

		case 'cash-flow-statement':
			statementTitle = 'Cash Flow Statement'
			break

		case 'ratios':
			statementTitle = 'Ratios and Metrics'
			break
	}

	const divider = financialsState(state => state.divider)
	const controls = financialsState(state => state.controls)
	const toggleControls = financialsState(state => state.toggleControls)
	const dividerText = getDivider(divider)
	const dividerTextDesktop = dividerText ? dividerText + ' ' : ''
	const dividerTextMobile = dividerText ? capitalize(dividerText) + ' ' : ''
	const firstWord = statement === 'ratios' ? 'Market cap' : 'Financials'

	return (
		<div>
			<h2 className="mb-1 text-[1.3rem] font-bold bp:text-2xl md:mb-3">
				{statementTitle} ({rangeTitle})
			</h2>
			{info.currency && info.fiscalYear && (
				<div className="mb-1.5 flex items-end justify-between md:block lg:mb-0">
					<div className="hidden pb-1 text-sm text-gray-600 lg:block">
						{`${firstWord} in ${dividerTextDesktop}${info.currency}. Fiscal year is ${info.fiscalYear}.`}
					</div>
					<div className="block text-sm text-gray-600 lg:hidden">
						{`${dividerTextMobile}${info.currency}. Fiscal year is ${info.fiscalYearShort}.`}
					</div>
					<button
						className="text-gray-600 md:hidden"
						onClick={toggleControls}
					>
						{controls ? (
							<ChevronUpIcon className="h-6 w-6" />
						) : (
							<ChevronDownIcon className="h-6 w-6" />
						)}
					</button>
				</div>
			)}
		</div>
	)
}
