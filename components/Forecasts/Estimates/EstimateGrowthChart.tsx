/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Chart } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	defaults
} from 'chart.js'

import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars'

ChartJS.register(
	LineController,
	LineElement,
	LinearScale,
	CategoryScale,
	PointElement,
	BarWithErrorBarsController,
	BarWithErrorBar
)

import { isOldSafari, Unavailable, UnavailableSafari } from 'components/Unavailable'

import { abbreviateNumber } from 'functions/numbers/abbreviateNumber'
import { useSymbolContext } from 'components/Layout/SymbolContext'

import { EstimateChartType, ForecastData } from 'types/Forecast'
import { dec2 } from 'functions/tables/formatTableCell'
import { EstimateChartTable } from './EstimateChartTable'

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

type Props = {
	type: EstimateChartType
	title: string
}

function getYear(date: string) {
	return date.split('-')[0]
}

export function EstimateGrowthChart({ type, title }: Props) {
	const { data }: { data: ForecastData } = useSymbolContext()
	const estimatesData = data.estimatesCharts
	const actualData = data.estimates.table.annual
	const lastDate = actualData.lastDate
	const lastActualDate = actualData.dates?.[lastDate]

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

	// Get the "actual" data (not estimates)
	let actual: any[] = []
	actualData[type].forEach((item, index) => {
		//If item is null, then it doesn't get added (no empty year columns)
		if (item === null) return
		if (index <= lastDate)
			actual.push({
				x: getYear(actualData['dates'][index]),
				y: item,
				yMax: undefined,
				yMin: undefined
			})
	})

	let estimateArr: any[] = []

	Object.keys(estimatesData[type]).map(i => {
		//This if sentence is a duplicate years fix, causes a visual error.
		if (getYear(i) === actual[actual.length - 1]?.x) return
		estimateArr.push({
			y: estimatesData[type][i].avg,
			x: getYear(i),
			yMax: estimatesData[type][i].high,
			yMin: estimatesData[type][i].low
		})
	})

	let combinedActualandEstimates = actual.concat(estimateArr)

	const backgroundColorCodings = combinedActualandEstimates.map((item, index) => {
		if (item.y < 0) {
			return index <= lastDate ? 'rgba(220, 38, 38, 0.8)' : 'rgba(220, 38, 38, 0.6)'
		}
		//If ymax is undefined, then it's not an estimate.
		return typeof item.yMax == 'undefined' ? 'rgba(4, 120, 87, 0.8)' : 'rgba(4, 120, 87, 0.6)'
	})

	// Format the name of the data series
	let seriesName = title.includes('Forecast') ? title.split(' ')[0] : title

	let datasets: any[] = [
		{
			label: seriesName,
			data: combinedActualandEstimates,
			spanGaps: true,
			backgroundColor: backgroundColorCodings
		}
	]

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">{title}</h2>
			<div className="rounded-sm border p-2 shadow">
				<div className="h-[275px] w-full">
					<Chart
						type={BarWithErrorBarsController.id}
						data={{
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
										maxTicksLimit: typeof window !== 'undefined' && window.innerWidth < 600 ? 7 : 10
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
											if (value == 0) return 0

											return abbreviateNumber(Number(value), 0) + '%'
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

											if (context.dataIndex <= lastDate) {
												return `${label}: ${dec2.format(parseFloat(context.parsed.y) || 0)}%`
											}

											return [
												`High: ${dec2.format(parseFloat(context.parsed.yMax) || 0)}%`,
												`Average: ${dec2.format(parseFloat(context.parsed.y) || 0)}%`,
												`Low: ${dec2.format(parseFloat(context.parsed.yMin) || 0)}%`
											]
										}
									}
								}
							}
						}}
					/>
				</div>
				<EstimateChartTable title={seriesName} data={estimatesData} type={type} lastActualDate={lastActualDate} />
			</div>
		</div>
	)
}
