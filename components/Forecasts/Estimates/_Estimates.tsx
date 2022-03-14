import { useSymbolContext } from 'components/Layout/SymbolContext'
import { Unavailable } from 'components/Unavailable'
import { useState } from 'react'
import { ForecastData } from 'types/Forecast'
import { EstimatesStats } from './EstimatesStats'
import { EstimatesTable } from './EstimatesTable'
import { EstimatesTableControls } from './EstimatesTableControls'

export function Estimates() {
	const { data }: { data: ForecastData } = useSymbolContext()
	const [range, setRange] = useState<'Annual' | 'Quarterly'>('Annual')

	if (!data.estimates.table.annual.dates) {
		return (
			<div>
				<h2 className="mb-3 text-xl font-bold">Financial Forecast</h2>
				<Unavailable
					message="No financial forecasts available for this stock"
					classes="min-h-[250px]"
				/>
			</div>
		)
	}

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
