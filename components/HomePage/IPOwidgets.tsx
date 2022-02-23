import Link from 'next/link'
import { StockLink } from 'components/Links'

type IposMin = {
	date: string
	symbol: string
	name: string
}

interface Props {
	recent: IposMin[]
	upcoming: IposMin[]
}

export const IPOwidgets = ({ recent, upcoming }: Props) => {
	const IPOTable = ({ ipos }: { ipos: IposMin[] }) => {
		return (
			<table className="w-full border border-gray-200 text-sm sm:text-base">
				<thead>
					<tr className="border-b border-t border-gray-200">
						<th className="border-r border-gray-200 py-1.5 px-2 text-left">
							Date
						</th>
						<th className="border-r border-gray-200 py-1.5 px-2 text-left">
							Symbol
						</th>
						<th className="py-1.5 px-2 text-left">Name</th>
					</tr>
				</thead>
				<tbody>
					{ipos.map((item, index) => {
						if (item.symbol) {
							return (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-50"
								>
									<td className="whitespace-nowrap border-r border-gray-200 py-1.5 px-2">
										{item.date}
									</td>
									<td className="border-r border-gray-200 py-1.5 px-2">
										<StockLink symbol={item.symbol} className="bll" />
									</td>
									<td className="py-1.5 px-2">{item.name}</td>
								</tr>
							)
						}
						return null
					})}
				</tbody>
			</table>
		)
	}

	return (
		<>
			<div className="flex flex-col space-y-6 lg:space-y-8">
				<section className="px-3 xs:px-4 sm:px-5 lg:px-0">
					<div className="mb-1 flex flex-row items-end justify-between">
						<h2 className="mb-1 text-2xl font-bold leading-tight">
							Recent IPOs
						</h2>
						<span>
							<Link href="/ipos/" prefetch={false}>
								<a className="bll">All Recent IPOs</a>
							</Link>
						</span>
					</div>
					<IPOTable ipos={recent} />
				</section>
				<section className="px-3 xs:px-4 sm:px-5 lg:px-0">
					<div className="mb-1 flex flex-row items-end justify-between">
						<h2 className="mb-1 text-2xl font-bold leading-tight">
							Upcoming IPOs
						</h2>
						<span>
							<Link href="/ipos/calendar/" prefetch={false}>
								<a className="bll">IPO Calendar</a>
							</Link>
						</span>
					</div>
					{upcoming.length ? (
						<IPOTable ipos={upcoming} />
					) : (
						<div className="w-full border border-gray-200 p-3">
							There are no upcoming IPOs that have been scheduled.{' '}
							<Link href="/ipos/filings/" prefetch={false}>
								<a className="bll">View all IPO filings.</a>
							</Link>
						</div>
					)}
				</section>
			</div>
		</>
	)
}
