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
			<div className="rounded border border-gray-200">
				<table className="w-full text-[0.95rem] text-gray-900">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="border-r border-gray-200 py-2 px-2 text-left">
								Symbol
							</th>
							<th className="py-2 px-2 pr-2 text-left">Name</th>
						</tr>
					</thead>
					<tbody>
						{filings.map((item, index) => (
							<tr
								key={index}
								className="border-b border-gray-200 last:border-0"
							>
								<td className="border-r border-gray-200 py-2 px-3">
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
