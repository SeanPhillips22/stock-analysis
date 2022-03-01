import { ForecastData } from 'types/Forecast'
import { useSymbolContext } from 'components/Layout/SymbolContext'

export function EstimatesTable() {
	const { data }: { data: ForecastData } = useSymbolContext()
	const table = data.estimates.table

	if (!table) return null

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Year</th>
						{table.dates.map(i => (
							<th key={`year${i}`}>{i}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Revenue</td>
						{table.revenue.map(i => (
							<th key={`revenue${i}`}>{i}</th>
						))}
					</tr>
					<tr>
						<td>EPS</td>
						{table.eps.map(i => (
							<th key={`eps${i}`}>{i}</th>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
