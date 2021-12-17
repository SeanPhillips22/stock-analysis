import { useClickOutside } from 'hooks/useClickOutside'
import { useRef } from 'react'
import { navMenuState } from 'state/navMenuState'
import { MainNav } from './MainNav'

export function MobileNav() {
	const toggle = navMenuState((state) => state.toggle)
	const menuRef = useRef<HTMLDivElement>(null)

	// Close menu if clicked outside of it
	useClickOutside(menuRef, () => {
		toggle()
	})

	return (
		<aside className="mobilemenu" ref={menuRef}>
			<div className="leftnav">
				<MainNav />
				{/* TODO add login/free trial */}
			</div>
		</aside>
	)
}
