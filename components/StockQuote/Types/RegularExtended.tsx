import { Quote } from 'types/Quote'

type Props = {
	quote: Quote
}

/* The regular quote price when the extended price is also showing */
export function RegularExtended({ quote }: Props) {
	// Decide which color to show
	let change = Number(quote.c)
	let color = 'qgr'
	if (!isNaN(change)) {
		if (change > 0) color = 'qg'
		else if (change < 0) color = 'qr'
	}

	return (
		<div className="quote er">
			<div className="p">{quote.pd}</div>
			<div className={`pc ${color}`}>{`${quote.c} (${quote.cp}%)`}</div>
			<div className="und">
				<span>At close:</span> {quote.u}
			</div>
		</div>
	)
}
