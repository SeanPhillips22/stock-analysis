import { useSymbolContext } from 'components/Layout/SymbolContext'
import { cn } from 'functions/helpers/classNames'

export function ConsensusSummary() {
	const { data } = useSymbolContext()
	let consensus = data.recommendations[0]?.consensus || 'n/a'
	let color = 'rgb(204, 204, 0)'

	switch (consensus) {
		case 'Strong Sell':
			color = 'rgb(153, 0, 0)'
			break

		case 'Sell':
			color = 'rgb(153, 76, 0)'
			break

		case 'Hold':
			color = 'rgb(204, 204, 0)'
			break

		case 'Buy':
			color = 'rgb(76, 153, 0)'
			break

		case 'Strong Buy':
			color = 'rgb(0, 153, 0)'
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
