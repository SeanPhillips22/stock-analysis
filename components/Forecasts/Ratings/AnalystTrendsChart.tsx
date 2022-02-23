import { ForecastData } from 'types/Forecast'
import { useEffect, useState } from 'react'
import { authState } from 'state/authState'
import { forecastState } from '../forecast.state'
import { AnalystBarChart } from './AnalystBarChart'
import { AnalystLineChart } from './AnalystLineChart'
import {
	isOldSafari,
	Unavailable,
	UnavailableSafari
} from 'components/Unavailable'

export function AnalystTrendsChart({ data }: { data: ForecastData }) {
	const recs = data.recommendations
	const history = forecastState(state => state.history)
	const chartType = forecastState(state => state.chartType)
	const isPro = authState(state => state.isPro)
	const [months, setMonths] = useState(recs)

	useEffect(() => {
		if (isPro) {
			if (history === '1 Year') setMonths(recs.slice(recs.length - 13))
			if (history === '2 Years') setMonths(recs.slice(recs.length - 25))
			if (history === '5 Years') setMonths(recs)
		}
	}, [history, isPro, data, recs])

	// Chart.js causes critical errors on older Safari versions
	if (isOldSafari()) {
		return <UnavailableSafari classes="mt-2 h-[240px]" />
	}

	if (!months.length) {
		return (
			<div className="mt-2 h-[240px]">
				<Unavailable message="No data available" />
			</div>
		)
	}

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