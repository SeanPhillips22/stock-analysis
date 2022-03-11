import { Menu } from '@headlessui/react'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { forecastState } from 'components/Forecasts/forecast.state'
import { cn } from 'functions/helpers/classNames'

export function RatingChartType() {
	const type = forecastState(state => state.chartType)
	const setType = forecastState(state => state.setChartType)

	return (
		<Dropdown title={type}>
			<Menu.Item>
				<div
					className={cn('dd', type === 'Bar Chart' ? 'active' : '')}
					onClick={() => setType('Bar Chart')}
				>
					Bar Chart
				</div>
			</Menu.Item>
			<Menu.Item>
				<div
					className={cn('dd', type === 'Line Chart' ? 'active' : '')}
					onClick={() => setType('Line Chart')}
				>
					Line Chart
				</div>
			</Menu.Item>
		</Dropdown>
	)
}
