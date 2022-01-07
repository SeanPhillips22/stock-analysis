import { useClickOutside } from 'hooks/useClickOutside'
import { useRef } from 'react'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { MainNav } from './MainNav'
import { NavLogin } from './NavLogin'

export function MobileNav() {
	const close = navMenuState((state) => state.toggle)
	const menuRef = useRef<HTMLDivElement>(null)

	// Close menu if clicked outside of it
	useClickOutside(menuRef, () => {
		close()
	})

	return (
		<aside className="mobilemenu" ref={menuRef}>
			<MainNav />
			<NavLogin />
		</aside>
	)
}
