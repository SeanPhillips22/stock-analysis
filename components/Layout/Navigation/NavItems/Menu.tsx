import { Disclosure } from '@headlessui/react'
import { NavArrowIcon } from 'components/Icons/NavArrow'
import Link from 'next/link'
import { SVGProps, useState } from 'react'
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
		children: NavChild[]
	}
	path: PathObject
}

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export function MenuNavItem({ item, path }: Props) {
	const [open, setOpen] = useState(false)

	// return (
	// 	<div className="nav-menu-wrap" onClick={() => setOpen(!open)}>
	// 		<Link href={item.href} prefetch={false}>
	// 			<a
	// 				className={
	// 					item.path === path.one && !path.two
	// 						? 'nav-item current group'
	// 						: 'nav-item group'
	// 				}
	// 			>
	// 				<item.icon className="nav-icon" style={{ maxWidth: '50px' }} />
	// 				<span className="nav-label">{item.name}</span>
	// 			</a>
	// 		</Link>
	// 		<NavArrowIcon classes={open ? 'nav-arrow open' : 'nav-arrow closed'} />
	// 	</div>
	// )

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
						<NavArrowIcon
							classes={open ? 'nav-arrow open' : 'nav-arrow closed'}
						/>
					</div>
				</a>
			</Link>
			<Disclosure as="div" key={item.name} className="space-y-1">
				{({ open }) => (
					<>
						<Disclosure.Button
							className={classNames(
								item.path === path.one && !path.two
									? 'bg-gray-100 text-gray-900'
									: 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
								'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
							)}
						>
							<item.icon
								className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
							<span className="flex-1">{item.name}</span>
							<svg
								className={classNames(
									open ? 'text-gray-400 rotate-90' : 'text-gray-300',
									'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
								)}
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</Disclosure.Button>
						<Disclosure.Panel className="space-y-1">
							{item.children.map((subItem) => (
								<Disclosure.Button
									key={subItem.name}
									as="a"
									href={subItem.href}
									className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
								>
									{subItem.name}
								</Disclosure.Button>
							))}
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	)
}
