import { CalendarData } from 'types/Ipos';

export function CalendarStats({ data }: { data: CalendarData }) {
	const total =
		data.thisweek.length +
		data.nextweek.length +
		data.later.length +
		data.unknown.length;

	return (
		<div>
			<h2 className="hh2 text-[1.4rem] text-gray-800">
				Calendar Statistics
			</h2>
			<div className="border px-6 py-4 rounded text-sm font-medium text-gray-600">
				<div className="flex flex-wrap justify-around lg:justify-between gap-x-6 gap-y-4 text-center">
					<div className="flex flex-col">
						<div className="order-2">This Week</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{data.thisweek.length}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Next Week</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{data.nextweek.length}
						</div>
					</div>
					{data.later?.length && (
						<div className="flex flex-col">
							<div className="order-2">Later</div>
							<div className="order-1 font-semibold text-4xl text-gray-800">
								{data.later.length}
							</div>
						</div>
					)}
					<div className="flex flex-col">
						<div className="order-2">Unscheduled</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{data.unknown.length}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Total Upcoming</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{total}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
