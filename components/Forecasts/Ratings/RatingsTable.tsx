import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatDateMonth } from 'functions/datetime/formatDates'
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
		<div className="mt-3 text-center lg:mt-5">
			<table
				className="w-full text-right text-sm md:text-smaller"
				id="ratings-table"
			>
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="py-[3px] text-left font-semibold lg:py-0.5">
							Rating
						</th>
						{!months.length && (
							<th>{formatDateMonth(new Date().toDateString())}</th>
						)}
						{makeRow(months, 'month', 6).map((item: any) => (
							<th className="font-semibold" key={item}>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="whitespace-nowrap py-[3px] text-left lg:py-0.5">
							Strong Buy
						</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'strongBuy', 6).map((item: any, i) => (
							<td key={`strongBuy-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-[3px] text-left lg:py-0.5">Buy</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'buy', 6).map((item: any, i) => (
							<td key={`buy-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-[3px] text-left lg:py-0.5">Hold</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'hold', 6).map((item: any, i) => (
							<td key={`hold-${i}`}>{item}</td>
						))}
					</tr>
					<tr className="border-b border-gray-200">
						<td className="py-[3px] text-left lg:py-0.5">Sell</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'sell', 6).map((item: any, i) => (
							<td key={`sell-${i}`}>{item}</td>
						))}
					</tr>
					<tr>
						<td className="whitespace-nowrap py-[3px] text-left lg:py-0.5">
							Strong Sell
						</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'strongSell', 6).map((item: any, i) => (
							<td key={`strongSell-${i}`}>{item}</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
