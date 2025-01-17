import { Export } from 'components/Controls/Export'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { cn } from 'functions/helpers/classNames'

type Props = {
	range: 'Annual' | 'Quarterly'
	setRange: (range: 'Annual' | 'Quarterly') => void
}

export function EstimatesTableControls({ range, setRange }: Props) {
	const { info, data } = useSymbolContext()

	// Hide export button if no data
	let showExport = true
	if (data.estimates.table.annual.length === 0 && data.estimates.table.quarterly.length === 0) {
		showExport = false
	}

	return (
		<div className="flex space-x-4">
			<span className="relative z-0 inline-flex rounded-md shadow-sm">
				<button
					type="button"
					className={cn(
						'eventbtn relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 bp:px-3 sm:py-2 sm:px-4',
						range === 'Annual' ? 'bg-gray-100' : ''
					)}
					id="Page_Forecast_Toggle_Annual"
					onClick={() => setRange('Annual')}
				>
					Annual
				</button>
				<button
					type="button"
					className={cn(
						'eventbtn relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 bp:px-3 sm:py-2 sm:px-4',
						range === 'Quarterly' ? 'bg-gray-100' : ''
					)}
					id="Page_Forecast_Toggle_Quarterly"
					onClick={() => setRange('Quarterly')}
				>
					Quarterly
				</button>
			</span>
			{showExport && (
				<div className="hidden md:block">
					<Export tableId="estimates-table" fileName={`${info.symbol}-estimates`} />
				</div>
			)}
		</div>
	)
}
