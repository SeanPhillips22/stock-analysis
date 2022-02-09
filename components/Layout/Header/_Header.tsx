import { HeaderSkipLink } from './HeaderSkipLink'
import { HeaderMenuToggle } from './HeaderMenuToggle'
import { HeaderLogo } from './HeaderLogo'
import { HeaderLogin } from './HeaderLogin'
import { HeaderSearch } from './HeaderSearch'

type Props = {
	hideNav?: boolean
	hideTrial?: boolean
}

export function Header({ hideNav, hideTrial }: Props) {
	return (
		<header className="hd-wrap">
			<div className={hideNav ? 'hd-inner hidenav' : 'hd-inner'}>
				{/* Skip Link */}
				<HeaderSkipLink />

				{/* Menu Button */}
				{!hideNav && <HeaderMenuToggle />}

				{/* Logo */}
				<HeaderLogo />

				{/* Search */}
				<HeaderSearch />

				{/* Login */}
				<HeaderLogin hideTrial={hideTrial} />
			</div>
		</header>
	)
}
