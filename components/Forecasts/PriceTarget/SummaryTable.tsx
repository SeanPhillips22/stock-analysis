export function SummaryTable() {
	return (
		<div className="mt-5 text-center">
			<table className="w-full text-right text-smaller">
				<thead>
					<tr className="border-b border-gray-200 font-normal">
						<th className="text-left font-semibold">Forecast</th>
						<th className="font-semibold">Low</th>
						<th className="font-semibold">Average</th>
						<th className="font-semibold">Median</th>
						<th className="font-semibold">High</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-200">
						<td className="text-left">Price</td>
						<td>$111.7</td>
						<td>$172.89</td>
						<td>$175.44</td>
						<td>$210.22</td>
					</tr>
					<tr>
						<td className="text-left">Change</td>
						<td>-14.3%</td>
						<td>+14.3%</td>
						<td>+16.3%</td>
						<td>+44.5%</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
