import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { cn } from 'functions/helpers/classNames'

type Props = {
	title: string
	children: React.ReactNode
	hoverTitle?: string
	id?: string
	classes?: string
}

export function Dropdown({ title, children, hoverTitle, id, classes }: Props) {
	return (
		<Menu as="div" className="controls-menu" id={id}>
			<Menu.Button className="controls-btn" title={hoverTitle}>
				{title}
				<ChevronDownIcon className="controls-icon" aria-hidden="true" />
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className={cn('dropdown', classes ? classes : '')}>
					{children}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
