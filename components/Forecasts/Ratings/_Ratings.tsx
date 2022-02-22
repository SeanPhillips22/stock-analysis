import { useSymbolContext } from 'components/Layout/SymbolContext'
import { getPageDataFull } from 'functions/apis/callBackEnd'
import { useAuthState } from 'hooks/useAuthState'
import { useEffect, useState } from 'react'
import { ForecastData } from 'types/Forecast'
import { AnalystTrendsChart } from './AnalystTrendsChart'
import { RatingChartType } from './Controls/RatingChartType'
import { RatingExport } from './Controls/RatingExport'
import { RatingHistory } from './Controls/RatingHistory'
import { RatingsSnippet } from './RatingsSnippet'
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

	return (
		<div className="border border-gray-200 p-4 lg:flex lg:gap-x-6 lg:divide-x">
			<div className="lg:max-w-[25%]">
				<h2 className="hh3">Analyst Ratings</h2>
				<RatingsSnippet />
			</div>
			<div className="grow lg:pl-4">
				<div className="md:flex md:justify-between">
					<h2 className="hh3">Recommendation Trends</h2>
					{data.recommendations.length > 0 && (
						<div className="flex space-x-4">
							<RatingChartType />
							<RatingHistory />
							<RatingExport data={data} />
						</div>
					)}
				</div>
				<AnalystTrendsChart data={data} />
				<RatingsTable />
			</div>
		</div>
	)
}
