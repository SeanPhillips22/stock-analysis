import { EstimatesTable } from './EstimatesTable'

export function Estimates() {
	return (
		<div className="rounded-sm border border-gray-200">
			<h2 className="mb-1 text-xl font-bold">Financial Estimates</h2>
			<EstimatesTable />
		</div>
	)
}
