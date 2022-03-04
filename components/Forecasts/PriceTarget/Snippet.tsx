import { useSymbolContext } from 'components/Layout/SymbolContext'
import { formatTarget } from './target.functions'

export function Snippet() {
	const { info, data } = useSymbolContext()
	const { symbol, name } = info
	let displayName = name.length < 12 ? name : symbol.toUpperCase()
	let recs = data.recommendations

	let { total, consensus } = recs[recs.length - 1] || {}
	let { average, low, high, change } = data.targets || {}

	// Format the text that says how much the price is forecasted to change
	let diffString =
		change > 0
			? 'an increase of ' + change + '%'
			: change < 0
			? 'a decrease of ' + change + '%'
			: 'no change'

	// Format the text describing the price target and analyst consensus
	let consensusText = ''
	if (!consensus) {
		consensusText = `There is currently no analyst price target forecast available for ${displayName}.`
	} else {
		consensusText = `According to ${total} stock analysts, the average 12-month stock price forecast for ${displayName} stock is $${formatTarget(
			average
		)}, which predicts ${diffString}. The lowest target is $${formatTarget(
			low
		)} and the highest is $${formatTarget(
			high
		)}. On average, analysts rate ${displayName} stock as a ${consensus.toLowerCase()}.`
	}

	return <p>{consensusText}</p>
}
