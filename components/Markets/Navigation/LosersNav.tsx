import { NavTab } from '../../Navigation/NavTab'

export function LosersNav({ path }: { path: string }) {
	return (
		<nav className="mb-1 sm:mb-2 lg:mb-3">
			<ul className="navmenu submenu space-x-1">
				<NavTab url="/markets/losers/" path={path} title="Today" />
				<NavTab url="/markets/losers/week/" path={path} title="Week" />
				<NavTab url="/markets/losers/month/" path={path} title="Month" />
				<NavTab url="/markets/losers/ytd/" path={path} title="YTD" />
				<NavTab url="/markets/losers/year/" path={path} title="Year" />
				<NavTab url="/markets/losers/3y/" path={path} title="3 Years" />
				<NavTab url="/markets/losers/5y/" path={path} title="5 Years" />
			</ul>
		</nav>
	)
}
