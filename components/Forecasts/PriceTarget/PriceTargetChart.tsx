/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	TimeScale,
	PointElement,
	defaults
} from 'chart.js'

ChartJS.register(
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	TimeScale,
	PointElement
)

import {
	isOldSafari,
	Unavailable,
	UnavailableSafari
} from 'components/Unavailable'

import { format } from 'd3-format'
import 'chartjs-adapter-date-fns'
import { useMemo } from 'react'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatMonthLong } from 'functions/datetime/formatDates'
import { fillWhitespaceLine, formatTarget } from './target.functions'
import { collisionOffset } from './PriceTargetChart.functions'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

export function PriceTargetChart() {
	const { data } = useSymbolContext()
	let { chart } = data.targets
	const { high, average, low } = data.targets

	const hasTargets = high && average && low
	const currentDate = chart[chart.length - 2].t
	const currentPrice = chart[chart.length - 2].c
	const oneYearDate = chart[chart.length - 1].t
	const initialPrice = chart[0].c

	// An invisible time series to adjust the appearance of a chart
	// if the price history is less than 1 year
	let whiteSpaceMonths = fillWhitespaceLine(chart)

	const highData = [
		{ x: currentDate, y: currentPrice },
		{ x: oneYearDate, y: high }
	]

	const avgData = [
		{ x: currentDate, y: currentPrice },
		{ x: oneYearDate, y: average }
	]

	const lowData = [
		{ x: currentDate, y: currentPrice },
		{ x: oneYearDate, y: low }
	]

	const timeAxis = useMemo(() => chart.map((item: any) => item.t), [chart])

	const priceAxis = useMemo(() => chart.map((item: any) => item.c), [chart])

	const backgroundColorCodings = useMemo(
		() =>
			chart.map((i: any, index: number) =>
				index == chart.length - 2 ? '#000000' : '#ffffff'
			),
		[chart]
	)

	const redOrGreen =
		currentPrice - initialPrice > 0
			? 'rgba(4, 120, 87, 1)'
			: 'rgba(220, 38, 38, 1)'

	const pointBorderColorCodings = useMemo(
		() =>
			chart.map((i: any, index: number) =>
				index == chart.length - 2 ? '#000000' : redOrGreen
			),
		[chart]
	)

	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <UnavailableSafari classes="h-[275px]" />
	}

	if (timeAxis.length < 3) {
		return (
			<div className="h-[275px]">
				<Unavailable message="No price forecast data available" />
			</div>
		)
	}

	let datasets: any[] = [
		{
			label: 'Monthly',
			data: priceAxis,
			pointHitRadius: 10,
			pointRadius: 4,
			pointBorderWidth: 3,
			pointBorderColor: pointBorderColorCodings,
			pointBackgroundColor: backgroundColorCodings,
			tension: 0,
			borderColor: redOrGreen,
			borderWidth: 2.5,
			spanGaps: true
		},
		{
			label: 'Whitespace',
			data: whiteSpaceMonths,
			pointHitRadius: 0,
			pointRadius: 0,
			pointBorderWidth: 0,
			pointBorderColor: pointBorderColorCodings,
			pointBackgroundColor: backgroundColorCodings,
			tension: 0,
			borderColor: '#FFFFFF00',
			borderWidth: 2.5,
			spanGaps: true
		},
		{
			label: 'High',
			data: highData,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'rgba(4, 120, 87, 1)',
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [5, 6]
		},
		{
			label: 'Average',
			data: avgData,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'rgba(55, 65, 81)',
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [5, 6]
		},
		{
			label: 'Low',
			data: lowData,
			borderColor: 'rgba(220, 38, 38, 1)',
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [5, 6]
		}
	]

	return (
		<div className="h-[250px] xs:h-[275px]">
			<Line
				id="1"
				data={{
					labels: timeAxis,
					datasets: datasets
				}}
				plugins={[
					{
						id: '1',
						afterDatasetsDraw: function (chart: any) {
							if (!hasTargets) return
							const chartInstance = chart
							const ctx = chartInstance.ctx
							ctx.font =
								'bold 13px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
							const fontSize = 12
							ctx.textAlign = 'center'
							ctx.textBaseline = 'bottom'

							const max = (arr: number[]): number => Math.max(...arr)

							const pointerHeight = fontSize + 2
							const sideHeight = 10
							const accuracyOffset = -7.6

							const highY =
								chartInstance.getDatasetMeta(2).data[
									chartInstance.getDatasetMeta(2).data.length - 1
								].y + accuracyOffset

							const avgY =
								chartInstance.getDatasetMeta(3).data[
									chartInstance.getDatasetMeta(3).data.length - 1
								].y + accuracyOffset

							const lowY =
								chartInstance.getDatasetMeta(4).data[
									chartInstance.getDatasetMeta(4).data.length - 1
								].y + accuracyOffset

							let collisionOffsets = collisionOffset({
								highTop: highY - sideHeight * 2,
								highBottom: highY + pointerHeight,
								avgTop: avgY - sideHeight,
								avgBottom: avgY + sideHeight + pointerHeight,
								lowTop: lowY,
								lowBottom: lowY + sideHeight * 2 + pointerHeight
							})

							const width =
								max([
									ctx.measureText(lowData[lowData.length - 1].y).width,
									ctx.measureText(highData[highData.length - 1].y)
										.width,
									ctx.measureText(avgData[avgData.length - 1].y).width,
									ctx.measureText('Average').width
								]) + 10

							chartInstance.data.datasets.forEach(function (
								dataset: { data: any[]; label: string },
								i: any
							) {
								console.log(i + ' ' + dataset.label)
								if (dataset.label == 'Monthly') {
									const meta = chartInstance.getDatasetMeta(i)

									ctx.save()
									ctx.strokeStyle = '#000000'
									ctx.fillStyle = '#000000'
									ctx.lineWidth = '3.5'
									ctx.lineJoin = 'round'

									ctx.fillText(
										window.innerWidth > 428
											? 'Past 12 Months'
											: 'Past Year',
										window.innerWidth > 428
											? meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 - 55
											: meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 - 37,
										meta.iScale._gridLineItems[
											meta.iScale._gridLineItems.length - 2
										].y1
									)

									ctx.fillText(
										window.innerWidth > 428
											? '12 Month Forecast'
											: 'Next Year',
										window.innerWidth > 428
											? meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 + 65
											: meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 + 40,
										meta.iScale._gridLineItems[
											meta.iScale._gridLineItems.length - 2
										].y1
									)

									ctx.restore()
								}

								if (dataset.label == 'Average') {
									const meta = chartInstance.getDatasetMeta(i)
									const last = meta.data.length - 1

									const xPos = meta.data[last].x + 10.2
									const yPos =
										meta.data[last].y +
										accuracyOffset +
										collisionOffsets.avg

									const raw = dataset.data[last]

									const str = '$' + formatTarget(raw.y)

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.lineWidth = '0.6'
									ctx.lineJoin = 'round'

									ctx.beginPath()
									ctx.moveTo(xPos - 8.4, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos)

									ctx.moveTo(xPos - 8.7, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos + pointerHeight)
									ctx.moveTo(xPos, yPos)
									ctx.lineTo(xPos, yPos - sideHeight)
									ctx.lineTo(xPos + width, yPos - sideHeight)

									ctx.lineTo(
										xPos + width,
										yPos + sideHeight + pointerHeight
									)
									ctx.lineTo(
										xPos + 0.7,
										yPos + sideHeight + pointerHeight
									)

									ctx.lineTo(xPos, yPos + pointerHeight)

									ctx.stroke()

									ctx.closePath()

									ctx.fillStyle = 'rgba(55, 65, 81)'
									ctx.fillText(
										str,
										xPos + width - width / 2,
										yPos -
											sideHeight +
											(sideHeight * 2 + pointerHeight) / 2 +
											13
									)
									ctx.fillText(
										'Average',
										xPos + width - width / 2,
										yPos -
											sideHeight +
											(sideHeight * 2 + pointerHeight) / 2 -
											1
									)
									ctx.restore()
								}

								if (dataset.label == 'High') {
									const meta = chartInstance.getDatasetMeta(i)

									const last = meta.data.length - 1

									const raw = dataset.data[last]

									const str = '$' + formatTarget(raw.y)

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.lineWidth = '1'
									ctx.lineJoin = 'round'

									const xPos = meta.data[last].x + 10.2
									const yPos =
										meta.data[last].y +
										accuracyOffset +
										collisionOffsets.high

									ctx.beginPath()
									ctx.moveTo(xPos - 8.4, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos)
									ctx.moveTo(xPos - 8.4, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos + pointerHeight)

									ctx.moveTo(xPos, yPos)
									ctx.lineTo(xPos, yPos - sideHeight * 2)
									ctx.lineTo(xPos + width, yPos - sideHeight * 2)

									ctx.lineTo(xPos + width, yPos + pointerHeight)
									ctx.lineTo(xPos, yPos + pointerHeight)

									ctx.stroke()

									ctx.closePath()

									ctx.fillStyle = 'rgba(4, 120, 87, 1)'
									ctx.fillText(
										str,
										xPos + width - width / 2,
										yPos -
											sideHeight * 2 +
											(sideHeight * 2 + pointerHeight) / 2 +
											13
									)
									ctx.fillText(
										'High',
										xPos + width - width / 2,
										yPos -
											sideHeight * 2 +
											(sideHeight * 2 + pointerHeight) / 2 -
											1
									)
									ctx.restore()
								}

								if (dataset.label == 'Low') {
									const meta = chartInstance.getDatasetMeta(i)
									const last = meta.data.length - 1

									const raw = dataset.data[last]

									const str = '$' + formatTarget(raw.y)

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.lineWidth = '1'
									ctx.lineJoin = 'round'

									const xPos = meta.data[last].x + 10.2
									const yPos =
										meta.data[last].y +
										accuracyOffset +
										collisionOffsets.low

									ctx.beginPath()
									ctx.moveTo(xPos - 8.4, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos)

									ctx.moveTo(xPos - 8.4, yPos + pointerHeight / 2)
									ctx.lineTo(xPos, yPos + pointerHeight)
									ctx.moveTo(xPos, yPos)

									ctx.lineTo(xPos + width, yPos)

									ctx.lineTo(
										xPos + width,
										yPos + sideHeight * 2 + pointerHeight
									)

									ctx.lineTo(
										xPos,
										yPos + sideHeight * 2 + pointerHeight
									)

									ctx.lineTo(xPos, yPos + pointerHeight)
									ctx.stroke()

									ctx.closePath()

									ctx.fillStyle = 'rgba(220, 38, 38, 1)'
									ctx.fillText(
										str,
										xPos + width - width / 2,
										yPos + (sideHeight * 2 + pointerHeight) / 2 + 13
									)
									ctx.fillText(
										'Low',
										xPos + width - width / 2,
										yPos + (sideHeight * 2 + pointerHeight) / 2 - 1
									)
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
							afterTickToLabelConversion: function (val: any) {
								if (window.innerWidth < 563) {
									val.ticks.splice(0, 3)
								} else {
									val.ticks.splice(0, 1)
								}
							},
							type: 'time',
							time: {
								parser: 'yyyy-MM-dd',
								stepSize: 4,
								unit: 'month'
							},
							grid: {
								display: true
							},
							ticks: {
								align: 'end',
								source: 'data',
								color: '#323232',
								font: {
									size: 13
								},
								autoSkip: false,
								maxRotation: 0,
								minRotation: 0
							}
						},
						y: {
							suggestedMin: 0,
							position: 'left',
							ticks: {
								color: '#323232',
								font: {
									size: 13
								},
								padding: 5,
								callback: function (value) {
									let formattedValue
									if (value < 10) {
										formattedValue = format('.1~f')(Number(value))
										return '$' + formattedValue
									}

									return '$' + value
								}
							},
							grid: {
								drawBorder: true,
								color: '#efefef'
							}
						}
					},
					layout: {
						padding: {
							top: 20,
							left: 0,
							right: hasTargets ? 73 : 0
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
								title: function (tooltipItem: any) {
									let dataset = tooltipItem[0].dataset.label
									let index =
										dataset === 'Monthly'
											? tooltipItem[0].dataIndex
											: timeAxis.length - 1
									return formatMonthLong(timeAxis[index])
								},
								label: function (context: any) {
									let currlabel = context.dataset.label || ''
									let dataIndex = context.dataIndex
									let value = context.parsed.y || ''
									let date = context.label.split(', 12')[0]
									let longDate = formatMonthLong(date)
									let currentDate = formatMonthLong(
										timeAxis[timeAxis.length - 2]
									)
									if (currlabel !== 'Monthly') {
										if (dataIndex === 0) return ''
										let change = (value - currentPrice) / currentPrice
										let percentageChange =
											(change * 100).toFixed(2) + '%'
										if (change > 0)
											percentageChange = '+' + percentageChange
										return `${currlabel}: ${value} (${percentageChange})`
									} else if (longDate === currentDate) {
										return 'Latest Price: ' + value
									} else {
										return 'Month End: ' + value
									}
								}
							}
						}
					}
				}}
			/>
		</div>
	)
}
