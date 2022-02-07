import { MoonIcon } from 'components/Icons/Moon'
import { SunIcon } from 'components/Icons/Sun'
import { usePulsingQuote } from '../usePulsingQuote'
import { Quote } from 'types/Quote'
import { useQuoteColor } from '../useQuoteColor'

type Props = {
	quote: Quote
}

export function ExtendedQuote({ quote }: Props) {
	const color = useQuoteColor(Number(quote.ec))
	const { animation } = usePulsingQuote(quote.ep)

	return (
		<div className="quote ext">
			<div className={`p-ext${animation}`}>{quote.epd}</div>{' '}
			<div className={`pc-ext ${color}`}>
				<span
					className={`${color}${animation}`}
				>{`${quote.ec} (${quote.ecp}%)`}</span>
			</div>
			<div className="und">
				<span className="sp1">
					{quote.es === 'Pre-market' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="sp2">{quote.es}:</span>
				</span>
				<span className="sp3">{quote.eu}</span>
			</div>
		</div>
	)
}
