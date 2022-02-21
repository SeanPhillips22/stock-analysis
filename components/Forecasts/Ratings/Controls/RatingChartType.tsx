import { Dropdown } from 'components/Dropdown/_Dropdown'
import { forecastState } from 'components/Forecasts/forecast.state'
import { cn } from 'functions/helpers/classNames'

// TODO - Make selection persistent in localStorage
export function RatingChartType() {
	const type = forecastState(state => state.chartType)
	const setType = forecastState(state => state.setChartType)

	return (
		<Dropdown title={type}>
			<div
				className={cn('dd-option', type === 'Bar Chart' ? 'active' : '')}
				onClick={() => setType('Bar Chart')}
			>
				Bar Chart
			</div>
			<div
				className={cn('dd-option', type === 'Line Chart' ? 'active' : '')}
				onClick={() => setType('Line Chart')}
			>
				Line Chart
			</div>
		</Dropdown>
	)
}
