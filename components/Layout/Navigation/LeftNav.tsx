import { Transition } from '@headlessui/react'
import { navMenuState } from 'state/navMenuState'
import { MainNav } from './MainNav'

export function LeftNav() {
	const visible = navMenuState((state) => state.visible)

	return (
		<>
			<Transition
				show={visible}
				enter="transition duration-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
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
