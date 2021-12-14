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

const navigation = [
	{ name: 'Home', href: '/', path: null, icon: HomeIcon, current: true },
	{
		name: 'Stocks',
		href: '/stocks/',
		path: 'stocks',
		icon: ChartBarIcon,
		current: false
	},
	{
		name: 'IPOs',
		href: '/ipos/',
		path: 'ipos',
		icon: CalendarIcon,
		current: false
	},
	{
		name: 'ETFs',
		href: '/etf/',
		path: 'etf',
		icon: CollectionIcon,
		current: false
	},
	{
		name: 'Screener',
		href: '/stock-screener/',
		path: 'stock-screener',
		icon: AdjustmentsIcon,
		current: false
	},
	{
		name: 'Trending',
		href: '/trending/',
		path: 'trending',
		icon: TrendingUpIcon,
		current: false
	},
	{ name: 'News', href: '/news/', icon: NewspaperIcon, current: false },
	{
		name: 'Corporate Actions',
		href: '/actions/',
		path: 'actions',
		icon: ArchiveIcon,
		current: false
	}
]

export function MainNav() {
	const path = navState((state) => state.path)

	return (
		<nav className="flex-1 pb-4 space-y-1">
			{navigation.map((item) => (
				<a
					key={item.name}
					href={item.href}
					className={
						item.path === path.one && !path.two
							? 'nav-item current group'
							: 'nav-item group'
					}
				>
					<item.icon className="nav-icon" style={{ maxWidth: '50px' }} />
					{item.name}
				</a>
			))}
		</nav>
	)
}
