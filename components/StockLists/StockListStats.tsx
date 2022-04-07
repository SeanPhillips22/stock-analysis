import { formatCellRaw } from 'functions/tables/formatTableCell'
import { memo } from 'react'

type Props = {
	data: any
}

function StockListStatsComponent({ data }: Props) {
	const count = data.length
	const marketCap = data.reduce((a: number, b: any) => a + b.marketCap, 0)
	const revenue = data.reduce((a: number, b: any) => a + b.revenue, 0)

	const stats = [
		{
			name: 'Total Companies',
			stat: count
		},
		{
			name: 'Total Market Cap',
			stat: formatCellRaw('abbreviate', marketCap)
		},
		{
			name: 'Total Revenue',
			stat: formatCellRaw('abbreviate', revenue)
		}
	]

	return (
		<div>
			<dl className="mb-4 grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-lg border bg-white shadow">
				{stats.map(item => (
					<div key={item.name} className="px-2 py-5 bp:px-4 sm:p-6">
						<dt className="text-sm font-normal text-gray-900 xs:text-base">{item.name}</dt>
						<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
							<div className="flex items-baseline font-semibold leading-8 text-blue-brand_sharp tiny:text-lg xs:text-xl bp:text-[1.4rem] sm:text-2xl">
								{item.stat}
							</div>
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export const StockListStats = memo(StockListStatsComponent)
