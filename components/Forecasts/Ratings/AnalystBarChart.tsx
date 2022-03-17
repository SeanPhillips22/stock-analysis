import { Bar } from 'react-chartjs-2'

import {
	Chart as ChartJS,
	BarController,
	BarElement,
	Tooltip,
	LinearScale,
	CategoryScale,
	defaults
} from 'chart.js'

ChartJS.register(BarController, BarElement, Tooltip, LinearScale, CategoryScale)

import useMediaQuery from 'hooks/useMediaQuery'
import { Recommendations } from 'types/Forecast'
import { forecastState } from '../forecast.state'
import { useEffect, useState } from 'react'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

type Props = {
	data: Recommendations[]
}

export function AnalystBarChart({ data }: Props) {
	const mobile = useMediaQuery('(max-width: 768px)')
	const history = forecastState(state => state.history)
	const [thickness, setThickness] = useState(16)

	useEffect(() => {
		if (!mobile) {
			if (history === '5 Years') {
				setThickness(13)
			} else {
				setThickness(31)
			}
		}
	}, [history, mobile])

	const labelAxis = () => data.map(item => item.month)

	const analystAxis = (s: string) =>
		data.map((item: { [x: string]: any }) => item[s])

	let d: any[] = [
		{
			label: 'Strong Buy',
			data: analystAxis('strongBuy'),
			backgroundColor: 'rgb(0, 153, 0)',
			barPercentage: 0.5,
			barThickness: thickness,
			maxBarThickness: thickness,
			order: 4
		},
		{
			label: 'Buy',
			data: analystAxis('buy'),
			backgroundColor: 'rgb(67, 175, 29)',
			barPercentage: 0.5,
			barThickness: thickness,
			maxBarThickness: thickness,
			order: 3
		},

		{
			label: 'Hold',
			data: analystAxis('hold'),
			backgroundColor: 'rgb(204, 204, 0)',
			barPercentage: 0.5,
			barThickness: thickness,
			maxBarThickness: thickness,
			order: 2
		},

		{
			label: 'Sell',
			data: analystAxis('sell'),
			backgroundColor: 'rgb(203, 67, 53)',
			barPercentage: 0.5,
			barThickness: thickness,
			maxBarThickness: thickness,
			order: 1
		},
		{
			label: 'Strong Sell',
			data: analystAxis('strongSell'),
			backgroundColor: 'rgb(148, 49, 38)',
			barPercentage: 0.5,
			barThickness: thickness,
			maxBarThickness: thickness,
			order: 0
		}
	]

	return (
		<div className="h-[240px]">
			<Bar
				id="3"
				data={{
					labels: labelAxis(),
					datasets: d
				}}
				options={{
					maintainAspectRatio: false,
					animation: false,
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
							boxPadding: 3,
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
