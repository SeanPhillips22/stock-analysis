import { Donut } from '../Ratings/Donut'
import { PriceTargetChart } from './PriceTargetChart'
// import { PriceTargetText } from './PriceTargetText'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'

export function PriceTarget() {
	return (
		<>
			<div className="mt-2">
				<div className="border border-gray-200 lg:p-4">
					<div className="lg:flex lg:gap-x-6 lg:divide-x">
						<div className="p-4 lg:max-w-[32%] lg:p-0">
							<h2 className="hh3 mb-1">Stock Price Forecast</h2>
							<Snippet />
							<div className="">
								<Donut />
								<div className="text-center text-xl font-semibold">
									Analyst Consensus:{' '}
									<span className="font-bold text-green-800">
										Strong Buy
									</span>
								</div>
							</div>
						</div>
						<div className="grow lg:pl-4">
							{/* <PriceTargetText /> */}
							<div className="">
								<PriceTargetChart />
								<SummaryTable />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
