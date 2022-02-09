import { useEffect, useMemo, useState } from 'react'

export function useQuoteColor(change: number) {
	const [color, setColor] = useState<string>(
		!isNaN(change) && change > 0 ? 'qg' : change < 0 ? 'qr' : 'qgr'
	)

	useEffect(() => {
		if (!isNaN(change)) {
			setColor(change > 0 ? 'qg' : change < 0 ? 'qr' : 'qgr')
		}
	}, [change])

	const returnColor = useMemo(() => color, [color])

	return returnColor
}
