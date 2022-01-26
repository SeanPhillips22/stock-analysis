import { usePrevious } from 'hooks/usePrevious'
import { useEffect, useState } from 'react'

export function usePulsingQuote(price: number) {
	const [animation, setAnimation] = useState('')
	const prev = usePrevious(price)

	useEffect(() => {
		let timer: any

		if (price > prev) {
			setAnimation(' animate-pulseup')
			timer = setTimeout(() => {
				setAnimation('')
			}, 800)
		} else if (price < prev) {
			setAnimation(' animate-pulsedown')
			timer = setTimeout(() => {
				setAnimation('')
			}, 800)
		}

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [price])

	return { animation }
}
