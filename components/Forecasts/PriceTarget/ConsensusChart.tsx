import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSymbolContext } from 'components/Layout/SymbolContext'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ConsensusChart() {
	const { data } = useSymbolContext()
	const recs = data.recommendations
	const { angle } = recs[recs.length - 1]

	let d: any[] = [
		{
			data: [10, 10, 10, 10, 10],
			backgroundColor: [
				'rgb(153, 0, 0)',
				'rgb(153, 76, 0)',
				'rgb(204, 204, 0)',
				'rgb(76, 153, 0)',
				'rgb(0, 153, 0)'
			],
			borderWidth: 0
		}
	]

	return (
		<div>
			<Doughnut
				id="1"
				data={{
					datasets: d
				}}
				plugins={[
					{
						id: '1',
						afterDatasetsDraw: function (chart: any) {
							const chartInstance = chart
							const ctx = chartInstance.ctx

							const radianAngle = ((angle - 180) * Math.PI) / 180

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
					animation: false,
					radius: '70%',
					cutout: '65%',
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
