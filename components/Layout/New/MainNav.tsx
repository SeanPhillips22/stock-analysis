/* eslint-disable @next/next/no-img-element */
import {
	BellIcon,
	CalendarIcon,
	ChartBarIcon,
	FolderIcon,
	HomeIcon,
	InboxIcon,
	MenuAlt2Icon,
	UsersIcon,
	XIcon
} from '@heroicons/react/outline'

const navigation = [
	{ name: 'Home', href: '#', icon: HomeIcon, current: true },
	{ name: 'Stocks', href: '#', icon: ChartBarIcon, current: false },
	{ name: 'IPOs', href: '#', icon: UsersIcon, current: false },
	{ name: 'ETFs', href: '#', icon: FolderIcon, current: false },
	{ name: 'Screeners', href: '#', icon: CalendarIcon, current: false },
	{ name: 'Trending', href: '#', icon: InboxIcon, current: false },
	{ name: 'News', href: '#', icon: ChartBarIcon, current: false },
	{ name: 'Corporate Actions', href: '#', icon: ChartBarIcon, current: false }
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export function MainNav() {
	return (
		<div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0">
			<div className="border-r border-gray-200 pt-16 flex flex-col flex-grow">
				<div className="flex-grow mt-5 flex flex-col">
					<nav className="flex-1 px-4 pb-4 space-y-1">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className={
									item.current ? 'nav-item current' : 'nav-item'
								}
							>
								<item.icon className="text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
								{item.name}
							</a>
						))}
					</nav>
				</div>
			</div>
		</div>
	)
}

// export function MainNav() {
// 	return (
// 		<div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
// 			{/* Sidebar component, swap this element with another sidebar if you like */}
// 			<div className="border-r border-gray-200 pt-5 flex flex-col flex-grow ">
// 				<div className="flex-shrink-0 px-4 flex items-center">
// 					<img
// 						className="h-8 w-auto"
// 						src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
// 						alt="Workflow"
// 					/>
// 				</div>
// 				<div className="flex-grow mt-5 flex flex-col">
// 					<nav className="flex-1 px-2 pb-4 space-y-1">
// 						{navigation.map((item) => (
// 							<a
// 								key={item.name}
// 								href={item.href}
// 								className={classNames(
// 									item.current
// 										? 'bg-gray-100 text-gray-900'
// 										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
// 									'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
// 								)}
// 							>
// 								<item.icon
// 									className={classNames(
// 										item.current
// 											? 'text-gray-500'
// 											: 'text-gray-400 group-hover:text-gray-500',
// 										'mr-3 flex-shrink-0 h-6 w-6'
// 									)}
// 									aria-hidden="true"
// 								/>
// 								{item.name}
// 							</a>
// 						))}
// 					</nav>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
