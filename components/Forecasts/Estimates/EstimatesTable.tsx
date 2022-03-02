import { ForecastData } from 'types/Forecast'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatTableCell } from 'functions/tables/formatTableCell'
import styles from './EstimatesTable.module.css'
import { formatYear } from 'components/FinancialTable/FinancialTable.functions'
import { HoverChartIcon } from 'components/Icons/HoverChart'

export function EstimatesTable() {
	const { data }: { data: ForecastData } = useSymbolContext()
	const table = data.estimates.table

	if (!table) return null

	return (
		<>
			<div className={styles.wrap}>
				<table className={styles.table} id="estimates-table">
					<thead>
						<tr>
							<th>Year</th>
							{table.dates.map(i => (
								<th key={`year${i}`} title={i}>
									{formatYear(i)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Revenue
								<div className={styles.hovericon}>
									<HoverChartIcon />
								</div>
							</td>
							{table.revenue.map(i => (
								<td key={`revenue${i}`}>
									{formatTableCell('abbreviate', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>
								Revenue Growth
								<div className={styles.hovericon}>
									<HoverChartIcon />
								</div>
							</td>
							{table.revenueGrowth.map(i => (
								<td key={`revenueGrowth${i}`}>
									{formatTableCell('colorPercentage', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>
								EPS
								<div className={styles.hovericon}>
									<HoverChartIcon />
								</div>
							</td>
							{table.eps.map(i => (
								<td key={`eps${i}`}>
									{formatTableCell('format2dec', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>
								EPS Growth
								<div className={styles.hovericon}>
									<HoverChartIcon />
								</div>
							</td>
							{table.epsGrowth.map(i => (
								<td key={`epsGrowth${i}`}>
									{formatTableCell('colorPercentage', i)}
								</td>
							))}
						</tr>
						<tr>
							<td>
								No. Analysts
								<div className={styles.hovericon}>
									<HoverChartIcon />
								</div>
							</td>
							{table.analysts.map(i => (
								<td key={`analysts${i}`}>
									{formatTableCell('integer', i)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</>
	)
}
