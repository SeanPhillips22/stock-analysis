import { CheckIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { cn } from 'functions/helpers/classNames'
import { tabActive } from 'functions/helpers/tabActive'
import { useAuthState } from 'hooks/useAuthState'

export function TableRange() {
	const { isPro } = useAuthState()
	const curr = '1D' // TODO: get from state

	const OPTIONS = [
		{
			id: '1D',
			long: '1 Day'
		},
		{
			id: '5D',
			long: '5 Days'
		},
		{
			id: '1M',
			long: '1 Month'
		},
		{
			id: '1M',
			long: '1 Month'
		},
		{
			id: 'YTD',
			long: 'YTD'
		},
		{
			id: '1Y',
			long: '1 Year'
		},
		{
			id: '3Y',
			long: '3 Years',
			restricted: true
		},
		{
			id: '5Y',
			long: '5 Years',
			restricted: true
		}
	]

	let active = OPTIONS.find((o) => o.id === curr)

	return (
		<Dropdown title={active?.long || 'Range'} hoverTitle="Change date range">
			{OPTIONS.map((item) => (
				/* One Dropdown Item */
				<div
					key={item.id}
					className={cn('dd-option', tabActive(item.id, curr))}
					title={
						item.restricted
							? 'Upgrade to Pro to select this option'
							: `Set Range: ${item.long}`
					}
				>
					{/* Button Text */}
					{item.long}

					{/* Icon - if option selected */}
					{item.id === curr && (
						<CheckIcon className="h-5 w-5" aria-hidden="true" />
					)}

					{/* Icon - if option is only for pro members */}
					{item.restricted && !isPro && (
						<LockClosedIcon className="lock-icon" aria-hidden="true" />
					)}
				</div>
			))}
		</Dropdown>
	)
}
