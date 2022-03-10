import { NavTab } from '../../Navigation/NavTab'

export function RecentNavigation({ path }: { path: string }) {
	return (
		<div>
			<nav className="mb-1 sm:mb-2 lg:mb-3">
				<ul className="navmenu space-x-1">
					<NavTab url="/ipos/" title="Latest" path={path} />
					<NavTab url="/ipos/2022/" title="2022" path={path} />
					<NavTab url="/ipos/2021/" title="2021" path={path} />
					<NavTab url="/ipos/2020/" title="2020" path={path} />
					<NavTab url="/ipos/2019/" title="2019" path={path} />
				</ul>
			</nav>
		</div>
	)
}
