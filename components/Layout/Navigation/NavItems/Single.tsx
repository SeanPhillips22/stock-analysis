import Link from 'next/link'
import { SVGProps } from 'react'
import { PathObject } from 'state/navState'

type NavChild = {
	name: string
	href: string
	path: string
}

type Props = {
	item: {
		name: string
		href: string
		path: string | null
		icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
		children?: NavChild[]
	}
	path: PathObject
}

export function SingleNavItem({ item, path }: Props) {
	return (
		<Link href={item.href} prefetch={false}>
			<a
				className={
					item.path === path.one && !path.two
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
