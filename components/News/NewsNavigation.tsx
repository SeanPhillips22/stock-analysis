import Link from 'next/link'
import { useLayoutContext } from 'components/Layout/LayoutContext'

export const NewsNavigation = () => {
	const { path } = useLayoutContext()

	const active = 'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bg-[#eee] font-semibold text-gray-900 whitespace-nowrap'
	const inactive =
		'py-1.5 px-2.5 xs:px-3.5 sm:px-5 block bll hover:text-gray-900 hover:bg-[#eee] transition duration-100 whitespace-nowrap'

	return (
		<div>
			<nav className="mb-0.5 border-b-[3px] border-blue-brand_sharp">
				<ul className="navmenu">
					<li>
						<Link href="/news/" prefetch={false}>
							<a
								data-title="Markets"
								className={!path.two || ['#', '2021', '2020', '2019'].includes(path.two) ? active : inactive}
							>
								Markets
							</a>
						</Link>
					</li>
					<li>
						<Link href="/news/all-stocks/" prefetch={false}>
							<a data-title="All Stocks" className={path.two === 'all-stocks' ? active : inactive}>
								All Stocks
							</a>
						</Link>
					</li>
					<li>
						<Link href="/news/press-releases/" prefetch={false}>
							<a data-title="Press Releases" className={path.two === 'press-releases' ? active : inactive}>
								Press Releases
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
