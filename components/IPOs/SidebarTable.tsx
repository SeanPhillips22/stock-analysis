import { StockLink } from 'components/Links'
import { Button } from 'components/Buttons/Button'

export type SidebarTableProps = {
	date: string
	symbol: string
	name: string
}[]

type Props = {
	data: SidebarTableProps
	title: string
	btnTitle: string
	btnUrl: string
	count?: number
}

/**
 * A table in the sidebar that shows a list of stocks with date, symbol and name
 */
export function SidebarTable({ data, title, btnTitle, btnUrl, count }: Props) {
	// Make sure data is an array
	// If no data, return null
	if (!Array.isArray(data)) data = [data]
	if (!data[0]?.date) return null

	return (
		<div>
			<h3 className="hh3 mb-2.5">{count ? `${title} (${count})` : title}</h3>
			<div className="rounded border border-gray-200">
				<table className="w-full text-left text-[0.95rem]">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="border-r border-gray-200 p-2">Date</th>
							<th className="border-r border-gray-200 p-2">Symbol</th>
							<th className="p-2">Name</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) => (
							<tr key={index} className="border-b border-gray-200 last:border-0">
								<td className="whitespace-nowrap border-r border-gray-200 p-2">{item.date}</td>
								<td className="border-r border-gray-200 p-2">
									<StockLink symbol={item.symbol} className="bll" />
								</td>
								<td className="p-2 lg:max-w-[150px] lg:truncate">{item.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button text={btnTitle} url={btnUrl} />
		</div>
	)
}
