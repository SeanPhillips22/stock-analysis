import { NavArrowIcon } from 'components/Icons/NavArrow'
import Link from 'next/link'
import { SVGProps, useState } from 'react'
import { PathObject } from 'state/navState'

type NavChild = {
	name: string
	href: string
	path: string | null
}

type Props = {
	item: {
		name: string
		href: string
		path: string | null
		icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
		children: NavChild[]
	}
	path: PathObject
}

// TODO - make the open/close state persistent after navigating
export function MenuNavItem({ item, path }: Props) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Link href={item.href} prefetch={false}>
				<a
					className={
						item.path === path.one && !path.two
							? 'nav-item current group'
							: 'nav-item group'
					}
				>
					<div className="nav-menu-wrap" onClick={() => setOpen(!open)}>
						<item.icon
							className="nav-icon"
							style={{ maxWidth: '50px' }}
						/>
						<span className="nav-label">{item.name}</span>
						<div
							className="nav-arrow-wrap"
							onClick={(e) => {
								e.preventDefault()
							}}
						>
							<NavArrowIcon
								classes={open ? 'nav-arrow open' : 'nav-arrow closed'}
							/>
						</div>
					</div>
				</a>
			</Link>
			{open && (
				<div className="space-y-1">
					{item.children.map((subItem) => (
						<Link href={subItem.href} prefetch={false}>
							<a
								className={
									subItem.path === path.two
										? 'nav-subitem current group'
										: 'nav-subitem group'
								}
							>
								<span className="nav-label">{subItem.name}</span>
							</a>
						</Link>
					))}
				</div>
			)}
		</>
	)
}
