import { HeaderLoginNew } from './HeaderLoginNew'
import { HeaderLogoFull } from './HeaderLogoFull'
import { HeaderMenuToggle } from './HeaderMenuToggle'
import { HeaderSearch } from './HeaderSearch'

export function Header() {
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
