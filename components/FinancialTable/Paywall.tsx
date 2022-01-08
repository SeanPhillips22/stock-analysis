import { LockClosedIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { formatYear } from './FinancialTable.functions'

type PropsHeaderCell = {
	range: string
	diff: number
	last: string
}

export function PaywallHeaderCell({ range, diff, last }: PropsHeaderCell) {
	if (range === 'annual') {
		let yearStart = Number(formatYear(last)) - 1
		let yearEnd = yearStart - diff + 1

		return <th className="lockhead">{`${yearStart} - ${yearEnd}`}</th>
	}

	return <th className="lockhead">{`+${diff} Quarters`}</th>
}

type PropsBodyCell = {
	range: string
	showcount: number
	fullcount: number
}

export function PaywallBodyCell({
	range,
	showcount,
	fullcount
}: PropsBodyCell) {
	const type = range === 'annual' ? 'years' : 'quarters'
	const countShown = range === 'annual' ? showcount - 1 : showcount
	const router = useRouter()

	function goToTrialPage() {
		router.push('/pro/')
	}

	return (
		<td className="lockcell">
			<div
				title={`Showing ${countShown} of ${fullcount} ${type}`}
				onClick={goToTrialPage}
				id="tag-upgr-financials-table-cell"
			>
				<span>Upgrade</span>
				<LockClosedIcon className="ml-1 w-3.5 h-3.5 text-gray-500" />
			</div>
		</td>
	)
}
