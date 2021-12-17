import { HeaderSkipLink } from './HeaderSkipLink'
import { HeaderMenuToggle } from './HeaderMenuToggle'
import { HeaderLogo } from './HeaderLogo'
import { HeaderLogin } from './HeaderLogin'
import { HeaderSearch } from './HeaderSearch'

type Props = {
	hideNav?: boolean
}

export function Header({ hideNav }: Props) {
	return (
		<header className="hd-wrap">
			<div className="hd-inner">
				{/* Skip Link */}
				<HeaderSkipLink />

				{/* Menu Button */}
				{!hideNav && <HeaderMenuToggle />}

				{/* Logo */}
				<HeaderLogo />

				{/* Search */}
				<HeaderSearch />

				{/* Login */}
				<HeaderLogin />
			</div>
		</header>
	)
}
