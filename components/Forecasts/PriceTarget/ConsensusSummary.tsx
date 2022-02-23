import { useSymbolContext } from 'components/Layout/SymbolContext'
import { cn } from 'functions/helpers/classNames'

export function ConsensusSummary() {
	const { data } = useSymbolContext()
	let consensus = data.recommendations[0]?.consensus || 'n/a'
	let color = 'rgb(204, 204, 0)'

	switch (consensus) {
		case 'Strong Sell':
			color = 'text-red-700'
			break

		case 'Sell':
			color = 'text-red-500'
			break

		case 'Hold':
			color = 'text-gray-700'
			break

		case 'Buy':
			color = 'text-green-700'
			break

		case 'Strong Buy':
			color = 'text-green-800'
			break

		default:
			break
	}

	return (
		<div className="text-center text-xl font-semibold">
			Analyst Consensus:{' '}
			<span className={cn('font-bold', color)}>{consensus}</span>
		</div>
	)
}
