import { CheckIcon } from '@heroicons/react/outline'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { classNames } from 'functions/helpers/classNames'
import { tabActive } from 'functions/helpers/tabActive'
import { useAuthState } from 'hooks/useAuthState'

export function TableResults() {
	const { isPro } = useAuthState()
	const curr = 20 // TODO: get from state

	const OPTIONS = [
		{
			val: 20
		},
		{
			val: 50
		},
		{
			val: 100,
			restricted: true
		},
		{
			val: 200,
			restricted: true
		}
	]

	let title = curr.toString() + ' Rows'

	return (
		<Dropdown title={title} hoverTitle="Change results count">
			{OPTIONS.map((item) => (
				/* One Dropdown Item */
				<div
					key={item.val}
					className={classNames('dd-option', tabActive(item.val, curr))}
					title={
						item.restricted
							? 'Upgrade to Pro to select this option'
							: `Show ${item.val} Rows`
					}
				>
					{/* Button Text */}
					{item.val.toString() + ' Rows'}

					{/* Icon - if option selected */}
					{item.val === curr && (
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
