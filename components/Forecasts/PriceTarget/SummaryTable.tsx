import { useSymbolContext } from 'components/Layout/SymbolContext'

// Calculate the change from the current price to the target price
// Format as a percentage, with a '%' symbol at the end
// Also return the color to use -- green, red or gray
function getChange(target: number, current: number) {
	let change = ((target - current) / current) * 100
	let formatted = change.toFixed(2) + '%'
	if (change > 0) formatted = '+' + formatted

	// Get the color to show
	let color =
		change > 0
			? 'text-green-800'
			: change < 0
			? 'text-red-700'
			: 'text-gray-800'

	return [formatted, color]
}

export function SummaryTable() {
	const { data, info } = useSymbolContext()
	const { low, average, median, high } = data.targets
	const [lowChange, lowColor] = getChange(low, info.quote.p)
	const [averageChange, averageColor] = getChange(average, info.quote.p)
	const [medianChange, medianColor] = getChange(median, info.quote.p)
	const [highChange, highColor] = getChange(high, info.quote.p)

	return (
		<div className="mt-2 pl-2 text-center">
			<table className="w-full text-right text-base text-gray-800">
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="text-left font-semibold">Target</th>
						<th className="font-semibold">Low</th>
						<th className="font-semibold">Average</th>
						<th className="font-semibold">Median</th>
						<th className="font-semibold">High</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="text-left">Price</td>
						<td>${low}</td>
						<td>${average}</td>
						<td>${median}</td>
						<td>${high}</td>
					</tr>
					<tr>
						<td className="text-left">Change</td>
						<td className={lowColor}>{lowChange}</td>
						<td className={averageColor}>{averageChange}</td>
						<td className={medianColor}>{medianChange}</td>
						<td className={highColor}>{highChange}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
