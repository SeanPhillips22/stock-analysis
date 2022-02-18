import { HomeIcon } from 'components/Icons/HomeIcon'
import { ChartBarIcon } from 'components/Icons/ChartBarIcon'
import { CalendarIcon } from 'components/Icons/CalendarIcon'
import { CollectionIcon } from 'components/Icons/CollectionIcon'
import { AdjustmentsIcon } from 'components/Icons/AdjustmentsIcon'
import { TrendingUpIcon } from 'components/Icons/TrendingUpIcon'
import { NewspaperIcon } from 'components/Icons/NewspaperIcon'
import { ArchiveIcon } from 'components/Icons/ArchiveIcon'
import { ChartSquareBarIcon } from 'components/Icons/ChartSquareBarIcon'
import { matchParentPath } from 'functions/helpers/matchPath'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { Collapse } from './Collapse'
import { MenuNavItem } from './NavItems/Menu'
import { SingleNavItem } from './NavItems/Single'
import { useLayoutContext } from '../LayoutContext'
import { useEffect } from 'react'

const navigation = [
	{ name: 'Home', href: '/', icon: HomeIcon },
	{
		name: 'Stocks',
		href: '/stocks/',
		icon: ChartBarIcon
	},
	{
		name: 'IPOs',
		href: '/ipos/',
		icon: CalendarIcon,
		children: [
			{ name: 'Recent IPOs', href: '/ipos/' },
			{
				name: 'IPO Calendar',
				href: '/ipos/calendar/'
			},
			{
				name: 'IPO Statistics',
				href: '/ipos/statistics/'
			},
			{ name: 'IPO News', href: '/ipos/news/' }
		]
	},
	{
		name: 'ETFs',
		href: '/etf/',
		icon: CollectionIcon
	},
	{ name: 'News', href: '/news/', path: 'news', icon: NewspaperIcon },
	{
		name: 'Trending',
		href: '/trending/',
		icon: TrendingUpIcon
	},
	{
		name: 'Market Movers',
		href: '/markets/gainers/',
		icon: ChartSquareBarIcon,
		children: [
			{
				name: 'Top Gainers',
				href: '/markets/gainers/'
			},
			{
				name: 'Top Losers',
				href: '/markets/losers/'
			},
			{
				name: 'Most Active',
				href: '/markets/active/'
			},
			{
				name: 'Premarket',
				href: '/markets/premarket/'
			}
		]
	},
	{
		name: 'Screener',
		href: '/screener/stock/',
		icon: AdjustmentsIcon,
		children: [
			{
				name: 'Stock Screener',
				href: '/screener/stock/'
			},
			{
				name: 'IPO Screener',
				href: '/screener/ipo/'
			},
			{
				name: 'ETF Screener',
				href: '/screener/etf/'
			}
		]
	},
	{
		name: 'Corporate Actions',
		href: '/actions/',
		icon: ArchiveIcon
	}
]

export function MainNav() {
	const setIsOpen = navMenuState(state => state.setIsOpen)
	const { path } = useLayoutContext()

	// Set the open state for the menu
	useEffect(() => {
		if (path) {
			navigation.map(item => {
				if (item.children) {
					if (matchParentPath(path, item.href)) {
						setIsOpen({ [item.name]: true })
					}
				}
			})
		}
	}, [path, setIsOpen])

	return (
		<div className="leftnav">
			<nav className="nav-col">
				{navigation.map(item =>
					!item.children ? (
						<SingleNavItem key={item.name} item={item} path={path} />
					) : (
						<MenuNavItem key={item.name} item={item} path={path} />
					)
				)}
			</nav>
			<Collapse />
		</div>
	)
}
