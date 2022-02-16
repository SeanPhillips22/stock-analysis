import { HoldingsType } from 'types/Holdings'
import { SymbolLink } from 'components/Links'
import { Button } from 'components/Buttons/Button'

interface Props {
	ticker: string
	data: HoldingsType
}

export const HoldingsWidget = ({ ticker, data }: Props) => {
	if (!data.list || data.list.length < 10) {
		return null
	}

	return (
		<div>
			<div className="mb-2 flex-row items-end justify-between xs:mb-1 xs:flex">
				<h2 className="hh2 mb-0 xs:mb-1">Top 10 Holdings</h2>
				<span className="text-smaller text-gray-800">
					{data.top10.toFixed(2) + '% of assets'}
				</span>
			</div>
			<table className="w-full text-smaller xs:text-base">
				<thead>
					<tr className="border-t border-b border-gray-200">
						<th className="py-1.5 px-1.5 text-left xs:px-2">Name</th>
						<th className="py-1.5 px-1.5 text-left xs:px-2">Symbol</th>
						<th className="py-1.5 px-1.5 text-right xs:px-2">Weight</th>
					</tr>
				</thead>
				<tbody>
					{data.list.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="py-1.5 px-1.5 text-left font-semibold xs:px-2">
								{item.name}
							</td>
							<td className="py-1.5 px-1.5 text-left xs:px-2">
								<SymbolLink symbol={item.symbol} />
							</td>
							<td className="py-1.5 px-1.5 text-right xs:px-2">
								{item.assets}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<style jsx>{`
				table tr th {
					background-color: #fff;
				}
				table tr:nth-child(odd) {
					background-color: #fafbfc;
				}
				table tr:hover td {
					background-color: #f2f9ff !important;
				}
			`}</style>
			<Button
				url={`/etf/${ticker.toLowerCase()}/holdings/`}
				text="View More Holdings"
				className="text-lg bp:text-xl"
			/>
		</div>
	)
}
