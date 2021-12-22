import {
	HomeIcon,
	ChartBarIcon,
	CalendarIcon,
	CollectionIcon,
	AdjustmentsIcon,
	TrendingUpIcon,
	NewspaperIcon,
	ArchiveIcon
} from '@heroicons/react/outline'
import { navState } from 'state/navState'
import { MenuNavItem } from './NavItems/Menu'
import { SingleNavItem } from './NavItems/Single'

const navigation = [
	{ name: 'Home', href: '/', icon: HomeIcon, current: true },
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
	const path = navState((state) => state.path)

	return (
		<div className="leftnav">
			<nav className="nav-col">
				{navigation.map((item) =>
					!item.children ? (
						<SingleNavItem key={item.name} item={item} path={path} />
					) : (
						<MenuNavItem key={item.name} item={item} path={path} />
					)
				)}
			</nav>
		</div>
	)
}
