import { Quote } from 'types/Quote'
import { changeColor } from '../quote.functions'
import { usePulsingQuote } from '../usePulsingQuote'

type Props = {
	quote: Quote
}

export function RegularQuote({ quote }: Props) {
	const color = changeColor(Number(quote.c))
	const market = quote.ms == 'open' ? 'Market open' : 'Market closed'
	const { animation } = usePulsingQuote(quote.p)

	return (
		<div className="quote">
			<span className={`price${animation}`}>{quote.pd}</span>{' '}
			<div className={`priceChange ${color}`}>
				<span className={`${color}${animation}`}>{`${quote.c || '0.00'} (${
					quote.cp || '0.00'
				}%)`}</span>
			</div>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{`${quote.u} - ${market}`}
			</div>
		</div>
	)
}
