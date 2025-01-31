import { useSymbolContext } from 'components/Layout/SymbolContext'
import { getPageDataFull } from 'functions/apis/callBackEnd'
import { useAuthState } from 'auth/useAuthState'
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
			if (res) setData(res)
		}

		setData(freeData)

		if (isPro) {
			getProData()
		}
	}, [isPro, info.symbol, freeData])

	return (
		<div className="rounded-sm border border-gray-200 p-3 lg:flex lg:gap-x-4 lg:divide-x">
			<div className="p-1 lg:max-w-[25%]">
				<h2 className="hh3 mb-2">Analyst Ratings</h2>
				<RatingsSnippet />
			</div>
			<div className="grow lg:pl-4">
				<div className="my-2 p-1 md:mt-3 md:mb-0 md:flex md:justify-between lg:my-0">
					<h2 className="hh3 mb-2 md:mb-3">Recommendation Trends</h2>
					{data.recommendations.length > 0 && (
						<div className="flex flex-wrap justify-between space-x-2 sm:space-x-4">
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
