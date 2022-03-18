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
		<div className="mt-3 overflow-x-auto text-center lg:mt-5">
			<table
				className="w-full text-right text-tiny xs:text-sm md:text-smaller"
				id="ratings-table"
			>
				<thead>
					<tr className="border-b border-gray-200 font-normal hover:bg-gray-50">
						<th className="px-1 py-[3px] text-left font-semibold">
							Rating
						</th>
						{!months.length && (
							<th>{formatDateMonth(new Date().toDateString())}</th>
						)}
						{makeRow(months, 'month', 6).map((item: any) => (
							<th className="px-1 font-semibold" key={item}>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="whitespace-nowrap px-1 py-[3px] text-left">
							Strong Buy
						</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'strongBuy', 6).map((item: any, i) => (
							<td className="px-1" key={`strongBuy-${i}`}>
								{item}
							</td>
						))}
					</tr>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="px-1 py-[3px] text-left">Buy</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'buy', 6).map((item: any, i) => (
							<td className="px-1" key={`buy-${i}`}>
								{item}
							</td>
						))}
					</tr>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="px-1 py-[3px] text-left">Hold</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'hold', 6).map((item: any, i) => (
							<td className="px-1" key={`hold-${i}`}>
								{item}
							</td>
						))}
					</tr>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="px-1 py-[3px] text-left">Sell</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'sell', 6).map((item: any, i) => (
							<td className="px-1" key={`sell-${i}`}>
								{item}
							</td>
						))}
					</tr>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<td className="px-1 py-[3px] text-left">Strong Sell</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'strongSell', 6).map((item: any, i) => (
							<td className="px-1" key={`strongSell-${i}`}>
								{item}
							</td>
						))}
					</tr>
					<tr className="font-semibold hover:bg-gray-50">
						<td className="whitespace-nowrap px-1 py-[3px] text-left">
							Total
						</td>
						{!months.length && <td>n/a</td>}
						{makeRow(months, 'total', 6).map((item: any, i) => (
							<td className="px-1" key={`total-${i}`}>
								{item}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
