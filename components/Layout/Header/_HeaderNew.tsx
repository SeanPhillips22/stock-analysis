// TODO - Build a new header component with left-aligned menu button that shows the menu as an overlay on mobile/tablet

import Link from 'next/link'
import { HeaderLoginNew } from './HeaderLoginNew'
import { HeaderLogo } from './HeaderLogo'
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
				<Link href="/" prefetch={false}>
					<a className="flex" aria-label="Stock Analysis home page">
						<HeaderLogoFull className="hd-logo" />
					</a>
				</Link>

				{/* Search */}
				<HeaderSearch />

				{/* Login */}
				<HeaderLoginNew />
			</div>
		</header>
	)
}
