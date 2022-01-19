import {
	HomeIcon,
	ChartBarIcon,
	CalendarIcon,
	CollectionIcon,
	AdjustmentsIcon,
	TrendingUpIcon,
	NewspaperIcon,
	ArchiveIcon,
	ChartSquareBarIcon
} from '@heroicons/react/outline'
import { matchParentPath } from 'functions/helpers/matchPath'
import { useEffect } from 'react'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { navState } from 'state/navState'
import { Collapse } from './Collapse'
import { MenuNavItem } from './NavItems/Menu'
import { SingleNavItem } from './NavItems/Single'

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
	const initial = navMenuState(state => state.initial)
	const setInitial = navMenuState(state => state.setInitial)
	const path = navState(state => state.path)

	// Set the initial open state for the menu
	useEffect(() => {
		if (initial && path.one) {
			setInitial(false)
			if (path) {
				navigation.map(item => {
					if (item.children) {
						if (matchParentPath(path, item.href)) {
							setIsOpen({ [item.name]: true })
						}
					}
				})
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path])

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
