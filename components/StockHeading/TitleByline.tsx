import { Info } from 'types/Info'
import { isTradingHoursClosed } from 'functions/datetime/isTradingHours'

export function TitleByline({ info }: { info: Info }) {
	const timing =
		info.isOTC || (info.quote.e && !isTradingHoursClosed())
			? 'Delayed Price'
			: 'IEX Real-Time Price'

	return (
		<div className="sh-details">
			{`${info.exchange}: ${info.ticker} · ${timing} · USD`}
		</div>
	)
}
