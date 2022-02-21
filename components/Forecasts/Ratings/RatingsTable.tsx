import { useSymbolContext } from 'components/Layout/SymbolContext'
import { slice } from 'lodash'

// Return an array with the data for a single table row
function makeRow(months: any, index: string, count: number) {
	let rowArray = months.map((item: { [x: string]: any }) => item[index])
	return slice(rowArray, -count)
}

export function RatingsTable() {
	const { data } = useSymbolContext()
	const months = data.recommendations

	return (
		<div className="mt-5 text-center">
			<table className="w-full text-right text-smaller" id="ratings-table">
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="text-left font-semibold">Rating</th>
						{makeRow(months, 'month', 6).map((item: any) => (
							<th className="font-semibold" key={item}>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="text-left">Strong Buy</td>
						{makeRow(months, 'strongBuy', 6).map((item: any, i) => (
							<td key={`strongBuy-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Buy</td>
						{makeRow(months, 'buy', 6).map((item: any, i) => (
							<td key={`buy-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Hold</td>
						{makeRow(months, 'hold', 6).map((item: any, i) => (
							<td key={`hold-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Sell</td>
						{makeRow(months, 'sell', 6).map((item: any, i) => (
							<td key={`sell-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="text-left">Strong Sell</td>
						{makeRow(months, 'strongSell', 6).map((item: any, i) => (
							<td key={`strongSell-${i}`}>{item}</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
