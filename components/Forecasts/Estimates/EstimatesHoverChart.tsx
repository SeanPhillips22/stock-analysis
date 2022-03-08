import {
	formatY,
	formatYear
} from 'components/FinancialTable/FinancialTable.functions'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, Title, defaults } from 'chart.js'
import { EstimatesTableKeys, ForecastData } from 'types/Forecast'
import { Info } from 'types/Info'
import { dec0, dec3, formatCellRaw } from 'functions/tables/formatTableCell'

ChartJS.register(Title)

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

type Props = {
	id: EstimatesTableKeys
	range: 'Annual' | 'Quarterly'
	title: string
}

export function EstimatesHoverChart({ id, range, title }: Props) {
	const { info, data }: { info: Info; data: ForecastData } = useSymbolContext()

	// Get the table data
	// It contains the data we want to display
	const table =
		range === 'Annual'
			? data.estimates.table.annual
			: data.estimates.table.quarterly

	if (!table) return null

	// To determine which is actual and which is estimates
	const lastDate = table.lastDate

	// Format the x-axis
	const xAxis =
		range === 'Annual'
			? table.dates.map(i => formatYear(i).toString())
			: table.dates

	// Format the y-axis
	const yAxis = table[id]
	let isGrowth = id.includes('Growth')

	// Get the colors for the bars
	const colors = table.dates.map((i, ii) => {
		if (ii > lastDate) return 'rgba(44, 98, 136, 1)'
		return 'rgba(100, 100, 100, 1)'
	})

	return (
		<Bar
			id={info.symbol + id + range}
			data={{
				labels: xAxis,
				datasets: [
					{
						data: yAxis,
						backgroundColor: colors
					}
				]
			}}
			options={{
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: '#323232',
							font: {
								size: 13
							}
						}
					},
					y: {
						position: 'right',
						grid: {
							drawBorder: false
						},
						ticks: {
							color: '#323232',
							font: {
								size: 13
							},
							callback: function (value: number | string) {
								if (typeof value == 'string') value = parseFloat(value)
								if (value === 0) return 0
								return isGrowth
									? formatY(value, 'growth')
									: (formatCellRaw(
											'abbreviate',
											value,
											'stocks',
											true
									  ) as string)
							}
						}
					}
				},
				animation: false,
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: true,
						text: `${info.ticker} ${title} Forecast - ${range}`,
						font: {
							size: 18
						},
						color: '#333',
						padding: {
							top: 4,
							bottom: 12
						}
					},
					tooltip: {
						backgroundColor: '#f6f7f8',
						borderColor: '#ccc',
						borderWidth: 1,
						titleColor: '#323232',
						bodyColor: '#323232',
						titleFont: {
							size: 17,
							weight: '600'
						},
						bodyFont: {
							size: 14,
							weight: '400'
						},
						padding: 10,
						displayColors: false,
						callbacks: {
							label: function (context: { parsed: { y: any } }) {
								const val = parseFloat(context.parsed.y) || 0
								if (isGrowth) return `${dec3.format(val)}%`
								if (id === 'eps') return dec3.format(val)
								else return dec0.format(val)
							}
						}
					}
				}
			}}
		/>
	)
}
