import { IpoUpcoming } from 'types/Ipos'
import { StockLink } from 'components/Links'
import { Button } from 'components/Buttons/Button'

interface Props {
	upcoming: IpoUpcoming[]
}

export const CalendarTableMin = ({ upcoming }: Props) => {
	if (!upcoming.length) return null

	return (
		<div>
			<h3 className="hh3">Upcoming IPOs</h3>
			<div className="rounded border border-gray-200">
				<table className="w-full text-[0.95rem] text-gray-900">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="border-r border-gray-200 py-2 px-2 pl-2 text-left">
								Date
							</th>
							<th className="border-r border-gray-200 py-2 px-2 text-left">
								Symbol
							</th>
							<th className="py-2 px-2 pr-2 text-left">Name</th>
						</tr>
					</thead>
					<tbody>
						{upcoming.map((item, index) => (
							<tr
								key={index}
								className="border-b border-gray-200 last:border-0"
							>
								<td className="whitespace-nowrap border-r border-gray-200 py-2 px-2 pl-2">
									{item.date}
								</td>
								<td className="border-r border-gray-200 py-2 px-2">
									<StockLink symbol={item.symbol} className="bll" />
								</td>
								<td className="py-2 px-2 pr-2 lg:max-w-[130px] lg:truncate">
									{item.name}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button text="Full IPO Calendar" url="/ipos/calendar/" />
		</div>
	)
}
