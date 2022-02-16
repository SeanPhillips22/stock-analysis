import { IpoCounts } from 'types/Ipos'

export function CalendarStatsMobile({ counts }: { counts: IpoCounts }) {
	const total =
		counts.thisweek + counts.nextweek + counts.later + counts.unscheduled

	const hasLater = counts.later > 0

	return (
		<div className="pt-2 pb-3 lg:hidden">
			<h2 className="mb-1.5 text-[1.4rem] font-bold text-gray-800">
				Calendar Statistics
			</h2>
			<div className="mb-1 border-t border-b px-1.5 pt-2 pb-3 text-xs font-medium text-gray-600 sm:text-sm">
				<div className="flex flex-row justify-between text-center">
					<div className="flex flex-col">
						<div className="order-2">This Week</div>
						<div className="order-1 text-3xl font-semibold text-gray-800 sm:text-4xl">
							{counts.thisweek}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Next Week</div>
						<div className="order-1 text-3xl font-semibold text-gray-800 sm:text-4xl">
							{counts.nextweek}
						</div>
					</div>
					{hasLater && (
						<div className="flex flex-col">
							<div className="order-2">Later</div>
							<div className="order-1 text-3xl font-semibold text-gray-800 sm:text-4xl">
								{counts.later}
							</div>
						</div>
					)}
					<div className="flex flex-col">
						<div className="order-2">Unscheduled</div>
						<div className="order-1 text-3xl font-semibold text-gray-800 sm:text-4xl">
							{counts.unscheduled}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Total</div>
						<div className="order-1 text-3xl font-semibold text-gray-800 sm:text-4xl">
							{total}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
