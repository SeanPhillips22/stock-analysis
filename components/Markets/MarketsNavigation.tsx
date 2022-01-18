import { NavTab } from 'components/Navigation/NavTab'
import { tabActive } from 'functions/helpers/tabActive'

type Props = {
	active: string // Which tab is active
}

export function MarketsNavigation({ active }: Props) {
	return (
		<nav className="border-b-[3px] border-blue-brand_sharp mb-3">
			<ul className="navmenu">
				<NavTab
					url="/markets/gainers/"
					title="Gainers"
					css={tabActive(active, 'gainers')}
				/>
				<NavTab
					url="/markets/losers/"
					title="Losers"
					css={tabActive(active, 'losers')}
				/>
				<NavTab
					url="/markets/active/"
					title="Active"
					css={tabActive(active, 'active')}
				/>
				{/* <NavTab
					url="/markets/premarket/"
					title="Premarket"
					css={tabActive(active, 'premarket')}
				/> */}
			</ul>
		</nav>
	)
}
