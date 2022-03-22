import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { ForecastData } from 'types/Forecast'
import { isOldSafari } from 'components/Unavailable'

ChartJS.register(ArcElement, Tooltip)

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
			'rgb(148, 49, 38)',
			'rgb(203, 67, 53)',
			'rgb(204, 204, 0)',
			'rgb(67, 175, 29)',
			'rgb(0, 153, 0)'
		],
		borderColor: ['rgb(119, 21, 17)', 'rgb(172, 37, 31)', 'rgb(174, 177, 0)', 'rgb(29, 148, 0)', 'rgb(0, 136, 0)'],
		borderWidth: 1
	}
]

export function ConsensusChart() {
	const { data }: { data: ForecastData } = useSymbolContext()
	const recs = data.recommendations
	const latest = recs[recs.length - 1] ?? null
	const { angle } = recs[recs.length - 1] ?? 0

	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <div className="py-2"></div>
	}

	return (
		<div key={angle}>
			<Doughnut
				id="2"
				data={{
					labels: labels,
					datasets: d
				}}
				plugins={[
					{
						id: '2',
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
