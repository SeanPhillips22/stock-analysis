import { useState } from 'react'
import { EstimatesStats } from './EstimatesStats'
import { EstimatesTable } from './EstimatesTable'
import { EstimatesTableControls } from './EstimatesTableControls'

export function Estimates() {
	const [range, setRange] = useState<'Annual' | 'Quarterly'>('Annual')

	return (
		<>
			<div>
				<div className="mb-2 flex items-center justify-between">
					<h2 className="text-xl font-bold">Financial Estimates</h2>
					<EstimatesTableControls range={range} setRange={setRange} />
				</div>
				<EstimatesStats range={range} />
				<EstimatesTable range={range} />
			</div>
		</>
	)
}
