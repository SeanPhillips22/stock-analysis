import { Transition } from '@headlessui/react'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'

export function LeftNav() {
	const visible = navMenuState(state => state.visible)
	const expanded = navMenuState(state => state.expanded)

	return (
		<>
			<div className="xxl:hidden">
				<Transition
					show={visible}
					enter="transition duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<MobileNav />
				</Transition>
			</div>
			<aside className={expanded ? 'leftcol' : 'leftcol shrink'}>
				<MainNav />
			</aside>
		</>
	)
}
