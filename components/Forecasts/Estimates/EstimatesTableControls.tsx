import { Export } from 'components/Controls/Export'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { useState } from 'react'

export function EstimatesTableControls() {
	const [range, setRange] = useState('Annual')
	const { info } = useSymbolContext()

	return (
		<div className="flex space-x-4">
			<Dropdown title={range}>
				<div
					className={range === 'Annual' ? 'dd active' : 'dd'}
					onClick={() => setRange('Annual')}
				>
					Annual
				</div>
				<div
					className={range === 'Quarterly' ? 'dd active' : 'dd'}
					onClick={() => setRange('Quarterly')}
				>
					Quarterly
				</div>
			</Dropdown>
			<div className="hidden md:block">
				<Export
					tableId="financial-estimates"
					fileName={`${info.symbol}-estimates`}
				/>
			</div>
		</div>
	)
}
