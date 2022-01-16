import { NavTab } from '../../Navigation/NavTab'

export function CalendarNavigation({ path }: { path: string }) {
	return (
		<div>
			<nav className="mb-1 sm:mb-2 lg:mb-0">
				<ul className="space-x-1 navmenu">
					<NavTab
						url="/ipos/calendar/"
						title="Upcoming"
						css={path === 'calendar' ? 'active' : 'inactive'}
					/>
					<NavTab
						url="/ipos/filings/"
						title="Filings"
						css={path === 'filings' ? 'active' : 'inactive'}
					/>
					<NavTab
						url="/ipos/withdrawn/"
						title="Withdrawn"
						css={path === 'withdrawn' ? 'active' : 'inactive'}
					/>
				</ul>
			</nav>
		</div>
	)
}
