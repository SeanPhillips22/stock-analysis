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
	{ name: 'Home', href: '/', path: null, icon: HomeIcon, current: true },
	{
		name: 'Stocks',
		href: '/stocks/',
		path: 'stocks',
		icon: ChartBarIcon
	},
	{
		name: 'IPOs',
		href: '/ipos/',
		path: 'ipos',
		icon: CalendarIcon,
		children: [
			{ name: 'Recent IPOs', href: '/ipos/', path: 'ipos' },
			{
				name: 'IPO Calendar',
				href: '/ipos/calendar/',
				path: 'ipos/calendar'
			},
			{
				name: 'IPO Statistics',
				href: '/ipos/statistics/',
				path: 'ipos/statistics'
			},
			{
				name: 'IPO Screener',
				href: '/ipos/screener/',
				path: 'ipos/screener'
			},
			{ name: 'IPO News', href: '/ipos/news/', path: 'ipos/news' }
		]
	},
	{
		name: 'ETFs',
		href: '/etf/',
		path: 'etf',
		icon: CollectionIcon
	},
	{
		name: 'Screener',
		href: '/stock-screener/',
		path: 'stock-screener',
		icon: AdjustmentsIcon
	},
	{
		name: 'Trending',
		href: '/trending/',
		path: 'trending',
		icon: TrendingUpIcon
	},
	{ name: 'News', href: '/news/', path: 'news', icon: NewspaperIcon },
	{
		name: 'Corporate Actions',
		href: '/actions/',
		path: 'actions',
		icon: ArchiveIcon
	}
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export function MainNav() {
	const path = navState((state) => state.path)

	return (
		<div className="leftnav">
			<nav className="flex flex-col space-y-1">
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
