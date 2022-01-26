import { useQuote } from 'hooks/useQuote'
import { Info } from 'types/Info'
import { changeColor } from '../quote.functions'
import { MoonIcon } from 'components/Icons/Moon'
import { SunIcon } from 'components/Icons/Sun'
import { usePulsingQuote } from '../usePulsingQuote'

export function ExtendedQuote({ info }: { info: Info }) {
	const quote = useQuote(info)
	const color = changeColor(Number(quote.ec))
	const { animation } = usePulsingQuote(quote.ep)

	return (
		<div className="quote ext">
			<div className={`price-ext${animation}`}>{quote.epd}</div>{' '}
			<div className={`priceChange-ext ${color}`}>
				<span
					className={`${color}${animation}`}
				>{`${quote.ec} (${quote.ecp}%)`}</span>
			</div>
			<div className="mt-1 text-gray-700 sm:flex text-xxs xs:text-tiny">
				<span className="flex items-center">
					{quote.es === 'Pre-market' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="ml-1 font-semibold">{quote.es}:</span>
				</span>
				<span className="sm:ml-1">{quote.eu}</span>
			</div>
		</div>
	)
}
