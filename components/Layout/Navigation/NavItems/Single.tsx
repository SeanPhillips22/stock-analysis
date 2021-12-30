import Link from 'next/link'
import { NavItemProps } from './NavItems.types'
import { matchPath } from 'functions/helpers/matchPath'
import { navMenuState } from 'state/navMenuState'

export function SingleNavItem({ item, path }: NavItemProps) {
	const close = navMenuState((state) => state.toggle)

	return (
		<Link href={item.href} prefetch={false}>
			<a
				className={
					matchPath(path, item.href)
						? 'nav-item current group'
						: 'nav-item group'
				}
				onClick={close}
				title={item.name}
			>
				<item.icon className="nav-icon" style={{ maxWidth: '50px' }} />
				<span className="nav-label">{item.name}</span>
			</a>
		</Link>
	)
}
