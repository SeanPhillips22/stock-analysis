import { DividendType } from 'types/Dividend'
import { Button } from 'components/Buttons/Button'

interface Props {
	ticker: string
	data: DividendType[]
}

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 5
})

export const DividendWidget = ({ ticker, data }: Props) => {
	if (data.length === 0) {
		return null
	}

	return (
		<div>
			<h2 className="hh2 mb-2">Dividends</h2>
			<table className="w-full text-smaller xs:text-base">
				<thead>
					<tr className="border-t border-b border-gray-200">
						<th className="px-1.5 py-2 text-left xs:px-2">Ex-Dividend</th>
						<th className="px-1.5 py-2 text-left xs:px-2">Amount</th>
						<th className="px-1.5 py-2 text-right xs:px-2">Pay Date</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="px-1.5 py-2 text-left xs:px-2">
								{item.exDate}
							</td>
							<td className="px-1.5 py-2 text-left xs:px-2">
								{'$' + formatter.format(Number(item.amount))}
							</td>
							<td className="px-1.5 py-2 text-right xs:px-2">
								{item.payDate}
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
				url={`/etf/${ticker.toLowerCase()}/dividend/`}
				text="Full Dividend History"
				className="text-lg bp:text-xl"
			/>
		</div>
	)
}
