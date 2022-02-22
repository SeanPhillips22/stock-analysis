import { isOldSafari, UnavailableSafari } from 'components/Unavailable'

import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	BarController,
	BarElement,
	Tooltip,
	Legend,
	LinearScale,
	Title,
	CategoryScale,
	defaults
} from 'chart.js'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

interface FinancialsWidgetChartI {
	data: {
		financialChart: [][]
	}
	colors: string[]
	padLegend: {
		id: string
		beforeInit: (chart: {
			legend: {
				fit: () => void
				height: number
			}
		}) => void
	}
}

export function FinancialsWidgetChart({
	data,
	colors,
	padLegend
}: FinancialsWidgetChartI) {
	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <UnavailableSafari />
	}

	ChartJS.register(
		BarController,
		BarElement,
		Tooltip,
		LinearScale,
		CategoryScale,
		Title,
		Legend,
		padLegend
	)

	return (
		<Bar
			id={'1'}
			data={{
				labels: data.financialChart[0],
				datasets: [
					{
						label: 'Revenue',
						backgroundColor: '#2C6288',
						data: data.financialChart[1],
						categoryPercentage: 0.8,
						barPercentage: 0.85
					},
					{
						label: 'Earnings',
						backgroundColor: colors,
						borderColor: '#2C6288',
						data: data.financialChart[2],
						categoryPercentage: 0.8,
						barPercentage: 0.85
					}
				]
			}}
			options={{
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: {
						ticks: {
							font: {
								size: 14
							},
							maxRotation: 0
						},
						grid: {
							display: false
						}
					},
					y: {
						position: 'right',
						suggestedMin: 0,
						ticks: {
							font: {
								size: 14
							},
							padding: 0,

							// beginAtZero: true,
							callback: function (value: any) {
								const newvalue = value / 1000000
								return newvalue
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
						},
						grid: {
							drawBorder: false
						}
					}
				},
				plugins: {
					legend: {
						position: 'top',

						align: 'start',
						labels: {
							font: {
								size: 15
							},
							padding: 12
						}
					},
					tooltip: {
						borderWidth: 1,
						titleFont: {
							size: 17,
							weight: '600'
						},
						bodyFont: {
							size: 15,
							weight: '400'
						},
						padding: {
							top: 12,
							right: 15,
							bottom: 12,
							left: 15
						},
						displayColors: false
					}
				}
			}}
		/>
	)
}
