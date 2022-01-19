import { CheckIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { cn } from 'functions/helpers/classNames'
import { tabActive } from 'functions/helpers/tabActive'
import { useRouter } from 'next/router'
import { authState } from 'state/authState'
import { DataId } from 'types/DataId'
import { stockTableState } from '../stockTableState'

const OPTIONS: {
	id: DataId
	long: string
	pro?: boolean
}[] = [
	{
		id: 'change',
		long: '1 Day'
	},
	{
		id: 'ch1w',
		long: '1 Week'
	},
	{
		id: 'ch1m',
		long: '1 Month'
	},
	{
		id: 'ch6m',
		long: '6 Months'
	},
	{
		id: 'chYTD',
		long: 'YTD'
	},
	{
		id: 'ch1y',
		long: '1 Year'
	},
	{
		id: 'ch3y',
		long: '3 Years',
		pro: true
	},
	{
		id: 'ch5y',
		long: '5 Years',
		pro: true
	}
]

/**
 * Dropdown to select the time range to show in the table
 */
export function TableRange() {
	const router = useRouter()
	const isPro = authState(state => state.isPro)
	const main = stockTableState(state => state.main)
	const setMain = stockTableState(state => state.setMain)

	// decide which title to show on hover
	function hoverTitle(id: DataId, pro?: boolean) {
		if (pro && !isPro) return 'Upgrade to Pro to select this option'
		return `${getLabel(id)} Change`
	}

	// when a new count is selected, either update the state or redirect to Pro page
	function handleClick(id: DataId, pro?: boolean) {
		if (pro && !isPro) router.push('/pro/')
		else {
			setMain(id)
		}
	}

	// the text on the dropdown option
	function getLabel(id: DataId) {
		return OPTIONS.find(i => i.id === id)?.long
	}

	return (
		<Dropdown
			title={getLabel(main) || 'Range'}
			hoverTitle="Change date range"
			classes="dd-right"
		>
			{OPTIONS.map(i => (
				/* One Dropdown Item */
				<div
					key={i.id}
					className={cn('dd-option', tabActive(i.id, main))}
					title={hoverTitle(i.id, i.pro)}
					onClick={() => handleClick(i.id, i.pro)}
				>
					{/* Button Text */}
					{i.long}

					{/* Icon - if option selected */}
					{i.id === main && (
						<CheckIcon className="h-5 w-5" aria-hidden="true" />
					)}

					{/* Icon - if option is only for pro members */}
					{i.pro && !isPro && (
						<LockClosedIcon className="lock-icon" aria-hidden="true" />
					)}
				</div>
			))}
		</Dropdown>
	)
}
