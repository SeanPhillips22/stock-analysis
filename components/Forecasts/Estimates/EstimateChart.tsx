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

import { abbreviateNumber } from 'functions/numbers/abbreviateNumber'
import 'chartjs-adapter-date-fns'
import { useSymbolContext } from 'components/Layout/SymbolContext'

import { EstimateChartType, ForecastData } from 'types/Forecast'
import { formatDateYear, formatMonthLong } from 'functions/datetime/formatDates'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

type Props = {
	type: EstimateChartType
	title: string
}

export function EstimateChart({ type, title }: Props) {
	const { data }: { data: ForecastData } = useSymbolContext()
	const estimatesData = data.estimatesCharts
	const actualData = data.estimates.table.annual
	const lastDate = actualData.lastDate

	// Return empty if no data
	if (!estimatesData || !actualData[type]) {
		return (
			<div>
				<h2 className="mb-2 text-xl font-bold">{title}</h2>
				<Unavailable message="No data available" classes="h-[275px]" />
			</div>
		)
	}

	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <UnavailableSafari classes="h-[275px]" />
	}

	// Get the dates to use on the x-axis
	const dates = actualData.dates

	// Get the "actual" data (not estimates)
	const actual = actualData[type].map((i, ii) => {
		if (ii <= lastDate) return i
		return null
	})

	// Grab the high, low and avg estimates
	let high: any = [{ y: actual[lastDate], x: dates[lastDate] }]
	let low: any = [{ y: actual[lastDate], x: dates[lastDate] }]
	let avg: any = [{ y: actual[lastDate], x: dates[lastDate] }]
	Object.keys(estimatesData[type]).map(i => {
		if (i === dates[lastDate]) return
		// Push the values to the arrays
		high.push({ y: estimatesData[type][i].high, x: i })
		avg.push({ y: estimatesData[type][i].avg, x: i })
		low.push({ y: estimatesData[type][i].low, x: i })
	})

	console.log(high)

	let datasets: any[] = [
		{
			label: 'Yearly',
			data: actual,
			pointHitRadius: 10,
			pointRadius: 0,
			pointBorderWidth: 3,
			pointBorderColor: 'lightgray',
			pointBackgroundColor: 'lightgray',
			tension: 0,
			borderColor: '#0096FF',
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [0, 0]
		},
		{
			label: 'High',
			data: high,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'lightgray',
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [3, 3]
		},
		{
			label: 'Average',
			data: avg,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'lightgray',
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [3, 3]
		},
		{
			label: 'Low',
			data: low,
			borderColor: 'lightgray',
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderWidth: 2.5,
			spanGaps: true,
			borderDash: [3, 3]
		}
	]

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">{title}</h2>
			<div className="h-[275px] w-full border p-2">
				<Line
					id="1"
					data={{
						labels: dates,
						datasets: datasets
					}}
					plugins={[
						{
							id: '1',
							afterDatasetsDraw: function (chart: any) {
								const chartInstance = chart

								const ctx = chartInstance.ctx
								ctx.font =
									'bold 13px -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
								const fontSize = 12
								ctx.textAlign = 'center'
								ctx.textBaseline = 'bottom'

								const max = (arr: number[]): number => Math.max(...arr)

								chartInstance.data.datasets.forEach(function (
									dataset: { data: any[]; label: string },
									i: any
								) {
									if (dataset.label == 'Yearly') {
										const meta = chartInstance.getDatasetMeta(i)

										ctx.save()
										ctx.strokeStyle = '#323232'
										ctx.fillStyle = '#323232'
										ctx.lineWidth = '3.5'
										ctx.lineJoin = 'round'

										ctx.fillText(
											window.innerWidth > 428
												? 'Past Five Years'
												: 'Past 5 Years',
											window.innerWidth > 428
												? meta.iScale._gridLineItems[
														meta.iScale._gridLineItems.length - 2
												  ].tx1 - 302
												: meta.iScale._gridLineItems[
														meta.iScale._gridLineItems.length - 2
												  ].tx1 - 37,
											meta.iScale._gridLineItems[
												meta.iScale._gridLineItems.length - 2
											].y1
										)

										ctx.fillText(
											window.innerWidth > 428
												? 'Next Five Years'
												: 'Next 5 Years',
											window.innerWidth > 428
												? meta.iScale._gridLineItems[
														meta.iScale._gridLineItems.length - 2
												  ].tx1 - 182
												: meta.iScale._gridLineItems[
														meta.iScale._gridLineItems.length - 2
												  ].tx1 + 40,
											meta.iScale._gridLineItems[
												meta.iScale._gridLineItems.length - 2
											].y1
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
								type: 'time',
								time: {
									parser: 'yyyy-MM-dd',
									unit: 'year'
								},
								grid: {
									display: true
								},
								ticks: {
									align: 'center',
									source: 'auto',
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
								position: 'right',
								ticks: {
									color: '#323232',
									font: {
										size: 13
									},
									padding: 5,
									callback: function (value) {
										if (value == 0) {
											return 0
										}
										return abbreviateNumber(Number(value), 0)
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
								right: 0
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
										let label = tooltipItem[0].label
										let split = label.split(' ')
										let year = split[2].substring(0, 4)
										return year
									}
								}
							}
						}
					}}
				/>
			</div>
		</div>
	)
}
