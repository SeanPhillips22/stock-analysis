import { useSymbolContext } from 'components/Layout/SymbolContext'

// TODO need to validate the data to prevent errors
// TODO need to account for missing data
export function Snippet() {
	const { info, data } = useSymbolContext()
	const { symbol, name } = info
	let displayName = name.length < 12 ? name : symbol
	let { total, consensus } = data.recommendations[0]
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
			According to {total} stock analysts, the average 12-month stock price
			forecast for {displayName} stock is ${average}, which predicts{' '}
			{diffString} over the next year. The lowest forecast is ${low} and the
			highest is ${high}. On average, analysts rate {displayName} stock as a{' '}
			{consensus.toLowerCase()}.
		</p>
	)
}
