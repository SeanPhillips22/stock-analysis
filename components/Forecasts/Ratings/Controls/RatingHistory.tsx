import { Dropdown } from 'components/Dropdown/_Dropdown'
import { forecastState } from 'components/Forecasts/forecast.state'
import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { cn } from 'functions/helpers/classNames'
import { useAuthState } from 'hooks/useAuthState'

// TODO - Make selection persistent in localStorage
export function RatingHistory() {
	const { isPro } = useAuthState()
	const history = forecastState(state => state.history)
	const setHistory = forecastState(state => state.setHistory)

	return (
		<Dropdown title={history}>
			<div
				className={cn('dd-option', history === '1 Year' ? 'active' : '')}
				onClick={() => setHistory('1 Year')}
			>
				1 Year
			</div>
			<div
				className={cn('dd-option', history === '2 Years' ? 'active' : '')}
				onClick={isPro ? () => setHistory('2 Years') : undefined}
				title={isPro ? '' : 'Upgrade to Pro to see 2 years of data'}
			>
				2 Years
				{!isPro && (
					<LockClosedIcon className="lock-icon" aria-hidden="true" />
				)}
			</div>
			<div
				className={cn('dd-option', history === '5 Years' ? 'active' : '')}
				onClick={isPro ? () => setHistory('5 Years') : undefined}
				title={isPro ? '' : 'Upgrade to Pro to see 5+ years of data'}
			>
				5 Years
				{!isPro && (
					<LockClosedIcon className="lock-icon" aria-hidden="true" />
				)}
			</div>
		</Dropdown>
	)
}
