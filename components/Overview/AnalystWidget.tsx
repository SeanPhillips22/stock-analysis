import { Button } from 'components/Buttons/Button'
import { Info } from 'types/Info'
import { Overview } from 'types/Overview'
import { AnalystWidgetChart } from './AnalystWidgetChart'

function PriceTarget({ target }: { target: string[] }) {
	const priceTarget = target[0]
	const difference = target[1]
	const updown = target[2]

	if (updown === 'upside') {
		return (
			<>
				<div className="mb-0.5 text-center text-4xl font-semibold text-green-700">
					{priceTarget}
				</div>
				<div className="mb-1.5 text-center text-xl">
					({difference} upside)
				</div>
			</>
		)
	} else if (updown === 'downside') {
		return (
			<>
				<div className="mb-0.5 text-center text-4xl font-semibold text-red-600">
					{priceTarget}
				</div>
				<div className="mb-1.5 text-center text-xl">
					({difference} downside)
				</div>
			</>
		)
	} else {
		return (
			<div className="mb-0.5 text-center text-4xl font-semibold text-gray-800">
				{priceTarget}
			</div>
		)
	}
}

function AnalystConsensus({ consensus }: { consensus: string }) {
	switch (consensus) {
		case 'Buy':
		case 'Strong Buy':
			return <span className="font-bold text-green-800">{consensus}</span>

		case 'Underweight':
		case 'Sell':
			return <span className="font-bold text-red-600">{consensus}</span>

		default:
			return <span className="font-bold text-gray-800">{consensus}</span>
	}
}

export const AnalystWidget = ({
	info,
	data
}: {
	info: Info
	data: Overview
}) => {
	if (
		typeof data.analystTarget === 'undefined' ||
		data.analystTarget[0] === '0' ||
		data.analysts === 'n/a'
	) {
		return null
	}

	const ratings = data.analystChart

	return (
		<div>
			<h2 className="hh2 mb-2">Analyst Forecast</h2>
			{data.analystIntro && (
				<p className="mb-4 text-gray-900">{data.analystIntro}</p>
			)}
			<div className="border border-gray-200 p-2 xs:p-3">
				<div className="m-auto mb-2 text-center text-xl font-semibold text-gray-900">
					Price Target
				</div>

				<PriceTarget target={data.analystTarget} />
				<div className="py-1 text-center text-lg font-semibold text-gray-900">
					Analyst Consensus: <AnalystConsensus consensus={data.analysts} />
				</div>

				<div className="h-48">
					<AnalystWidgetChart ratings={ratings} />
				</div>
			</div>
			{['aapl', 'msft', 'amzn', 'tsla', 'fb', 'baba'].includes(
				info.symbol
			) && (
				<Button
					url={`/stocks/${info.symbol}/forecast/`}
					text="Analyst Forecast"
				/>
			)}
		</div>
	)
}
