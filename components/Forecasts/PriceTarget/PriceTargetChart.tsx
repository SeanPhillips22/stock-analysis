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

// import { Unavailable } from 'components/Unavailable'
import 'chartjs-adapter-date-fns'

import { useMemo } from 'react'
import { useSymbolContext } from 'components/Layout/SymbolContext'

interface Props {
	data: AnalystChartData
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

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

const placeholderData = {
	price: [
		{ t: '2020-12-1', c: '132.69' },
		{ t: '2021-01-1', c: '131.96' },
		{ t: '2021-02-1', c: '121.26' },
		{ t: '2021-03-1', c: '122.15' },
		{ t: '2021-04-1', c: '131.46' },
		{ t: '2021-05-1', c: '124.61' },
		{ t: '2021-06-1', c: '136.96' },
		{ t: '2021-07-1', c: '145.86' },
		{ t: '2021-08-1', c: '151.83' },
		{ t: '2021-09-1', c: '141.50' },
		{ t: '2021-10-1', c: '149.80' },
		{ t: '2021-11-1', c: '165.30' },
		{ t: '2021-12-1', c: '177.57' },
		{ t: '2022-12-1', c: undefined }
	],
	targets: {
		low: '90',
		average: '175.28',
		high: '210'
	}
}

export function PriceTargetChart() {
	const { data } = useSymbolContext()
	const { high, average, low } = data.targets

	const highData = [
		{ x: '2021-12-7', y: '177.57' },
		{ x: '2022-12-1', y: high }
	]

	const avgData = [
		{ x: '2021-12-7', y: '177.57' },
		{ x: '2022-12-1', y: average }
	]

	const lowData = [
		{ x: '2021-12-7', y: '177.57' },
		{ x: '2022-12-1', y: low }
	]

	const timeAxis = useMemo(
		() => placeholderData.price.map(item => item.t),
		[placeholderData]
	)

	const priceAxis = useMemo(
		() => placeholderData.price.map(item => ({ x: item.t, y: item.c })),
		[placeholderData]
	)

	const backgroundColorCodings = useMemo(
		() =>
			placeholderData.price.map((i, index) =>
				index == 12 ? '#000000' : '#ffffff'
			),
		[placeholderData]
	)

	const pointBorderColorCodings = useMemo(
		() =>
			placeholderData.price.map((i, index) =>
				index == 12 ? '#000000' : 'rgba(4, 120, 87, 1)'
			),
		[placeholderData]
	)

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
			borderColor: 'rgba(4, 120, 87, 1)',
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
		<div className="h-[275px]">
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
							const chartInstance = chart
							const ctx = chartInstance.ctx
							ctx.font =
								'bold 12px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
							const fontSize = 12
							ctx.textAlign = 'center'
							ctx.textBaseline = 'bottom'

							const max = (arr: number[]): number => Math.max(...arr)

							const pointerHeight = fontSize + 2
							const sideHeight = 10
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
								if (dataset.label == 'Monthly') {
									const meta = chartInstance.getDatasetMeta(i)

									ctx.save()
									ctx.strokeStyle = '#000000'
									ctx.fillStyle = '#000000'
									ctx.lineWidth = '3.5'
									ctx.lineJoin = 'round'

									ctx.fillText(
										'Past 12 Months',
										meta.iScale._gridLineItems[
											meta.iScale._gridLineItems.length - 2
										].tx1 - 55,
										meta.iScale._gridLineItems[
											meta.iScale._gridLineItems.length - 2
										].y1
									)

									ctx.fillText(
										window.innerWidth > 428
											? '12 Months Forecast'
											: '1 Yr Forecast',
										window.innerWidth > 428
											? meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 + 65
											: meta.iScale._gridLineItems[
													meta.iScale._gridLineItems.length - 2
											  ].tx1 + 45,
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
									const yPos = meta.data[last].y - 7.6

									const raw = dataset.data[last]

									const str = '$' + raw.y

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.fillStyle = '#000000'
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

									const str = '$' + raw.y

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.fillStyle = '#000000' // ? not doing anything?
									ctx.lineWidth = '1'
									ctx.lineJoin = 'round'

									const xPos = meta.data[last].x + 10.2
									const yPos = meta.data[last].y - 7.6

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

									const str = '$' + raw.y

									ctx.save()

									ctx.strokeStyle = 'lightgrey'
									ctx.fillStyle = '#ffffff' // ? not doing anything?
									ctx.lineWidth = '1'
									ctx.lineJoin = 'round'

									const xPos = meta.data[last].x + 10.2
									const yPos = meta.data[last].y - 7.6

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
								let afterCutOff: boolean
								afterCutOff = false

								for (let i = 0; i < val.ticks.length; i++) {
									if (
										val.ticks[i].label == 'Dec 2021' ||
										val.ticks[i].label == 'Dec 2022'
									) {
										val.ticks[i].major = true
										afterCutOff = true
									} else if (afterCutOff) {
										val.ticks.splice(i, 1)
									}
								}
								val.ticks.splice(0, 1)

								if (window.innerWidth < 563) {
									val.ticks.splice(0, 2)
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
								autoSkipPadding: 60, // ? is this needed when autoSkip is false?
								maxRotation: 0,
								minRotation: 0,
								major: {
									enabled: true
								}
							}
						},
						y: {
							position: 'left',
							ticks: {
								color: '#555555',
								font: {
									size: 12.5
								},
								padding: 5,
								callback: function (value) {
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
							left: 5,
							right: 70
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
							displayColors: false
						}
					}
				}}
			/>
		</div>
	)
}
