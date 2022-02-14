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
import { useMemo } from 'react'

interface Props {
	chartData: AnalystChartData
}

interface AnalystPrice {
	t: string
	c?: string
}

interface AnalystTarget {
	low: string
	average: string
	high: string
}

interface AnalystChartData {
	price: AnalystPrice[]
	targets: AnalystTarget
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AnalystTrend() {
	const { data } = useSymbolContext()
	const { buy, sell, hold, strongBuy, strongSell } = data.recommendations[0]

	const exampleDATA = [
		{
			month: 'January',
			analyst: [
				{
					category: 'Strong Buy',
					analysts: 5
				},
				{
					category: 'Buy',
					analysts: 3
				},
				{
					category: 'Hold',
					analysts: 1
				},
				{
					category: 'Sell',
					analysts: 3
				},
				{
					category: 'Strong Sell',
					analysts: 5
				}
			]
		},
		{
			month: 'February',
			analyst: [
				{
					category: 'Strong Buy',
					analysts: 10
				},
				{
					category: 'Buy',
					analysts: 3
				},
				{
					category: 'Hold',
					analysts: 2
				},
				{
					category: 'Sell',
					analysts: 7
				},
				{
					category: 'Strong Sell',
					analysts: 3
				}
			]
		},
		{
			month: 'March',
			analyst: [
				{
					category: 'Strong Buy',
					analysts: 7
				},
				{
					category: 'Buy',
					analysts: 3
				},
				{
					category: 'Hold',
					analysts: 7
				},
				{
					category: 'Sell',
					analysts: 0
				},
				{
					category: 'Strong Sell',
					analysts: 10
				}
			]
		},
		{
			month: 'April',
			analyst: [
				{
					category: 'Strong Buy',
					analysts: 7
				},
				{
					category: 'Buy',
					analysts: 10
				},
				{
					category: 'Hold',
					analysts: 5
				},
				{
					category: 'Sell',
					analysts: 2
				},
				{
					category: 'Strong Sell',
					analysts: 0
				}
			]
		}
	]

	const labelAxis = () => exampleDATA.map(item => item.month)
	console.log(labelAxis())

	const analystAxis = (i: number) =>
		exampleDATA.map(item => item.analyst[i].analysts)

	let d: any[] = [
		{
			label: 'Strong Sell',
			data: analystAxis(4),
			backgroundColor: 'rgb(153, 0, 0)',
			barPercentage: 0.5,
			barThickness: 35,
			grouped: true,
			maxBarThickness: 35
		},
		{
			label: 'Sell',
			data: analystAxis(3),
			backgroundColor: 'rgb(153, 76, 0)',
			barPercentage: 0.5,
			barThickness: 35,
			maxBarThickness: 35,

			grouped: true
		},
		{
			label: 'Hold',
			data: analystAxis(2),
			backgroundColor: 'rgb(204, 204, 0)',
			barPercentage: 0.5,
			barThickness: 35,
			maxBarThickness: 35,

			grouped: true,
			categoryPercentage: 1
		},
		{
			label: 'Buy',
			data: analystAxis(1),
			backgroundColor: 'rgb(76, 153, 0)',
			barPercentage: 0.5,
			barThickness: 35,
			maxBarThickness: 35,

			grouped: true,
			categoryPercentage: 0.5
		},
		{
			label: 'Strong Buy',
			data: analystAxis(0),
			backgroundColor: 'rgb(0, 153, 0)',
			barPercentage: 0.5,
			barThickness: 35,
			maxBarThickness: 35,

			grouped: true,
			categoryPercentage: 0.5
		}
	]

	return (
		<div className="grow">
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
							display: false
						}
					}
				}}
			/>
		</div>
	)
}
