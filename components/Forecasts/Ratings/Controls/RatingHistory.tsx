import { Popover } from '@headlessui/react'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { forecastState } from 'components/Forecasts/forecast.state'
import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { cn } from 'functions/helpers/classNames'
import { useAuthState } from 'hooks/useAuthState'
import { useEvent } from 'hooks/useEvent'
import { useRouter } from 'next/router'

export function RatingHistory() {
	const { isPro } = useAuthState()
	const history = forecastState(state => state.history)
	const setHistory = forecastState(state => state.setHistory)
	const router = useRouter()
	const { event } = useEvent()

	function handleClick(range: string) {
		if (isPro || range === '1 Year') setHistory(range)
		else {
			event('Free_Trial_Click', { location: 'Forecast_History' })
			router.push('/pro/')
		}
	}

	return (
		<Dropdown title={history}>
			<Popover.Button as="div">
				<div
					className={cn('dd', history === '1 Year' ? 'active' : '')}
					onClick={() => handleClick('1 Year')}
					tabIndex={0}
				>
					1 Year
				</div>
			</Popover.Button>
			<Popover.Button as="div">
				<div
					className={cn('dd', history === '2 Years' ? 'active' : '')}
					onClick={() => handleClick('2 Years')}
					title={isPro ? '' : 'Upgrade to Pro to see 2 years of data'}
					tabIndex={0}
				>
					2 Years
					{!isPro && <LockClosedIcon className="lock-icon" aria-hidden="true" />}
				</div>
			</Popover.Button>
			<Popover.Button as="div">
				<div
					className={cn('dd', history === '5 Years' ? 'active' : '')}
					onClick={() => handleClick('5 Years')}
					title={isPro ? '' : 'Upgrade to Pro to see 5+ years of data'}
					tabIndex={0}
				>
					5 Years
					{!isPro && <LockClosedIcon className="lock-icon" aria-hidden="true" />}
				</div>
			</Popover.Button>
		</Dropdown>
	)
}
