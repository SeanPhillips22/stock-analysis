import { CloseIcon } from 'components/Icons/Close'
import { HamburgerIcon } from 'components/Icons/Hamburger'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'

/**
 * This components holds the hamburger icon to show/hide the left-aligned menu
 * @returns {JSX.Element}
 */
export function HeaderMenuToggle() {
	const visible = navMenuState(state => state.visible)
	const toggle = navMenuState(state => state.toggle)

	return (
		<div className="hd-menu" onClick={() => toggle()}>
			{visible ? (
				<CloseIcon classes="menu-icon" />
			) : (
				<HamburgerIcon classes="menu-icon" />
			)}
		</div>
	)
}
