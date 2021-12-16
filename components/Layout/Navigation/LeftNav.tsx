import { Transition } from '@headlessui/react'
import { navMenuState } from 'state/navMenuState'
import { MainNav } from './MainNav'

export function LeftNav() {
	const visible = navMenuState((state) => state.visible)

	return (
		<>
			<Transition
				show={visible}
				enter="transition ease-in-out duration-300 transform"
				enterFrom="-translate-x-full"
				enterTo="translate-x-0"
				leave="transition ease-in-out duration-300 transform"
				leaveFrom="translate-x-0"
				leaveTo="-translate-x-full"
			>
				<aside className="mobilemenu">
					<div className="leftnav">
						<MainNav />
					</div>
				</aside>
			</Transition>
			<aside className="leftcol">
				<div className="leftnav">
					<MainNav />
				</div>
			</aside>
		</>
	)
}
