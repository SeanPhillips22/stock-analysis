import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

type Props = {
	title: string
	children: React.ReactNode
	hoverTitle?: string
}

export function Dropdown({ title, children, hoverTitle }: Props) {
	return (
		<Menu as="div" className="controls-menu" title={hoverTitle}>
			<Menu.Button className="controls-btn">
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
				<Menu.Items className="controls-dropdown">{children}</Menu.Items>
			</Transition>
		</Menu>
	)
}
