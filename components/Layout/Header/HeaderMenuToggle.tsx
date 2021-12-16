import { HamburgerIcon } from 'components/Icons/Hamburger'
import { navMenuState } from 'state/navMenuState'

/**
 * This components holds the hamburger icon to show/hide the left-aligned menu
 * @returns {JSX.Element}
 */
export function HeaderMenuToggle() {
	const toggle = navMenuState((state) => state.toggle)

	return (
		<div className="hd-menu" onClick={() => toggle()}>
			<HamburgerIcon classes="menu-icon" />
		</div>
	)
}
