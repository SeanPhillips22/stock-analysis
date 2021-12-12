/* eslint-disable @next/next/no-img-element */
import {
	HomeIcon,
	ChartBarIcon,
	CalendarIcon,
	CollectionIcon,
	AdjustmentsIcon,
	TrendingUpIcon,
	NewspaperIcon,
	ArchiveIcon
} from '@heroicons/react/outline'

const navigation = [
	{ name: 'Home', href: '/', icon: HomeIcon, current: true },
	{ name: 'Stocks', href: '/stocks/', icon: ChartBarIcon, current: false },
	{ name: 'IPOs', href: '/ipos/', icon: CalendarIcon, current: false },
	{ name: 'ETFs', href: '/etf/', icon: CollectionIcon, current: false },
	{ name: 'Screener', href: '/stock-screener/', icon: AdjustmentsIcon, current: false },
	{ name: 'Trending', href: '/trending/', icon: TrendingUpIcon, current: false },
	{ name: 'News', href: '/news/', icon: NewspaperIcon, current: false },
	{ name: 'Corporate Actions', href: '/actions/', icon: ArchiveIcon, current: false }
]

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
									item.current ? 'nav-item current group' : 'nav-item group'
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
