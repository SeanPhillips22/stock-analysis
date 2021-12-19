import Link from 'next/link'
import { NavItemProps } from './NavItems.types'
import { matchPath } from 'functions/helpers/matchPath'

export function SingleNavItem({ item, path }: NavItemProps) {
	return (
		<Link href={item.href} prefetch={false}>
			<a
				className={
					matchPath(path, item.href)
						? 'nav-item current group'
						: 'nav-item group'
				}
			>
				<item.icon className="nav-icon" style={{ maxWidth: '50px' }} />
				<span className="nav-label">{item.name}</span>
			</a>
		</Link>
	)
}
