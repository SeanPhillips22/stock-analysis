import { HeaderLoginNew } from './HeaderLoginNew'
import { HeaderLogoFull } from './HeaderLogoFull'
import { HeaderMenuToggle } from './HeaderMenuToggle'
import { HeaderSearch } from './HeaderSearch'
import { HeaderSkipLink } from './HeaderSkipLink'

export function Header() {
	return (
		<header className="hd-wrap">
			<div className="hd-inner">
				{/* Skip Link */}
				<HeaderSkipLink />

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
