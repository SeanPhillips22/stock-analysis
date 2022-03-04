import { ForecastData } from 'types/Forecast'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatTableCell } from 'functions/tables/formatTableCell'
import styles from './EstimatesTable.module.css'
import { formatYear } from 'components/FinancialTable/FinancialTable.functions'
import { Info } from 'types/Info'
// import { HoverChartIcon } from 'components/Icons/HoverChart'

type Props = {
	range: 'Annual' | 'Quarterly'
}

export function EstimatesTable({ range }: Props) {
	const { info, data }: { info: Info; data: ForecastData } = useSymbolContext()
	const table =
		range === 'Annual'
			? data.estimates.table.annual
			: data.estimates.table.quarterly

	if (!table) return null

	// Add note below financials table
	let tableNote =
		info.currency !== 'USD' ? 'Financials in ' + info.currency + '.' : null

	return (
		<>
			<div className={styles.wrap}>
				<table className={styles.table} id="estimates-table">
					<thead>
						<tr>
							<th>Year</th>
							{table.dates?.map((i, ii) => (
								<th key={`year-${range}-${ii}`} title={i}>
									{range === 'Annual' ? formatYear(i) : i}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Revenue</td>
							{table.revenue?.map((i, ii) => (
								<td
									key={`revenue-${range}-${ii}`}
									title={
										i
											? (formatTableCell('format0dec', i) as string)
											: undefined
									}
								>
									{i === 0 ? 0 : formatTableCell('abbreviate', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>Revenue Growth</td>
							{table.revenueGrowth?.map((i, ii) => (
								<td
									key={`revenueGrowth-${range}-${ii}`}
									title={
										i
											? formatTableCell('format3dec', i) + '%'
											: undefined
									}
								>
									{formatTableCell('colorPercentage', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>EPS</td>
							{table.eps?.map((i, ii) => (
								<td
									key={`eps-${range}-${ii}`}
									title={formatTableCell('format3dec', i) as string}
								>
									{formatTableCell('format2dec', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>EPS Growth</td>
							{table.epsGrowth?.map((i, ii) => (
								<td
									key={`epsGrowth-${range}-${ii}`}
									title={
										i
											? formatTableCell('format3dec', i) + '%'
											: undefined
									}
								>
									{formatTableCell('colorPercentage', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>No. Analysts</td>
							{table.analysts?.map((i, ii) => (
								<td
									key={`analysts-${range}-${ii}`}
									title={
										i
											? (formatTableCell('format0dec', i) as string)
											: undefined
									}
								>
									{formatTableCell('integer', i)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
				{tableNote && (
					<div className="mt-1 text-[0.85rem] text-gray-600">
						{tableNote}
					</div>
				)}
			</div>
		</>
	)
}
