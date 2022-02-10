import { FilingMin } from 'types/Ipos'
import { StockLink } from 'components/Links'
import { Button } from 'components/Buttons/Button'

type Props = {
	filings: FilingMin[]
	count: number
}

export const FilingTableMin = ({ filings, count }: Props) => {
	return (
		<div>
			<h3 className="hh3 mb-2.5">Unscheduled IPOs ({count})</h3>
			<div className="border border-gray-200 rounded">
				<table className="w-full text-gray-900 text-[0.95rem]">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="text-left py-2 px-2 border-r border-gray-200">
								Symbol
							</th>
							<th className="text-left py-2 px-2 pr-2">Name</th>
						</tr>
					</thead>
					<tbody>
						{filings.map((item, index) => (
							<tr
								key={index}
								className="border-b last:border-0 border-gray-200"
							>
								<td className="py-2 px-3 border-r border-gray-200">
									<StockLink symbol={item.symbol} className="bll" />
								</td>
								<td className="py-2 px-2 pr-2 lg:max-w-[200px] lg:truncate">
									{item.name}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button text="All IPO Filings" url="/ipos/filings/" />
		</div>
	)
}
