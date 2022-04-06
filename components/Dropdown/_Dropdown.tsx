import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { cn } from 'functions/helpers/classNames'

type Props = {
	title: string
	children: React.ReactNode
	hoverTitle?: string
	id?: string
	classes?: string // Applies to the dropdown itself
	menuClasses?: string
	btnClasses?: string
	icnClasses?: string
	active?: boolean // if non-default is selected
	onClick?: () => void
}

export function Dropdown({
	title,
	children,
	hoverTitle,
	id,
	classes,
	menuClasses = '',
	btnClasses = '',
	icnClasses = '',
	active,
	onClick
}: Props) {
	return (
		<Popover className={cn('controls-menu', menuClasses)} id={id}>
			<Popover.Button className={cn('controls-btn', active ? 'active' : '', btnClasses)} title={hoverTitle}>
				{title}
				<ChevronDownIcon className={cn('controls-icon', icnClasses)} aria-hidden="true" />
			</Popover.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
				beforeEnter={onClick}
			>
				<Popover.Panel className={cn('dropdown', classes ? classes : '')}>{children}</Popover.Panel>
			</Transition>
		</Popover>
	)
}
