import { Popover } from '@headlessui/react'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { forecastState } from 'components/Forecasts/forecast.state'
import { cn } from 'functions/helpers/classNames'

export function RatingChartType() {
	const type = forecastState(state => state.chartType)
	const setType = forecastState(state => state.setChartType)

	return (
		<Dropdown title={type}>
			<Popover.Button as="div">
				<div
					className={cn('dd', type === 'Bar Chart' ? 'active' : '')}
					onClick={() => setType('Bar Chart')}
					tabIndex={0}
				>
					Bar Chart
				</div>
			</Popover.Button>
			<Popover.Button as="div">
				<div
					className={cn('dd', type === 'Line Chart' ? 'active' : '')}
					onClick={() => setType('Line Chart')}
					tabIndex={0}
				>
					Line Chart
				</div>
			</Popover.Button>
		</Dropdown>
	)
}
