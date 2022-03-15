/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	defaults
} from 'chart.js'

ChartJS.register(
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement
)

import {
	isOldSafari,
	Unavailable,
	UnavailableSafari
} from 'components/Unavailable'

import { abbreviateNumber } from 'functions/numbers/abbreviateNumber'
import { useSymbolContext } from 'components/Layout/SymbolContext'

import { EstimateChartType, ForecastData } from 'types/Forecast'
import { dec0, dec2, dec3 } from 'functions/tables/formatTableCell'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

type Props = {
	type: EstimateChartType
	title: string
}

function getYear(date: string) {
	return date.split('-')[0]
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
	const dates = actualData.dates.map(i => getYear(i))

	// Get the "actual" data (not estimates)
	const actual = actualData[type].map((i, ii) => {
		if (ii <= lastDate) return i
		return null
	})

	// Grab the high, low and avg estimates
	let high: any = [{ y: actual[lastDate], x: getYear(dates[lastDate]) }]
	let low: any = [{ y: actual[lastDate], x: getYear(dates[lastDate]) }]
	let avg: any = [{ y: actual[lastDate], x: getYear(dates[lastDate]) }]
	Object.keys(estimatesData[type]).map(i => {
		if (getYear(i) === getYear(dates[lastDate])) return
		// Push the values to the arrays
		high.push({ y: estimatesData[type][i].high, x: getYear(i) })
		avg.push({ y: estimatesData[type][i].avg, x: getYear(i) })
		low.push({ y: estimatesData[type][i].low, x: getYear(i) })
	})

	// Format the name of the data series
	let seriesName = title.includes('Forecast') ? title.split(' ')[0] : title

	let datasets: any[] = [
		{
			label: seriesName,
			data: actual,
			pointHitRadius: 10,
			pointRadius: 0,
			pointBorderWidth: 5,
			pointBorderColor: 'rgba(44, 98, 136, 1)',
			pointBackgroundColor: 'rgba(44, 98, 136, 1)',
			tension: 0,
			borderColor: 'rgba(44, 98, 136, 1)',
			borderWidth: 3,
			spanGaps: true
		},
		{
			label: 'High',
			data: high,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'rgba(44, 98, 136, 0.7)',
			borderWidth: 2,
			spanGaps: true,
			borderDash: [5, 3]
		},
		{
			label: 'Average',
			data: avg,
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderColor: 'rgba(44, 98, 136, 0.9)',
			borderWidth: 3,
			spanGaps: true,
			borderDash: [5, 3]
		},
		{
			label: 'Low',
			data: low,
			borderColor: 'rgba(44, 98, 136, 0.7)',
			pointHitRadius: 10,
			pointRadius: 0,
			tension: 0.01,
			borderWidth: 2,
			spanGaps: true,
			borderDash: [5, 3]
		}
	]

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">{title}</h2>
			<div className="h-[275px] w-full rounded-sm border p-2 shadow">
				<Line
					id="1"
					data={{
						labels: dates,
						datasets: datasets
					}}
					options={{
						maintainAspectRatio: false,
						animation: false,
						scales: {
							x: {
								grid: {
									display: false
								},
								ticks: {
									align: 'center',
									source: 'auto',
									color: '#222',
									font: {
										size: 13
									},
									autoSkip: false,
									maxRotation: 0,
									minRotation: 0,
									maxTicksLimit:
										typeof window !== 'undefined' &&
										window.innerWidth < 600
											? 7
											: 10
								}
							},
							y: {
								position: 'right',
								ticks: {
									color: '#222',
									font: {
										size: 13
									},
									padding: 5,
									callback: function (value) {
										if (value == 0) {
											return 0
										}
										if (type === 'revenue' || type === 'eps')
											return abbreviateNumber(Number(value), 0)
										if (
											type === 'revenueGrowth' ||
											type === 'epsGrowth'
										)
											return abbreviateNumber(Number(value), 0) + '%'
										return value
									},
									maxTicksLimit: 8
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
									label: function (context: any) {
										let label = context.dataset.label || ''
										// Don't show multiple labels on the same dataset
										if (
											context.label === getYear(dates[lastDate]) &&
											label !== seriesName
										) {
											return ''
										}
										const val = parseFloat(context.parsed.y) || 0
										if (type.includes('Growth'))
											return `${label}: ${dec2.format(val)}%`
										if (type === 'revenue')
											return `${label}: ${dec0.format(val)}`
										if (type === 'eps')
											return `${label}: ${dec3.format(val)}`
										else return `${label}: ${val.toString()}`
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
