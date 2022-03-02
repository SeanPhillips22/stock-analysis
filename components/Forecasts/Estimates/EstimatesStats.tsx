/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { cn } from 'functions/helpers/classNames'

const stats = [
	{
		name: 'Revenue This Year',
		stat: '395B',
		previousStat: '365B',
		change: '8.05%',
		changeType: 'increase'
	},
	{
		name: 'Revenue Next Year',
		stat: '417B',
		previousStat: '395B',
		change: '5.69%',
		changeType: 'increase'
	},
	{
		name: 'EPS This Year',
		stat: '6.16',
		previousStat: '5.67',
		change: '8.64%',
		changeType: 'increase'
	},
	{
		name: 'EPS Next Year',
		stat: '6.56',
		previousStat: '6.16',
		change: '6.49%',
		changeType: 'increase'
	}
]

export function EstimatesStats() {
	return (
		<div>
			<dl className="mb-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-y-0 md:divide-x">
				{stats.map(item => (
					<div key={item.name} className="px-4 py-5 sm:p-6">
						<dt className="text-base font-normal text-gray-900">
							{item.name}
						</dt>
						<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
							<div className="flex items-baseline text-2xl font-semibold text-indigo-600">
								{item.stat}
								<span className="ml-2 text-sm font-medium text-gray-500">
									from {item.previousStat}
								</span>
							</div>

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
										className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
										aria-hidden="true"
									/>
								) : (
									<ArrowSmDownIcon
										className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
										aria-hidden="true"
									/>
								)}

								<span className="sr-only">
									{item.changeType === 'increase'
										? 'Increased'
										: 'Decreased'}{' '}
									by
								</span>
								{item.change}
							</div>
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}
