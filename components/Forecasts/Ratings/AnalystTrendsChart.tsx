/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Unavailable } from 'components/Unavailable'

import { Bar } from 'react-chartjs-2'

import {
	Chart as ChartJS,
	BarController,
	BarElement,
	Tooltip,
	LinearScale,
	Title,
	CategoryScale,
	defaults
} from 'chart.js'

ChartJS.register(
	BarController,
	BarElement,
	Tooltip,
	LinearScale,
	Title,
	CategoryScale
)

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

import { useSymbolContext } from 'components/Layout/SymbolContext'
import useMediaQuery from 'hooks/useMediaQuery'

// TODO add a dropdown to select up to 4 years of data
// TODO add an export button
export function AnalystTrendsChart() {
	const { data } = useSymbolContext()
	const months = data.recommendations
	const mobile = useMediaQuery('(max-width: 768px)')

	const labelAxis = () => months.map((item: { month: any }) => item.month)

	const analystAxis = (s: string) =>
		months.map((item: { [x: string]: any }) => item[s])

	// TODO modify colors so that the difference between each is more obvious
	let d: any[] = [
		{
			label: 'Strong Buy',
			data: analystAxis('strongBuy'),
			backgroundColor: 'rgb(0, 153, 0)',
			barPercentage: 0.5,
			barThickness: mobile ? 16 : 30,
			maxBarThickness: mobile ? 16 : 30,
			order: 4
		},
		{
			label: 'Buy',
			data: analystAxis('buy'),
			backgroundColor: 'rgb(76, 153, 0)',
			barPercentage: 0.5,
			barThickness: mobile ? 16 : 30,
			maxBarThickness: mobile ? 16 : 30,
			order: 3
		},

		{
			label: 'Hold',
			data: analystAxis('hold'),
			backgroundColor: 'rgb(204, 204, 0)',
			barPercentage: 0.5,
			barThickness: mobile ? 16 : 30,
			maxBarThickness: mobile ? 16 : 30,
			order: 2
		},

		{
			label: 'Sell',
			data: analystAxis('sell'),
			backgroundColor: 'rgb(153, 76, 0)',
			barPercentage: 0.5,
			barThickness: mobile ? 16 : 30,
			maxBarThickness: mobile ? 16 : 30,
			order: 1
		},
		{
			label: 'Strong Sell',
			data: analystAxis('strongSell'),
			backgroundColor: 'rgb(153, 0, 0)',
			barPercentage: 0.5,
			barThickness: mobile ? 16 : 30,
			maxBarThickness: mobile ? 16 : 30,
			order: 0
		}
	]

	return (
		<div className="h-[250px]">
			<Bar
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
							itemSort: function (a, b) {
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
							reverse: true,
							display: true,
							position: 'bottom'
						}
					}
				}}
			/>
		</div>
	)
}
