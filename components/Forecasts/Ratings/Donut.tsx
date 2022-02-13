/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Unavailable } from 'components/Unavailable'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

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
export function Donut() {
	let data: any[] = [
		{
			data: [10, 10, 10, 10, 10],
			backgroundColor: [
				'rgb(153, 0, 0)',
				'rgb(153, 76, 0)',
				'rgb(204, 204, 0)',
				'rgb(76, 153, 0)',
				'rgb(0, 153, 0)'
			],
			borderWidth: 0,
			hoverBackgroundColor: [
				'rgb(255, 69, 96)',
				'rgb(206, 148, 73)',
				'rgb(153, 223, 89)'
			],
			hoverBorderWidth: 0
		},
		{
			data: [10, 10, 10, 10, 10],
			backgroundColor: [
				'rgb(255, 255, 255)',
				'rgb(255, 255, 255)',
				'rgb(255, 255, 255)'
			],
			borderWidth: 0,
			hoverBackgroundColor: [
				'rgb(255, 255, 255)',
				'rgb(255, 255, 255)',
				'rgb(255, 255, 255)'
			],
			hoverBorderWidth: 0
		}
	]

	const exampleDATA = [
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

	const calcAngle = () => {
		let totalAnalysts = 0
		let totalNumber = 0

		for (let i = 0; i <= exampleDATA.length - 1; i++) {
			totalNumber = totalNumber + exampleDATA[i].analysts * i
			totalAnalysts += exampleDATA[i].analysts
		}
		let avg = totalNumber / totalAnalysts
		return (avg / 4) * 180
	}

	return (
		<div className="grow">
			<Doughnut
				id="1"
				data={{
					datasets: data
				}}
				plugins={[
					{
						id: '1',
						afterDatasetsDraw: function (chart: any) {
							const chartInstance = chart
							const ctx = chartInstance.ctx

							const radianAngle = ((calcAngle() + -180) * Math.PI) / 180

							const radius = 80
							const cw = chartInstance.chartArea.width
							const ch = chartInstance.chartArea.height
							const cx = cw / 2
							const cy = ch - ch / 4 + 9

							ctx.translate(cx, cy)
							ctx.rotate(radianAngle)
							ctx.beginPath()
							ctx.moveTo(0, -5)
							ctx.lineTo(radius, 0)
							ctx.lineTo(0, 5)
							ctx.fillStyle = 'rgba(64, 64,64)'
							ctx.fill()
							ctx.rotate(-radianAngle)
							ctx.translate(-cx, -cy)
							ctx.beginPath()
							ctx.arc(cx, cy, 7, 0, Math.PI * 2)
							ctx.fill()
						}
					}
				]}
				options={{
					maintainAspectRatio: false,
					// animation: false,
					radius: '70%',
					cutout: '50%',
					rotation: 270,
					circumference: 180,

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
