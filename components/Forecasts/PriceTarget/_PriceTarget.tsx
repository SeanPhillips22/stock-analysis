import { PriceTargetChart } from './PriceTargetChart'
import { PriceTargetText } from './PriceTargetText'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'

export function PriceTarget() {
	return (
		<div className="mt-2">
			<div className="border border-gray-200 lg:p-4">
				<div className="lg:flex lg:gap-x-6 lg:divide-x">
					<div className="p-4 lg:max-w-[32%] lg:p-0">
						<h2 className="hh3 mb-1">Stock Price Forecast</h2>
						<Snippet />
						<SummaryTable />
					</div>
					<div className="grow lg:pl-2">
						<PriceTargetText />
						<div className="h-[275px]">
							<PriceTargetChart />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
