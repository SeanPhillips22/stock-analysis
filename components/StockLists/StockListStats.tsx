/* This example requires Tailwind CSS v2.0+ */
import { formatCellRaw } from 'functions/tables/formatTableCell'
import { cn } from 'functions/helpers/classNames'
import { ArrowSmUpIcon } from 'components/Icons/ArrowSmUp'
import { ArrowSmDownIcon } from 'components/Icons/ArrowSmDown'

type Props = {
	stockCount: number
	totalMarketCap: number
	totalYTDChange: number
}

function getChangeType(val: number) {
	return val > 0 ? 'increase' : val < 0 ? 'decrease' : 'nochange'
}

export function StockListStats({ stockCount, totalMarketCap, totalYTDChange }: Props) {
	totalYTDChange = 11.25
	const SP500 = -0.34

	const stats = [
		{
			name: `Total Companies`,
			stat: stockCount,

			changeType: 'nochange'
		},
		{
			name: `Total Market Cap`,
			stat: formatCellRaw('abbreviate', totalMarketCap),
			previousStat: 'YTD',
			change: formatCellRaw('formatPercentage', totalYTDChange - SP500),
			changeType: getChangeType(totalYTDChange - SP500)
		},
		{
			name: `YTD Gain vs. S&P500`,
			stat: formatCellRaw('formatPercentage', totalYTDChange),
			previousStat: 'S&P500',
			change: formatCellRaw('formatPercentage', totalYTDChange - SP500),
			changeType: getChangeType(totalYTDChange - SP500)
		}
	]

	return (
		<div>
			<dl className="mb-4 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg border bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
				{stats.map(item => (
					<div key={item.name} className="px-4 py-5 sm:p-6">
						<dt className="text-base font-normal text-gray-900">{item.name}</dt>
						<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
							<div className="flex items-baseline text-2xl font-semibold text-blue-700">
								{item.stat}
								{item.previousStat && (
									<div className="ml-2 text-sm font-medium text-gray-500">{item.previousStat}</div>
								)}
							</div>

							{item.changeType !== 'nochange' && (
								<div
									className={cn(
										item.changeType === 'increase'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800',
										'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
									)}
								>
									{item.changeType === 'increase' ? (
										<ArrowSmUpIcon
											classes="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
											aria-hidden="true"
										/>
									) : (
										<ArrowSmDownIcon
											classes="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
											aria-hidden="true"
										/>
									)}

									<span className="sr-only">
										{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
									</span>
									{item.change}
								</div>
							)}
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}
