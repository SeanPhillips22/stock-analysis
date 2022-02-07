import { changeColor } from '../quote.functions'
import { MoonIcon } from 'components/Icons/Moon'
import { SunIcon } from 'components/Icons/Sun'
import { usePulsingQuote } from '../usePulsingQuote'
import { Quote } from 'types/Quote'
import { useState } from 'react'

type Props = {
	quote: Quote
}

export function ExtendedQuote({ quote }: Props) {
	const [q] = useState(quote)
	const color = changeColor(Number(q.ec))
	const { animation } = usePulsingQuote(q.ep)

	return (
		<div className="quote ext">
			<div className={`p-ext${animation}`}>{q.epd}</div>{' '}
			<div className={`pc-ext ${color}`}>
				<span
					className={`${color}${animation}`}
				>{`${q.ec} (${q.ecp}%)`}</span>
			</div>
			<div className="und">
				<span className="sp1">
					{q.es === 'Pre-market' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="sp2">{q.es}:</span>
				</span>
				<span className="sp3">{q.eu}</span>
			</div>
		</div>
	)
}
