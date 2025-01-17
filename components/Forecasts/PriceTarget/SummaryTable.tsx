import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatTarget } from './target.functions'

// Calculate the change from the current price to the target price
// Format as a percentage, with a '%' symbol at the end
// Also return the color to use -- green, red or gray
function getChange(target: number, current: number) {
	if (!target) return ['n/a', 'text-gray-800']
	let change = ((target - current) / current) * 100
	let formatted = change.toFixed(change > 1000 ? 1 : 2) + '%'
	if (change > 0) formatted = '+' + formatted

	// Get the color to show
	let color = change > 0 ? 'text-green-800' : change < 0 ? 'text-red-700' : 'text-gray-800'

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
		<div className="hide-scroll mt-2 mb-1 overflow-x-auto px-1.5 text-center md:mb-0 md:px-0 lg:mt-2">
			<table className="w-full text-right text-tiny text-gray-800 xs:text-sm sm:text-base">
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="py-[3px] text-left font-semibold lg:py-0.5">Target</th>
						<th className="font-semibold">Low</th>
						<th className="font-semibold">Average</th>
						<th className="font-semibold">Median</th>
						<th className="font-semibold">High</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="py-[3px] text-left lg:py-0.5">Price</td>
						<td>{low ? '$' + formatTarget(low) : 'n/a'}</td>
						<td>{average ? '$' + formatTarget(average) : 'n/a'}</td>
						<td>{median ? '$' + formatTarget(median) : 'n/a'}</td>
						<td>{high ? '$' + formatTarget(high) : 'n/a'}</td>
					</tr>
					<tr>
						<td className="py-[3px] text-left lg:py-0.5">Change</td>
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
