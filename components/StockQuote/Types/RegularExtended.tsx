import { useState } from 'react'
import { Quote } from 'types/Quote'
import { changeColor } from '../quote.functions'

type Props = {
	quote: Quote
}

export function RegularExtended({ quote }: Props) {
	const [q] = useState(quote)
	const color = changeColor(Number(q.c))

	return (
		<div className="quote er">
			<div className="pd">{q.pd}</div>
			<div className="pc">
				<span className={color}>{`${q.c} (${q.cp}%)`}</span>
			</div>
			<div className="und">
				<span>At close:</span> {q.u}
			</div>
		</div>
	)
}
