import { HeadingLink } from 'components/Buttons/HeadingLink'
import { StockLink } from 'components/Links'

const cellStyles = 'py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-3 xl:px-4 text-sm sm:text-base border-gray-200'

interface Mover {
	symbol: string
	name: string
	price: string
	change: string
}

interface Props {
	date: string
	marketStatus: string
	gainers: Mover[]
	losers: Mover[]
}

export const Movers = ({ date, marketStatus, gainers, losers }: Props) => {
	interface InnerProps {
		movers: Mover[]
		type: string
	}

	const Rows = ({ movers, type }: InnerProps) => {
		const items = movers.slice(0, 10)
		const redOrGreen = type === 'Gainers' ? 'text-green-700' : 'text-red-600'

		return (
			<>
				{items.map((item, index) => {
					if (item.symbol) {
						return (
							<tr key={index} className="border-b border-gray-200 transition duration-100 hover:bg-gray-50">
								<td className={cellStyles + ' border-r text-left'}>
									<StockLink symbol={item.symbol} className="bll" />
								</td>
								<td
									className={
										cellStyles +
										' max-w-[90px] overflow-hidden text-ellipsis border-r text-left xs:max-w-[170px] md:max-w-[350px] xl:whitespace-nowrap'
									}
								>
									{item.name}
								</td>

								<td className={cellStyles + ' hidden border-r text-right tiny:table-cell'}>${item.price}</td>
								<td className={cellStyles + ' text-right ' + redOrGreen}>{item.change}%</td>
							</tr>
						)
					}
					return null
				})}
			</>
		)
	}

	const Table = ({ movers, type }: InnerProps) => {
		const titlePrefix = marketStatus === 'premarket' ? 'Pre-Market' : 'Top'
		const url =
			marketStatus === 'premarket' ? `/markets/premarket/${type.toLowerCase()}/` : `/markets/${type.toLowerCase()}/`

		return (
			<div className="grow">
				<div className="mb-1 flex flex-row items-end justify-between">
					<HeadingLink url={url} title={`${titlePrefix} ${type}`} />
					<span className="text-xs text-gray-600 xs:text-sm">
						<span className="hidden sm:inline">Updated </span>
						{date}
					</span>
				</div>
				<table className="w-full border border-gray-200">
					<thead>
						<tr className="border-t border-b border-gray-200">
							<th className={cellStyles + ' border-r text-left'}>Symbol</th>
							<th className={cellStyles + ' border-r text-left'}>Name</th>
							<th className={cellStyles + ' hidden border-r text-right tiny:table-cell'}>Price</th>
							<th className={cellStyles + ' text-right'}>Change</th>
						</tr>
					</thead>
					<tbody>
						<Rows movers={movers} type={type} />
					</tbody>
				</table>
			</div>
		)
	}

	return (
		<>
			<section className="mx-auto flex flex-col space-y-6 px-3 xs:px-4 sm:px-5 lg:max-w-[1200px] lg:flex-row lg:justify-evenly lg:space-y-0 lg:space-x-14">
				<Table movers={gainers} type="Gainers" />
				<Table movers={losers} type="Losers" />
			</section>
		</>
	)
}
