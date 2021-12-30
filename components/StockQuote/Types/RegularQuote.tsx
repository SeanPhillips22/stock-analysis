import { usePrevious } from 'hooks/usePrevious'
import { useQuote } from 'hooks/useQuote'
import { useEffect, useState } from 'react'
import { Info } from 'types/Info'
import { changeColor } from '../quote.functions'

export function RegularQuote({ info }: { info: Info }) {
	const quote = useQuote(info)
	const color = changeColor(Number(quote.c))
	const market = quote.ms == 'open' ? 'Market open' : 'Market closed'
	const [animation, setAnimation] = useState('')

	const prev = usePrevious(quote.p)

	useEffect(() => {
		let timer: any

		if (quote.p > prev) {
			setAnimation('animate-pulseup')
			timer = setTimeout(() => {
				setAnimation('')
			}, 800)
		} else if (quote.p < prev) {
			setAnimation('animate-pulsedown')
			timer = setTimeout(() => {
				setAnimation('')
			}, 800)
		}

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quote])

	return (
		<div className="quote">
			<span className={`price ${animation}`}>{quote.pd}</span>{' '}
			<span className={`priceChange ${animation}`}>
				<span className={color}>{`${quote.c || '0.00'} (${
					quote.cp || '0.00'
				}%)`}</span>
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{`${quote.u} - ${market}`}
			</div>
		</div>
	)
}
