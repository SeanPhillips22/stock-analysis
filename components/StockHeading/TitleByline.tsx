import { Info } from 'types/Info'
import { isExtended } from 'functions/datetime/isTradingHours'
import { useEffect, useState } from 'react'

export function TitleByline({ info }: { info: Info }) {
	// The server-rendered text deciding whether to show delayed or real-time price
	// if OTC, or quote is extended and market closed
	const [timing, setTiming] = useState(
		info.isOTC || (info.quote.e && isExtended) ? 'Delayed Price' : 'IEX Real-Time Price'
	)

	// On the client, check whether to change from extended to RTH or vice versa
	// This ensures that the correct value is shown even when the page is cached
	useEffect(() => {
		if (!info.isOTC && !isExtended && timing === 'Delayed Price') {
			setTiming('IEX Real-Time Price')
		}
	}, [info.isOTC, timing])

	return <div className="sh-details">{`${info.exchange}: ${info.ticker} · ${timing} · USD`}</div>
}
