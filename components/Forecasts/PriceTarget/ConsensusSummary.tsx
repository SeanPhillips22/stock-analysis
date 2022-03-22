import { useSymbolContext } from 'components/Layout/SymbolContext'
import { cn } from 'functions/helpers/classNames'

export function ConsensusSummary() {
	const { data } = useSymbolContext()

	// get the consensus value from the last item in the array
	let length = data?.recommendations?.length || 0
	let indx = length > 0 ? length - 1 : 0
	let consensus = data.recommendations[indx]?.consensus || 'n/a'

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
			Analyst Consensus: <span className={cn('font-bold', color)}>{consensus}</span>
		</div>
	)
}
