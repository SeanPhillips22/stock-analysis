// TODO - Build a new header component with left-aligned menu button that shows the menu as an overlay on mobile/tablet

import { HeaderLoginNew } from './HeaderLoginNew'
import { HeaderLogoFull } from './HeaderLogoFull'
import { HeaderMenuToggle } from './HeaderMenuToggle'
import { HeaderSearch } from './HeaderSearch'

export function HeaderNew() {
	return (
		<header className="hd-wrap">
			<div className="hd-inner">
				{/* Menu Button */}
				<HeaderMenuToggle />

				{/* Logo */}
				<HeaderLogoFull />

				{/* Search */}
				<HeaderSearch />

				{/* Login */}
				<HeaderLoginNew />
			</div>
		</header>
	)
}
