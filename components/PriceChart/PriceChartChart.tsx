import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	LineController,
	LineElement,
	PointElement,
	Tooltip,
	LinearScale,
	CategoryScale,
	Filler,
	defaults
} from 'chart.js'

ChartJS.register(
	LineController,
	LineElement,
	PointElement,
	Tooltip,
	LinearScale,
	CategoryScale,
	Filler
)

import {
	formatDateTimestamp,
	formatDateClean,
	formatDateMinute,
	formatDateDay,
	formatDateMonth,
	formatDateYear
} from 'functions/datetime/formatDates'
import { Unavailable } from 'components/Unavailable'
import { Info } from 'types/Info'
import { ChartDataPoint } from 'types/Charts'
import { useEffect, useMemo, useState } from 'react'
import { getChartColor } from './PriceChart.functions'
import { Quote } from 'types/Quote'

interface Props {
	chartData: ChartDataPoint[]
	chartTime: string
	info: Info
	quote: Quote
	changeProps: any
}

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

export const Chart = ({
	chartData,
	chartTime,
	info,
	quote,
	changeProps
}: Props) => {
	const [change, setChange] = useState(changeProps.change)
	const [lineColor, setLineColor] = useState(changeProps.lineColor)
	const [count] = useState(chartData.length)

	// Refresh the change and line color
	useEffect(() => {
		const fresh = getChartColor(chartData, chartTime, quote)
		if (fresh) {
			setChange(fresh.change)
			setLineColor(fresh.lineColor)
		}
	}, [chartData, chartTime, quote])

	const timeAxis = useMemo(
		() =>
			chartData.map((item) => {
				return item.t
			}),
		[chartData]
	)

	const priceAxis = useMemo(
		() =>
			chartData.map((item) => {
				return item.c
			}),
		[chartData]
	)

	const changeWithoutComma = Number(quote.cl.replace(',', ''))

	const prevCloseLine = useMemo(
		() =>
			chartData.map(() => {
				return changeWithoutComma
			}),
		[chartData, changeWithoutComma]
	)

	// Chart.js causes critical errors on older Safari versions
	if (
		typeof window !== 'undefined' &&
		typeof window.ResizeObserver === 'undefined'
	) {
		return (
			<Unavailable
				message="This chart does not work in your browser. Please update to the latest browser version."
				small={true}
			/>
		)
	}

	let data: any[] = [
		{
			label: 'Stock Price',
			data: priceAxis,
			borderColor: lineColor,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderWidth: 2.5,
			spanGaps: true,
			fill: true,
			backgroundColor: (dataset: any) => {
				const ctx = dataset.chart.ctx
				const gradient = ctx.createLinearGradient(0, 0, 0, 300)
				if (change < 0) {
					gradient.addColorStop(0, 'rgba(220, 38, 38, 0.8)')
					gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
				} else if (change > 0) {
					gradient.addColorStop(0, 'rgba(4, 120, 87, 1)')
					gradient.addColorStop(1, 'rgba(255,255,255,0)')
				} else {
					gradient.addColorStop(0, 'rgba(100, 100, 100, 1)')
					gradient.addColorStop(1, 'rgba(255,255,255,0)')
				}

				return gradient
			}
		}
	]

	// Add previous close label to 1D charts
	if (chartTime === '1D') {
		data = [
			...data,
			{
				label: 'Previous Close',
				data: prevCloseLine,
				borderColor: 'rgb(100, 100, 100)',
				pointHitRadius: 0,
				pointRadius: 0,
				borderDash: [1.5, 8],
				tension: 0.01,
				borderWidth: 1,
				spanGaps: true
			}
		]
	}

	let id = info.symbol + '-' + chartTime

	return (
		<Line
			id={id}
			data={{
				labels: timeAxis,
				datasets: data
			}}
			plugins={[
				{
					id: id,
					afterDatasetsDraw: function (chart: any) {
						const chartInstance = chart
						const ctx = chartInstance.ctx
						ctx.font =
							'12px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
						const fontSize = 12
						ctx.textAlign = 'start'
						ctx.textBaseline = 'bottom'

						chartInstance.data.datasets.forEach(function (
							dataset: { data: any[]; label: string },
							i: any
						) {
							if (dataset.label == 'Stock Price') {
								const meta = chartInstance.getDatasetMeta(i)

								const last = meta.data.length - 1 // The last index of the array, so that the latest stock price is shown

								// numericals are offsets for positional purposes, x and y marks the exact coordinates of the graph end.
								const x = meta.data[last].x + 32.5
								const y = meta.data[last].y - 10

								// retrieve the stock price, data.
								const raw = parseFloat(dataset.data[last])
								// const str = dataset.data[last];
								const str = raw.toFixed(2)

								// begin drawing and styling

								ctx.save()

								ctx.strokeStyle = lineColor
								ctx.fillStyle = lineColor
								ctx.lineWidth = '3.5'
								ctx.lineJoin = 'round'

								// calculate the width of the box and height is based on fontsize.
								const width = ctx.measureText(str).width + 0.4
								const xPos = x - 23
								const height = fontSize + 2.8
								const yPos = y + 1.5

								// draw triangle to form a pointer.
								ctx.beginPath()
								ctx.moveTo(xPos - 7.7, yPos + 1.5 + height / 2)
								ctx.lineTo(xPos + 0.7, yPos + 2.5 + height)
								ctx.lineTo(xPos + 0.7, yPos + 0.5)
								ctx.fill()
								ctx.closePath()

								// draw the box
								ctx.strokeRect(xPos + 2, yPos + 1.5, width, height)
								ctx.fillRect(xPos + 2, yPos + 1.5, width, height)

								// draw the text
								ctx.fillStyle = '#ffffff'
								ctx.fillText(str, x - 22, meta.data[last].y + 7.4)
								ctx.restore()
							}
						})
					}
				}
			]}
			options={{
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							callback: function (index: number | string) {
								if (typeof index == 'string') {
									index = parseInt(index)
								}

								if (
									chartTime === '1Y' ||
									chartTime === '6M' ||
									chartTime === 'YTD'
								) {
									return formatDateMonth(timeAxis[index])
								} else if (chartTime === '1D') {
									const lbl = formatDateMinute(timeAxis[index])
									// Remove leftmost ticks to prevent chart being pushed from the left
									if (
										lbl.split(':')[0] == '9' &&
										lbl.split(':')[1] == '30 AM'
									) {
										return null
									}
									if (count > 180 && lbl.split(':')[0] === '9') {
										return null
									}
									if (count > 60 && lbl.split(':')[0] == '9') {
										let lblB = lbl.split(':')[1]
										let lblC = lblB.split(' ')[0]
										if (Number(lblC) < 36) {
											return null
										}
									}
									return formatDateMinute(timeAxis[index])
								} else if (chartTime === '5D') {
									return formatDateDay(timeAxis[index])
								} else if (chartTime === '1M') {
									return formatDateDay(timeAxis[index])
								} else if (chartTime === '5Y' || chartTime === 'MAX') {
									return formatDateYear(timeAxis[index])
								} else {
									return formatDateClean(timeAxis[index])
								}
							},
							color: '#323232',
							font: {
								size: 13
							},
							autoSkip: true,
							autoSkipPadding: 20,
							maxRotation: 0,
							minRotation: 0,
							maxTicksLimit: ['5D', '5Y', 'MAX'].includes(chartTime)
								? 5
								: undefined
						}
					},
					y: {
						position: 'right',
						ticks: {
							color: '#555555',
							font: {
								size: 12.5
							},
							padding: 5
						},
						grid: {
							drawBorder: false,
							color: '#efefef'
						}
					}
				},
				layout: {
					padding: {
						left: 5,
						right: 11
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true,
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
						displayColors: false,
						callbacks: {
							title: function (tooltipItem: { label: string }[]) {
								if (chartTime === '1Y') {
									return formatDateClean(tooltipItem[0].label)
								} else if (chartTime === '1D' || chartTime === '5D') {
									return formatDateTimestamp(tooltipItem[0].label)
								} else if (chartTime === '5Y' || chartTime === 'MAX') {
									return (
										'Week of ' + formatDateClean(tooltipItem[0].label)
									)
								}
								return formatDateClean(tooltipItem[0].label)
							},
							label: function (context: {
								label: string
								dataset: { label?: string | undefined }
								parsed: { y: number }
							}) {
								let currlabel = context.dataset.label || ''
								const value = context.parsed.y || ''
								if (currlabel && value) {
									if (
										context.label === timeAxis[timeAxis.length - 1]
									) {
										currlabel = 'Latest Price: ' + value
									} else {
										let label =
											chartTime === '1D' || chartTime === '5D'
												? 'Price'
												: 'Closing Price'
										currlabel = label + ': ' + value
									}
								}
								return currlabel
							}
						}
					}
				}
			}}
		/>
	)
}
