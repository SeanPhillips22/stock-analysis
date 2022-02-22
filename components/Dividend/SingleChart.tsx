import { useMemo } from 'react'
import { formatDateClean } from 'functions/datetime/formatDates'
import { format } from 'd3-format'
import { isOldSafari, UnavailableSafari } from 'components/Unavailable'

import { Line } from 'react-chartjs-2'
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

const countZero = (cutter: number[]) => {
	let count = 0
	for (let i = 0; i < cutter.length; i++) {
		const zeroCheck = cutter[i]
		if (zeroCheck !== 0) {
			break
		}
		count++
	}
	return count
}

interface Props {
	xdata: string[]
	ydata: number[]
	type: string
	title: string
}

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

export const SingleChart = ({ xdata, ydata, type, title }: Props) => {
	const x = useMemo(() => xdata.slice(countZero(ydata)), [xdata, ydata])
	const y = useMemo(() => ydata.slice(countZero(ydata)), [ydata])

	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <UnavailableSafari classes="h-72" />
	}

	if (x.length === 0) {
		return null
	}

	return (
		<div className="h-72 border border-gray-200 p-0.5 xs:p-1">
			<Line
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
				plugins={[
					{
						id: '1',
						afterDatasetsDraw: function (chart: any) {
							const chartInstance = chart
							const ctx = chartInstance.ctx
							ctx.font =
								'13px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
							ctx.textAlign = 'start'
							ctx.textBaseline = 'bottom'

							chartInstance.data.datasets.forEach(function (
								dataset: { data: any[] },
								i: any
							) {
								const meta = chartInstance.getDatasetMeta(i)

								const last = meta.data.length - 1 // The last index of the array, so that the latest stock price is shown
								if (meta.data.length == 0 || dataset.data[last] == 0)
									return

								// numericals are offsets for positional purposes, x and y marks the exact coordinates of the graph end.

								const x =
									meta.vScale._labelItems[
										meta.vScale._labelItems.length - 1
									].translation[0] - 0.5

								const y = meta.data[last].y - 9
								let str = dataset.data[last]
								// retrieve the stock price, data.

								if (type == 'percentage') {
									str = format('.2%')(Number(str) / 100) // rounded percentage, "12%"
								} else {
									if (Number(str) >= 1) {
										str = format('.2~f')(str)
									} else if (Number(str) < 0.1) {
										str = format('.4~f')(str)
									} else if (Number(str) < 1) {
										str = format('.3~f')(str)
									}
								}

								// const str = dataset.data[last];

								// begin drawing and styling

								ctx.save()

								ctx.strokeStyle = '#2c6288'
								ctx.fillStyle = '#2c6288'
								ctx.lineWidth = '3.5'
								ctx.lineJoin = 'round'

								// calculate the width of the box and height is based on fontsize.
								const width = ctx.measureText(str).width + 1.2
								const height = 14.8

								// draw triangle to form a pointer.
								ctx.beginPath()
								ctx.moveTo(x - 7.7, y + 1.5 + height / 2)
								ctx.lineTo(x + 0.7, y + 2.5 + height)
								ctx.lineTo(x + 0.7, y + 0.5)
								ctx.fill()
								ctx.closePath()

								// draw the box
								ctx.strokeRect(x + 2, y + 1.5, width, height)
								ctx.fillRect(x + 2, y + 1.5, width, height)

								// draw the text
								ctx.fillStyle = '#ffffff'
								ctx.fillText(str, x + 1.5, y + 16.5)
								ctx.restore()
							})
						}
					}
				]}
				options={{
					layout: {
						padding: {
							right: 20
						}
					},
					maintainAspectRatio: false,
					scales: {
						x: {
							ticks: {
								color: '#323232',
								font: {
									size: 13
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
									size: 13
								},
								padding: 5,
								callback: function (value: number | string) {
									if (type === 'amount') {
										if (typeof value === 'string') {
											value = parseFloat(value)
										}
										const newvalue = value.toFixed(2)
										return newvalue
									}
									return value + '%'
								}
							},
							grid: {
								drawBorder: false
							}
						}
					},
					animation: false,
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: true,
							text: title,
							font: {
								size: 18,
								weight: '500'
							},
							color: '#333',
							padding: {
								top: 10,
								bottom: 12
							}
						},
						tooltip: {
							backgroundColor: '#f6f7f8',
							borderColor: '#ccc',
							borderWidth: 1,
							titleColor: '#323232',
							bodyColor: '#323232',
							titleFont: {
								size: 17,
								weight: '600'
							},
							bodyFont: {
								size: 15,
								weight: '400'
							},
							padding: {
								top: 10,
								right: 15,
								bottom: 10,
								left: 15
							},
							displayColors: false,
							callbacks: {
								title: function (tooltipItem: { label: string }[]) {
									return formatDateClean(tooltipItem[0].label)
								},
								label: function (context: { parsed: { y: number } }) {
									if (type === 'amount') {
										const newvalue = context.parsed.y.toFixed(3)
										return newvalue
									}
									const newvalue = context.parsed.y.toFixed(2)
									return newvalue + '%'
								}
							}
						}
					}
				}}
			/>
		</div>
	)
}
