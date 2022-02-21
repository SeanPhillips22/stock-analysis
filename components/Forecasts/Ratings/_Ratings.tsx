import { useSymbolContext } from 'components/Layout/SymbolContext'
import { getPageDataFull } from 'functions/apis/callBackEnd'
import { useAuthState } from 'hooks/useAuthState'
import { useEffect, useState } from 'react'
import { ForecastData } from 'types/Forecast'
import { AnalystTrendsChart } from './AnalystTrendsChart'
import { RatingChartType } from './Controls/RatingChartType'
import { RatingExport } from './Controls/RatingExport'
import { RatingHistory } from './Controls/RatingHistory'
import { RatingsTable } from './RatingsTable'

export function Ratings() {
	const { info, data: freeData } = useSymbolContext()
	const [data, setData] = useState(freeData as ForecastData)
	const { isPro } = useAuthState()

	useEffect(() => {
		async function getProData() {
			let res = await getPageDataFull('fc', info.symbol)
			if (res) {
				setData(res)
			}
		}

		if (isPro) {
			getProData()
		}
	}, [isPro, info.symbol])

	const recommendations = data.recommendations[data.recommendations.length - 1]
	const { total, consensus } = recommendations
	let displayName = info.name.length < 12 ? info.name : info.ticker

	let explanation = ''
	switch (consensus) {
		case 'Strong Buy':
			explanation =
				'perform very well in the near future and significantly outperform the market'
			break

		case 'Buy':
			explanation = 'outperform the market over the next twelve months'
			break

		case 'Hold':
			explanation = 'perform similarly to the overall market'
			break

		case 'Sell':
			explanation = 'lead to lower returns than market as a whole'
			break

		case 'Strong Sell':
			explanation = 'have very poor returns in the near future'
			break

		default:
			break
	}
	console.log(data)
	return (
		<div className="border border-gray-200 p-4 lg:order-1">
			<div className="lg:flex lg:gap-x-6 lg:divide-x">
				<div className="lg:max-w-[25%]">
					<h2 className="hh3">Analyst Ratings</h2>
					<p>
						{`The average analyst rating for ${displayName} stock from ${total} stock analysts is "${consensus}". This means that analysts believe this stock is likely to ${explanation}.`}
					</p>
				</div>
				<div className="grow pl-4">
					<div className="flex justify-between">
						<h2 className="hh3">Recommendation Trends</h2>
						<div className="flex space-x-4">
							<RatingChartType />
							<RatingHistory />
							<RatingExport data={data} />
						</div>
					</div>
					<AnalystTrendsChart data={data} />
					<RatingsTable />
				</div>
			</div>
		</div>
	)
}
