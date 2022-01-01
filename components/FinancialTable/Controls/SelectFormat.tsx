import { CheckIcon } from '@heroicons/react/outline'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { financialsState } from 'state/financialsState'

export function SelectFormat() {
	const divider = financialsState((state) => state.divider)
	const setDivider = financialsState((state) => state.setDivider)

	const DIVIDER_MAP = [
		{
			title: 'Billions',
			value: 1000000000
		},
		{
			title: 'Millions',
			value: 1000000
		},
		{
			title: 'Thousands',
			value: 1000
		},
		{
			title: 'Raw',
			value: 1
		}
	]

	let active = DIVIDER_MAP.find((item) => item.value === divider)

	return (
		<Dropdown
			title={active ? active.title : 'Format'}
			hoverTitle="Change number units"
		>
			{DIVIDER_MAP.map((item) => (
				<div
					key={item.value}
					className={
						item.value === divider ? 'dd-option active' : 'dd-option'
					}
					onClick={() => setDivider(item.value)}
				>
					{item.title}
					{item.value === divider && (
						<CheckIcon className="h-5 w-5" aria-hidden="true" />
					)}
				</div>
			))}
		</Dropdown>
	)
}
