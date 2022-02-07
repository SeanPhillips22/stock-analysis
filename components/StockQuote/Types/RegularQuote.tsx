import { useState } from 'react'
import { Quote } from 'types/Quote'
import { changeColor } from '../quote.functions'
import { usePulsingQuote } from '../usePulsingQuote'

type Props = {
	quote: Quote
}

export function RegularQuote({ quote }: Props) {
	const [q] = useState(quote)
	const color = changeColor(Number(q.c))
	const market = q.ms == 'open' ? 'Market open' : 'Market closed'
	const { animation } = usePulsingQuote(q.p)

	return (
		<div className="quote">
			<span className={`p${animation}`}>{q.pd}</span>{' '}
			<div className={`pc ${color}`}>
				<span className={`${color}${animation}`}>{`${q.c || '0.00'} (${
					q.cp || '0.00'
				}%)`}</span>
			</div>
			<div className="u">{`${q.u} - ${market}`}</div>
		</div>
	)
}
