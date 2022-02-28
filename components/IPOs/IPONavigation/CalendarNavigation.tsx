import { NavTab } from '../../Navigation/NavTab'

export function CalendarNavigation({ path }: { path: string }) {
	return (
		<div>
			<nav className="mb-1 sm:mb-2 lg:mb-3">
				<ul className="navmenu space-x-1">
					<NavTab url="/ipos/calendar/" path={path} title="Upcoming" />
					<NavTab url="/ipos/filings/" path={path} title="Filings" />
					<NavTab url="/ipos/withdrawn/" path={path} title="Withdrawn" />
				</ul>
			</nav>
		</div>
	)
}
