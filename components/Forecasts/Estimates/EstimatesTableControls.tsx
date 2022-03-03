import { Export } from 'components/Controls/Export'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { cn } from 'functions/helpers/classNames'

type Props = {
	range: 'Annual' | 'Quarterly'
	setRange: (range: 'Annual' | 'Quarterly') => void
}

export function EstimatesTableControls({ range, setRange }: Props) {
	const { info } = useSymbolContext()

	return (
		<div className="flex space-x-4">
			<span className="relative z-0 inline-flex rounded-md shadow-sm">
				<button
					type="button"
					className={cn(
						'relative inline-flex items-center rounded-l-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
						range === 'Annual' ? 'bg-gray-100' : ''
					)}
					onClick={() => setRange('Annual')}
				>
					Annual
				</button>
				<button
					type="button"
					className={cn(
						'relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
						range === 'Quarterly' ? 'bg-gray-100' : ''
					)}
					onClick={() => setRange('Quarterly')}
				>
					Quarterly
				</button>
			</span>
			<div className="hidden md:block">
				<Export
					tableId="estimates-table"
					fileName={`${info.symbol}-estimates`}
				/>
			</div>
		</div>
	)
}
