import { Info } from 'types/Info'

export function TitleByline({ info }: { info: Info }) {
	const timing = info.isOTC ? 'Delayed Price' : 'IEX Real-Time Price'

	return (
		<div className="sh-details">
			{`${info.exchange}: ${info.ticker} · ${timing} · USD`}
		</div>
	)
}
