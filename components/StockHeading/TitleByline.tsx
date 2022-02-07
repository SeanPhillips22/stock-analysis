import { useQuote } from 'hooks/useQuote'
import { Info } from 'types/Info'
import { isTradingHoursClosed } from 'functions/datetime/isTradingHours'
import { useState } from 'react'

export function TitleByline({ info }: { info: Info }) {
	const quote = useQuote(info)
	const [timing] = useState(
		info.exchange === 'OTCMKTS' || (quote.e && !isTradingHoursClosed())
			? 'Delayed Price'
			: 'IEX Real-Time Price'
	)

	// Got some JS errors in the log that quote was null on brand new IPOs
	if (quote === null) {
		return null
	}

	return (
		<div className="text-tiny text-gray-600 mt-[1px]">
			{`${info.exchange}: ${info.ticker} · ${timing} · USD`}
		</div>
	)
}
