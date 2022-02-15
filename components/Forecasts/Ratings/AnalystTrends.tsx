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
import { useSymbolContext } from 'components/Layout/SymbolContext'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AnalystTrends() {
	const { data } = useSymbolContext()
	const months = data.recommendations

	const labelAxis = () => months.map((item: { month: any }) => item.month)

	const analystAxis = (s: string) =>
		months.map((item: { [x: string]: any }) => item[s])

	let d: any[] = [
		{
			label: 'Strong Sell',
			data: analystAxis('strongSell'),
			backgroundColor: 'rgb(153, 0, 0)',
			barPercentage: 0.5,
			barThickness: 8,
			grouped: true,
			maxBarThickness: 8
		},
		{
			label: 'Sell',
			data: analystAxis('sell'),
			backgroundColor: 'rgb(153, 76, 0)',
			barPercentage: 0.5,
			barThickness: 8,
			maxBarThickness: 8,

			grouped: true
		},
		{
			label: 'Hold',
			data: analystAxis('hold'),
			backgroundColor: 'rgb(204, 204, 0)',
			barPercentage: 0.5,
			barThickness: 8,
			maxBarThickness: 8,

			grouped: true,
			categoryPercentage: 1
		},
		{
			label: 'Buy',
			data: analystAxis('buy'),
			backgroundColor: 'rgb(76, 153, 0)',
			barPercentage: 0.5,
			barThickness: 8,
			maxBarThickness: 8,

			grouped: true,
			categoryPercentage: 0.5
		},
		{
			label: 'Strong Buy',
			data: analystAxis('strongBuy'),
			backgroundColor: 'rgb(0, 153, 0)',
			barPercentage: 0.5,
			barThickness: 8,
			maxBarThickness: 8,

			grouped: true,
			categoryPercentage: 0.5
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
							}
						}
					},

					plugins: {
						legend: {
							display: true,
							position: 'bottom'
						}
					}
				}}
			/>
		</div>
	)
}
