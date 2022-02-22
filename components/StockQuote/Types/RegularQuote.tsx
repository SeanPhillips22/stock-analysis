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
			<div className={`p${animation}`}>{quote.pd}</div>{' '}
			<div className={`pc ${color}`}>
				{`${quote.c || '0.00'} (${quote.cp || '0.00'}%)`}
			</div>
			<div className="u">{`${quote.u} - Market ${quote.ms}`}</div>
		</div>
	)
}
