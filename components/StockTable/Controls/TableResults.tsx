import { CheckIcon } from 'components/Icons/CheckIcon'
import { LockClosedIcon } from 'components/Icons/LockClosedIcon'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { cn } from 'functions/helpers/classNames'
import { useRouter } from 'next/router'
import { authState } from 'state/authState'
import { useTableContext } from '../TableContext'
import { Menu } from '@headlessui/react'

const OPTIONS = [
	{
		value: 10
	},
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
	const { dynamic, setState } = useTableContext()
	const { count } = dynamic

	// decide which title to show on hover
	function hoverTitle(value: number, pro?: boolean) {
		if (pro && !isPro) return 'Upgrade to Pro to select this option'
		return `Show ${value} Rows`
	}

	// when a new count is selected, either update the state or redirect to Pro page
	function handleClick(value: number, pro?: boolean) {
		if (pro && !isPro) router.push('/pro/')
		setState({ count: value })
	}

	// the text on the dropdown button
	let title = count ? count.toString() + ' Rows' : 'Rows'

	return (
		<Dropdown title={title} hoverTitle="Change results count" classes="leftmost">
			{OPTIONS.map(i => (
				/* One Dropdown Item */
				<Menu.Item key={i.value}>
					<div
						className={cn('dd', i.value === count ? 'active' : 'inactive')}
						title={hoverTitle(i.value, i.pro)}
						onClick={() => handleClick(i.value, i.pro)}
					>
						{/* Button Text */}
						{i.value.toString() + ' Rows'}

						{/* Icon - if option selected */}
						{i.value === count && <CheckIcon className="h-5 w-5" aria-hidden="true" />}

						{/* Icon - if option is only for pro members */}
						{i.pro && !isPro && <LockClosedIcon className="lock-icon" aria-hidden="true" />}
					</div>
				</Menu.Item>
			))}
		</Dropdown>
	)
}
