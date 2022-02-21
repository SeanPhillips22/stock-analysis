/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Unavailable } from 'components/Unavailable'
import useMediaQuery from 'hooks/useMediaQuery'
import { ForecastData } from 'types/Forecast'
import { useEffect, useState } from 'react'
import { authState } from 'state/authState'
import { forecastState } from '../forecast.state'
import { AnalystBarChart } from './AnalystBarChart'
import { AnalystLineChart } from './AnalystLineChart'

export function AnalystTrendsChart({ data }: { data: ForecastData }) {
	const recs = data.recommendations
	const history = forecastState(state => state.history)
	const chartSelected = forecastState(state => state.chartType)
	const isPro = authState(state => state.isPro)

	const [months, setMonths] = useState(recs)
	const [chartType, setChartType] = useState(chartSelected)

	useEffect(() => {
		if (isPro) {
			if (history === '1 Year') setMonths(recs.slice(recs.length - 13))
			if (history === '2 Years') setMonths(recs.slice(recs.length - 25))
			if (history === '5 Years') setMonths(recs)
		}
		if (chartSelected == 'Bar Chart') {
			setChartType('Bar Chart')
		} else {
			setChartType('Line Chart')
		}
	}, [history, chartSelected, isPro, data, recs])

	return (
		<div className="h-[240px]">
			{chartType == 'Bar Chart' ? (
				<AnalystBarChart recommendations={months} />
			) : (
				<AnalystLineChart recommendations={months} />
			)}
		</div>
	)
}
