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

import { isOldSafari, UnavailableSafari } from 'components/Unavailable'

interface Props {
	title: string
	x: string[]
	y: number[]
}

export const StatsChart = ({ title, x, y }: Props) => {
	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return (
			<UnavailableSafari classes="mt-4 mb-3 h-[300px] sm:mb-4 sm:h-[390px]" />
		)
	}

	defaults.font.family =
		"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

	return (
		<div className="mt-4 mb-3 h-[300px] border border-gray-200 p-1 sm:mb-4 sm:h-[390px] sm:p-2">
			<Bar
				id={'1'}
				data={{
					labels: x,
					datasets: [
						{
							data: y,
							backgroundColor: 'rgba(44, 98, 136, 1)',
							borderColor: 'rgba(44, 98, 136, 1)',
							hoverBackgroundColor: 'rgba(44, 98, 136, 1)',
							hoverBorderColor: 'rgba(44, 98, 136, 1)'
						}
					]
				}}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						x: {
							ticks: {
								color: '#323232',
								font: {
									size: 15
								}
							},
							grid: {
								display: false
							}
						},
						y: {
							position: 'right',
							ticks: {
								color: '#323232',
								font: {
									size: 15
								},
								padding: 5
							},
							grid: {
								drawBorder: false
							}
						}
					},
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: true,
							text: title,
							font: {
								size: 24,
								weight: 'normal'
							},
							color: '#333',
							padding: {
								top: 10,

								bottom: 12
							}
						},
						tooltip: {
							borderWidth: 1,
							titleFont: {
								size: 18,
								weight: '600'
							},
							bodyFont: {
								size: 15,
								weight: '400'
							},

							padding: {
								top: 6,
								right: 15,
								bottom: 6,
								left: 15
							},
							displayColors: false,
							callbacks: {
								label: function (tooltipItem: {
									formattedValue: string
								}) {
									return 'IPOs: ' + tooltipItem.formattedValue
								}
							}
						}
					},
					animation: {
						duration: 1,
						onProgress: function (animation) {
							if (
								typeof window !== 'undefined' &&
								window.innerWidth > 500
							) {
								const instance = animation.chart
								const ctx = instance.ctx
								const size = x.length > 12 ? '13px' : '14 px'

								ctx.font =
									size +
									' -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
								ctx.fillStyle = '#222222'
								ctx.textAlign = 'center'
								ctx.textBaseline = 'bottom'

								instance.data.datasets.forEach(function (
									dataset: any,
									i: any
								) {
									const meta = instance.getDatasetMeta(i)
									meta.data.forEach(function (
										bar: { x: any; y: number },
										index: number
									) {
										const data = y[index]
										ctx.fillText(data.toString(), bar.x, bar.y - 5)
									})
								})
							}
						}
					}
				}}
			/>
		</div>
	)
}
