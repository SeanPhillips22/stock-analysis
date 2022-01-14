import { CheckIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { cn } from 'functions/helpers/classNames'
import { tabActive } from 'functions/helpers/tabActive'
import { useRouter } from 'next/router'
import { authState } from 'state/authState'
import { stockTableState } from '../stockTableState'

const OPTIONS = [
	{
		value: 20
	},
	{
		value: 50
	},
	{
		value: 100,
		pro: true
	},
	{
		value: 200,
		pro: true
	}
]

/**
 * Dropdown to select the number of results to show in the table
 */
export function TableResults() {
	const router = useRouter()
	const isPro = authState(state => state.isPro)
	const count = stockTableState(state => state.count)
	const setCount = stockTableState(state => state.setCount)

	// decide which title to show on hover
	function hoverTitle(value: number, pro?: boolean) {
		if (pro && !isPro) return 'Upgrade to Pro to select this option'
		return `Show ${value} Rows`
	}

	// when a new count is selected, either update the state or redirect to Pro page
	function handleClick(value: number, pro?: boolean) {
		if (pro && !isPro) router.push('/pro/')
		setCount(value)
	}

	// the text on the dropdown button
	let title = count.toString() + ' Rows'

	return (
		<Dropdown title={title} hoverTitle="Change results count">
			{OPTIONS.map(i => (
				/* One Dropdown Item */
				<div
					key={i.value}
					className={cn('dd-option', tabActive(i.value, count))}
					title={hoverTitle(i.value, i.pro)}
					onClick={() => handleClick(i.value, i.pro)}
				>
					{/* Button Text */}
					{i.value.toString() + ' Rows'}

					{/* Icon - if option selected */}
					{i.value === count && (
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
