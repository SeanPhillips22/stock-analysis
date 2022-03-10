import { ForecastData } from 'types/Forecast'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatTableCell } from 'functions/tables/formatTableCell'
import styles from './EstimatesTable.module.css'
import { formatYear } from 'components/FinancialTable/FinancialTable.functions'
import { Info } from 'types/Info'
import { TableRowTitle } from './TableRow'

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

	const lastDate = table.lastDate

	// Add note below financials table
	let tableNote =
		'White columns are actual numbers, blue columns are estimates.'
	tableNote =
		info.currency !== 'USD'
			? 'Financials in ' + info.currency + '. ' + tableNote
			: tableNote

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
							<TableRowTitle
								title="Revenue"
								styles={styles.hovericon}
								range={range}
								id="revenue"
							/>
							{table.revenue?.map((i, ii) => (
								<td
									key={`revenue-${range}-${ii}`}
									title={
										i
											? (formatTableCell('format0dec', i) as string)
											: undefined
									}
									className={ii > lastDate ? styles.est : undefined}
								>
									{i === 0 ? 0 : formatTableCell('abbreviate', i)}
								</td>
							))}
						</tr>
						<tr>
							<TableRowTitle
								title="Revenue Growth"
								styles={styles.hovericon}
								range={range}
								id="revenueGrowth"
							/>
							{table.revenueGrowth?.map((i, ii) => (
								<td
									key={`revenueGrowth-${range}-${ii}`}
									title={
										i
											? formatTableCell('format3dec', i) + '%'
											: undefined
									}
									className={ii > lastDate ? styles.est : undefined}
								>
									{formatTableCell('colorPercentage', i)}
								</td>
							))}
						</tr>
						<tr>
							<TableRowTitle
								title="EPS"
								styles={styles.hovericon}
								range={range}
								id="eps"
							/>
							{table.eps?.map((i, ii) => (
								<td
									key={`eps-${range}-${ii}`}
									title={formatTableCell('format3dec', i) as string}
									className={ii > lastDate ? styles.est : undefined}
								>
									{formatTableCell('format2dec', i)}
								</td>
							))}
						</tr>
						<tr>
							<TableRowTitle
								title="EPS Growth"
								styles={styles.hovericon}
								range={range}
								id="epsGrowth"
							/>
							{table.epsGrowth?.map((i, ii) => (
								<td
									key={`epsGrowth-${range}-${ii}`}
									title={
										i
											? formatTableCell('format3dec', i) + '%'
											: undefined
									}
									className={ii > lastDate ? styles.est : undefined}
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
									className={ii > lastDate ? styles.est : undefined}
								>
									{formatTableCell('integer', i)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			{tableNote && (
				<div className="mt-0.5 text-[0.8rem] text-gray-600">
					{tableNote}
				</div>
			)}
		</>
	)
}
