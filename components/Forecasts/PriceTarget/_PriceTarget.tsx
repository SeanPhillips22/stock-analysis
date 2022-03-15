import { ConsensusChart } from './ConsensusChart'
import { ConsensusSummary } from './ConsensusSummary'
import { PriceTargetChart } from './PriceTargetChart'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'
import { useSymbolContext } from 'components/Layout/SymbolContext'

import { EstimateChart } from 'components/Forecasts/Estimates/EstimateChart'

export function PriceTarget() {
	const { data } = useSymbolContext()

	return (
		<>
			<div className="rounded-sm border border-gray-200 p-0.5 xs:p-1 md:flex md:flex-col md:gap-y-4 md:divide-y md:p-4 lg:flex-row lg:gap-x-4 lg:divide-y-0 lg:divide-x">
				<div className="p-3 md:flex md:p-0 lg:block lg:max-w-[32%]">
					<div>
						<h2 className="mb-1 text-xl font-bold">
							Stock Price Forecast
						</h2>
						<Snippet />
					</div>
					<div>
						<ConsensusChart />
						<ConsensusSummary />
					</div>
				</div>
				<div className="grow md:pt-4 lg:pt-0 lg:pl-4">
					<EstimateChart />
					{data.targets.chart && <PriceTargetChart />}
					<SummaryTable />
				</div>
			</div>
		</>
	)
}
