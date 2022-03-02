import { EstimatesStats } from './EstimatesStats'
import { EstimatesTable } from './EstimatesTable'
import { EstimatesTableControls } from './EstimatesTableControls'

export function Estimates() {
	return (
		<>
			<div>
				<div className="mb-1 flex justify-between">
					<h2 className="text-xl font-bold">Financial Estimates</h2>
					<EstimatesTableControls />
				</div>
				<div className="md:rounded-sm md:border md:border-gray-200 md:p-4">
					<EstimatesStats />
					<EstimatesTable />
				</div>
			</div>
		</>
	)
}
