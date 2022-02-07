import { Quote } from 'types/Quote'
import { usePulsingQuote } from '../usePulsingQuote'
import { useQuoteColor } from '../useQuoteColor'

type Props = {
	quote: Quote
}

export function RegularQuote({ quote }: Props) {
	const color = useQuoteColor(Number(quote.c))
	const { animation } = usePulsingQuote(quote.p)

	return (
		<div className="quote">
			<span className={`p${animation}`}>{quote.pd}</span>{' '}
			<div className={`pc ${color}`}>
				<span className={`${color}${animation}`}>{`${quote.c || '0.00'} (${
					quote.cp || '0.00'
				}%)`}</span>
			</div>
			<div className="u">{`${quote.u} - Market ${quote.ms}`}</div>
		</div>
	)
}
