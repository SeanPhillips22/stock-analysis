import { Line } from 'react-chartjs-2'

import {
	Chart as ChartJS,
	LineController,
	LineElement,
	Tooltip,
	LinearScale,
	Title,
	CategoryScale,
	defaults
} from 'chart.js'

ChartJS.register(
	LineController,
	LineElement,
	Tooltip,
	LinearScale,
	Title,
	CategoryScale
)

import { Recommendations } from 'types/Forecast'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

export function AnalystLineChart({
	recommendations
}: {
	recommendations: Recommendations[]
}) {
	const labelAxis = () => recommendations.map(item => item.month)

	const analystAxis = (s: string) =>
		recommendations.map((item: { [x: string]: any }) => item[s])

	let d: any[] = [
		{
			label: 'Strong Buy',
			data: analystAxis('strongBuy'),
			backgroundColor: 'rgb(0, 153, 0)',
			borderColor: 'rgb(0, 153, 0)',
			pointRadius: 10,
			order: 4
		},
		{
			label: 'Buy',
			data: analystAxis('buy'),
			backgroundColor: 'rgb(76, 153, 0)',
			borderColor: 'rgb(76, 153, 0)',
			order: 3
		},

		{
			label: 'Hold',
			data: analystAxis('hold'),
			backgroundColor: 'rgb(204, 204, 0)',
			borderColor: 'rgb(204, 204, 0)',
			order: 2
		},

		{
			label: 'Sell',
			data: analystAxis('sell'),
			backgroundColor: 'rgb(153, 76, 0)',
			borderColor: 'rgb(153, 76, 0)',
			order: 1
		},
		{
			label: 'Strong Sell',
			data: analystAxis('strongSell'),
			backgroundColor: 'rgb(153, 0, 0)',
			borderColor: 'rgb(153, 0, 0)',
			order: 0
		}
	]

	return (
		<div className="h-[240px]">
			<Line
				id="1"
				data={{
					labels: labelAxis(),
					datasets: d
				}}
				options={{
					maintainAspectRatio: false,
					interaction: {
						mode: 'index'
					},

					scales: {
						x: {
							ticks: {
								font: {
									size: 14
								}
							},
							grid: {
								display: false
							},
							stacked: true
						},
						y: {
							stacked: true,
							ticks: {
								font: {
									size: 14
								}
							},
							grid: {
								display: true
							},
							position: 'left'
						}
					},

					plugins: {
						tooltip: {
							titleFont: {
								size: 16,
								weight: '600'
							},
							bodyFont: {
								size: 14,
								weight: '400'
							},
							padding: {
								top: 12,
								right: 15,
								bottom: 12,
								left: 15
							},
							itemSort: (a, b) => {
								if (
									a.datasetIndex !== undefined ||
									b.datasetIndex !== undefined
								) {
									return a.datasetIndex < b.datasetIndex ? -1 : 1
								}

								return 0
							}
						},
						legend: {
							display: false
						}
					}
				}}
			/>
		</div>
	)
}
