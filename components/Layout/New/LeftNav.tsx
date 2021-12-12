import { MainNav } from './MainNav'

export function LeftNav() {
	return (
		<div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0">
			<div className="border-r border-gray-200 pt-16 flex flex-col flex-grow">
				<div className="flex-grow mt-5 flex flex-col px-4">
					<MainNav />
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
