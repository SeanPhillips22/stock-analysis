import { NavArrowIcon } from 'components/Icons/NavArrow'
import Link from 'next/link'
import { NavItemProps } from './NavItems.types'
import { navMenuState } from 'state/navMenuState'
import { matchPath } from 'functions/helpers/matchPath'

/**
 * A single nav item that has children, so when toggled it displays a dropdown
 * @param item the navigation item with a name, href, path, icon and children
 * @param path the current page path
 * @returns
 */
export function MenuNavItem({ item, path }: NavItemProps) {
	const isOpen = navMenuState((state) => state.isOpen)
	const setIsOpen = navMenuState((state) => state.setIsOpen)

	function openClose() {
		let openClosed = isOpen[item.name] ? true : false
		setIsOpen({ ...isOpen, [item.name]: !openClosed })
	}

	return (
		<>
			<div
				className={
					matchPath(path, item.href)
						? 'nav-menu-wrap current group'
						: 'nav-menu-wrap group'
				}
				onClick={openClose}
			>
				<Link href={item.href} prefetch={false}>
					<a
						className={
							matchPath(path, item.href)
								? 'nav-item current'
								: 'nav-item'
						}
					>
						<item.icon
							className="nav-icon"
							style={{ maxWidth: '50px' }}
						/>
						<span className="nav-label">{item.name}</span>
					</a>
				</Link>
				<div className="nav-arrow-wrap" onClick={openClose}>
					<NavArrowIcon
						classes={
							isOpen[item.name] ? 'nav-arrow open' : 'nav-arrow closed'
						}
					/>
				</div>
			</div>

			{item.children && isOpen[item.name] && (
				<div className="space-y-0.5">
					{item.children.map((subItem) => (
						<Link key={subItem.name} href={subItem.href} prefetch={false}>
							<a
								className={
									matchPath(path, subItem.href)
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
