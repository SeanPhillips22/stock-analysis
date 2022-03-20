import Link from 'next/link'
import { useLayoutContext } from 'components/Layout/LayoutContext'

type Props = {
	symbol: string
}

export const TabNavigationETF = ({ symbol }: Props) => {
	const { path } = useLayoutContext()

	return (
		<nav className="w-full border-b-2 border-blue-brand_sharp">
			<ul className="navmenu w-full">
				<li>
					<Link href={`/etf/${symbol}/`} prefetch={false}>
						<a className={!path.three ? 'active' : 'inactive'} data-title="Overview">
							Overview
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/holdings/`} prefetch={false}>
						<a className={path.three == 'holdings' ? 'active' : 'inactive'} data-title="Holdings">
							Holdings
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/dividend/`} prefetch={false}>
						<a className={path.three == 'dividend' ? 'active' : 'inactive'} data-title="Dividend">
							Dividend
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/chart/`} prefetch={false}>
						<a className={path.three == 'chart' ? 'active' : 'inactive'} data-title="Chart">
							Chart
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}
