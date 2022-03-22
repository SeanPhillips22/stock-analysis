import { NavTab } from '../../Navigation/NavTab'

export function PremarketNav({ path }: { path: string }) {
	// console.log(path)

	return (
		<nav className="mb-1 sm:mb-2 lg:mb-3">
			<ul className="navmenu submenu space-x-1">
				<NavTab url="/markets/premarket/" path={path} title="Movers" />
				<NavTab url="/markets/premarket/gainers/" path={path} title="Gainers" />
				<NavTab url="/markets/premarket/losers/" path={path} title="Losers" />
			</ul>
		</nav>
	)
}
