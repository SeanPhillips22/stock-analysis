import { ConsensusChart } from './ConsensusChart'
import { ConsensusSummary } from './ConsensusSummary'
import { PriceTargetChart } from './PriceTargetChart'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'
import { useSymbolContext } from 'components/Layout/SymbolContext'

export function PriceTarget() {
	const { data } = useSymbolContext()

	return (
		<>
			<div className="rounded-sm border border-gray-200 p-1 lg:flex lg:gap-x-4 lg:divide-x lg:p-4">
				<div className="p-3 lg:max-w-[32%] lg:p-0">
					<h2 className="mb-1 text-xl font-bold">Stock Price Forecast</h2>
					<Snippet />
					<ConsensusChart />
					<ConsensusSummary />
				</div>
				<div className="grow lg:pl-4">
					{data.targets.chart && <PriceTargetChart />}
					<SummaryTable />
				</div>
			</div>
		</>
	)
}
