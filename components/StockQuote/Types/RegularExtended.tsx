import { Quote } from 'types/Quote'
import { useQuoteColor } from '../useQuoteColor'

type Props = {
	quote: Quote
}

export function RegularExtended({ quote }: Props) {
	const color = useQuoteColor(Number(quote.ec))

	return (
		<div className="quote er">
			<div className="pd">{quote.pd}</div>
			<div className="pc">
				<span className={color}>{`${quote.c} (${quote.cp}%)`}</span>
			</div>
			<div className="und">
				<span>At close:</span> {quote.u}
			</div>
		</div>
	)
}
