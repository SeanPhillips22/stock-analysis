import { useSymbolContext } from 'components/Layout/SymbolContext'

export function RatingsSnippet() {
	const { info, data } = useSymbolContext()

	const recommendations = data.recommendations[data.recommendations.length - 1]
	const { total, consensus } = recommendations || {}
	let displayName = info.name.length < 12 ? info.name : info.ticker

	let snippet = ''
	if (!consensus) {
		snippet = `There are currently no analyst ratings available for ${displayName}.`
	} else {
		let explanation = ''

		switch (consensus) {
			case 'Strong Buy':
				explanation =
					'perform very well in the near future and significantly outperform the market'
				break

			case 'Buy':
				explanation = 'outperform the market over the next twelve months'
				break

			case 'Hold':
				explanation = 'perform similarly to the overall market'
				break

			case 'Sell':
				explanation = 'lead to lower returns than market as a whole'
				break

			case 'Strong Sell':
				explanation = 'have very poor returns in the near future'
				break

			default:
				break
		}

		snippet = `The average analyst rating for ${displayName} stock from ${total} stock analysts is "${consensus}". This means that analysts believe this stock is likely to ${explanation}.`
	}

	return <p>{snippet}</p>
}
