import { useSymbolContext } from 'components/Layout/SymbolContext'

export function Snippet() {
	const { info, data } = useSymbolContext()
	const { symbol, name } = info
	let displayName = name.length < 12 ? name : symbol.toUpperCase()
	let recs = data.recommendations
	let { total, consensus } = recs[recs.length - 1]
	let { average, low, high, change } = data.targets

	// Format the text that says how much the price is forecasted to change
	let diffString =
		change > 0
			? 'an increase of ' + change + '%'
			: change < 0
			? 'a decrease of ' + change + '%'
			: 'no change'

	return (
		<p>
			{`According to ${total} stock analysts, the average 12-month stock price forecast for ${displayName} stock is $${average}, which predicts ${diffString} over the next year. The lowest forecast is $${low} and the highest is $${high}. On average, analysts rate ${displayName} stock as a ${consensus.toLowerCase()}.`}
		</p>
	)
}
