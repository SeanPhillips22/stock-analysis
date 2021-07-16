import Link from 'next/link';
import SubNavigation from 'components/StockHeading/SubNavigation';
import styles from 'styles/TabMenu.module.css';
import { useNavState } from 'hooks/useNavState';
import { stockState } from 'state/stockState';

export default function TabNavigation() {
	const path = useNavState();
	const info = stockState((state) => state.info);

	const common =
		'text-[15px] xs:text-base block py-1.5 sm:py-2 px-2 xs:px-3 sm:px-5';
	const inactive =
		common +
		' bll hover:text-gray-900 hover:bg-gray-100 transition duration-100';
	const active = common + ' text-gray-900 bg-[#eee] font-semibold';

	return (
		<>
			<nav className="border-b-2 border-blue-brand_sharp w-full">
				<ul
					className={
						'flex flex-row w-full overflow-auto ' + styles.navmenu
					}
				>
					<li>
						<Link
							href={`/stocks/${info.symbol}/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={!path.three ? active : inactive}
								data-title="Overview"
							>
								Overview
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${info.symbol}/financials/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'financials' ? active : inactive
								}
								data-title="Financials"
							>
								Financials
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${info.symbol}/statistics/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'statistics' ? active : inactive
								}
								data-title="Statistics"
							>
								Statistics
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${info.symbol}/company/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'company' ? active : inactive}
								data-title="Profile"
							>
								Profile
							</a>
						</Link>
					</li>
					<li>
						<Link
							href={`/stocks/${info.symbol}/chart/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={path.three == 'chart' ? active : inactive}
								data-title="Chart"
							>
								Chart
							</a>
						</Link>
					</li>
				</ul>
			</nav>
			{path.three == 'financials' && <SubNavigation path={path} />}
		</>
	);
}
