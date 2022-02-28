import { NavTab } from '../../Navigation/NavTab'

export function GainersNav({ path }: { path: string }) {
	return (
		<nav className="mb-1 sm:mb-2 lg:mb-3">
			<ul className="navmenu submenu space-x-1">
				<NavTab url="/markets/gainers/" path={path} title="Today" />
				<NavTab url="/markets/gainers/week/" path={path} title="Week" />
				<NavTab url="/markets/gainers/month/" path={path} title="Month" />
				<NavTab url="/markets/gainers/ytd/" path={path} title="YTD" />
				<NavTab url="/markets/gainers/year/" path={path} title="Year" />
				<NavTab url="/markets/gainers/3y/" path={path} title="3 Years" />
				<NavTab url="/markets/gainers/5y/" path={path} title="5 Years" />
			</ul>
		</nav>
	)
}
