import { IpoRecent } from 'types/Ipos'
import { StockLink } from 'components/Links'
import { Button } from 'components/Buttons/Button'

interface Props {
	recent: IpoRecent[]
}

export const RecentTableMin = ({ recent }: Props) => {
	return (
		<div>
			<h3 className="hh3 mb-2.5">Latest IPOs</h3>
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
						{recent.map((item, index) => (
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
								<td className="py-2 px-2 pr-2 lg:max-w-[150px] lg:truncate">
									{item.name}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button text="All Recent IPOs" url="/ipos/" />
		</div>
	)
}
