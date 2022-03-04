import { useState } from 'react'
import { EstimatesStats } from './EstimatesStats'
import { EstimatesTable } from './EstimatesTable'
import { EstimatesTableControls } from './EstimatesTableControls'

export function Estimates() {
	const [range, setRange] = useState<'Annual' | 'Quarterly'>('Annual')

	return (
		<div>
			<div className="mb-2 flex flex-wrap items-center justify-between gap-x-2">
				<h2 className="mb-1 text-xl font-bold xs:mb-0">
					Financial Forecast
				</h2>
				<EstimatesTableControls range={range} setRange={setRange} />
			</div>
			<EstimatesStats range={range} />
			<EstimatesTable range={range} />
		</div>
	)
}
