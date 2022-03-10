import { NavTab } from 'components/Navigation/NavTab'

type Props = {
	path: string // Which tab is active
	SubNav?: React.FunctionComponent<any>
}

export function MarketsNavigation({ path, SubNav }: Props) {
	return (
		<div className="mb-3">
			<nav className="mb-1 border-b-[3px] border-blue-brand_sharp">
				<ul className="navmenu">
					<NavTab
						url="/markets/gainers/"
						path={path}
						title="Gainers"
						lvl={2}
					/>
					<NavTab
						url="/markets/losers/"
						path={path}
						title="Losers"
						lvl={2}
					/>
					<NavTab url="/markets/active/" path={path} title="Active" />
					<NavTab
						url="/markets/premarket/"
						path={path}
						title="Premarket"
						lvl={2}
					/>
				</ul>
			</nav>
			{SubNav && <SubNav path={path} />}
		</div>
	)
}
