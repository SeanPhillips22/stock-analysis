import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { ForecastData } from 'types/Forecast'

ChartJS.register(ArcElement, Tooltip, Legend)

type IDs = 'strongSell' | 'sell' | 'hold' | 'buy' | 'strongBuy'

const labels = ['Strong Sell', 'Sell', 'Hold', 'Buy', 'Strong Buy']

const labelIds: { name: string; id: IDs }[] = [
	{ name: 'Strong Sell', id: 'strongSell' },
	{ name: 'Sell', id: 'sell' },
	{ name: 'Hold', id: 'hold' },
	{ name: 'Buy', id: 'buy' },
	{ name: 'Strong Buy', id: 'strongBuy' }
]

const d = [
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

export function ConsensusChart() {
	const { data }: { data: ForecastData } = useSymbolContext()
	const recs = data.recommendations

	const latest = recs[recs.length - 1] ?? null
	const { angle } = recs[recs.length - 1] ?? 0

	return (
		<div>
			<Doughnut
				id="1"
				data={{
					labels: labels,
					datasets: d
				}}
				plugins={[
					{
						id: '1',
						afterDatasetsDraw: function (chart: any) {
							if (!angle) return
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
						},
						tooltip: {
							enabled: true,
							titleFont: {
								size: 17,
								weight: '600'
							},
							bodyFont: {
								size: 16,
								weight: '400'
							},
							callbacks: {
								title: function (tooltipItem: any) {
									return tooltipItem[0].label
								},
								label: function (context: any) {
									let label = context.label || ''
									let findId = labelIds.find(x => x.name === label)
									let id: IDs = findId ? findId.id : 'hold'
									let value = latest ? latest[id] : 0
									return ` ${value}`
								}
							}
						}
					}
				}}
			/>
		</div>
	)
}
