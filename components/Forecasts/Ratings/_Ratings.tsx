import { AnalystWidgetChart } from 'components/Overview/AnalystWidgetChart'
import { Donut } from './Donut'
import { RatingsTable } from './RatingsTable'

export function Ratings() {
	return (
		<div className="border border-gray-200 p-4 lg:order-1">
			<div className="lg:flex lg:gap-x-6 lg:divide-x">
				<div className="lg:max-w-[30%]">
					<h2 className="hh3">Analyst Ratings</h2>
					<p>
						The average analyst rating for Apple stock from 43 stock
						analysts is to buy the stock. This means that analysts believe
						this stock is likely to outperform the market over the next
						twelve months.
					</p>
					<Donut />
					<div className="text-center text-xl font-semibold">
						Analyst Consensus:{' '}
						<span className="font-bold text-green-800">Strong Buy</span>
					</div>
				</div>
				<div className="grow pl-4">
					<h2 className="hh3">Recommendation Trends</h2>
					<div>
						<AnalystWidgetChart
							ratings={{
								strongsell: 0,
								sell: 0,
								hold: 3,
								buy: 7,
								strongbuy: 27
							}}
						/>
					</div>
					<RatingsTable />
				</div>
			</div>
		</div>
	)
}
