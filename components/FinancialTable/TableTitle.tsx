import { financialsState } from 'state/financialsState'
import { Range } from 'types/Financials'
import { getDivider } from './FinancialTable.functions'

type Props = {
	statement: string
	currency?: string
	fiscalYear?: string
	range: Range
}

export function TableTitle({ statement, currency, fiscalYear, range }: Props) {
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

	const divider = financialsState((state) => state.divider)
	const dividerText = getDivider(divider)
	const firstWord = statement === 'ratios' ? 'Market cap' : 'Financials'

	return (
		<div>
			<h2 className="text-2xl font-bold mb-3">
				{statementTitle} ({rangeTitle})
			</h2>
			{currency && fiscalYear && (
				<div className="text-sm pb-1 text-gray-600">
					{`${firstWord} in ${
						dividerText ? dividerText + ' ' : ''
					}${currency}. Fiscal year is ${fiscalYear}.`}
				</div>
			)}
		</div>
	)
}
