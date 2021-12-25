import { useState, useEffect } from 'react'
import { Controls } from './PriceChartControls'
import { PriceChange } from './PriceChange'
import { Chart } from './PriceChartChart'
import { Info } from 'types/Info'
import {
	translateTime,
	UnavailableIpo,
	getChartColor
} from './PriceChart.functions'
import { Unavailable } from 'components/Unavailable'
import { useChart } from 'hooks/useChart'
import { useQuote } from 'hooks/useQuote'
import { LoadingLight } from 'components/Loading/LoadingLight'

type Props = {
	info: Info
}

export const PriceChart = ({ info }: Props) => {
	const [chartTime, setChartTime] = useState(
		info.isOTC || info.ticker === 'BRK.A' ? '1Y' : '1D'
	)
	const [message, setMessage] = useState('')

	const quote = useQuote(info)
	const { data, isFetching } = useChart(info, chartTime)

	useEffect(() => {
		setMessage('')
		if (info.state === 'upcomingipo') return

		if (!isFetching && (!data || !data.length)) {
			setMessage(`No ${translateTime(chartTime)} chart data available`)
		}
	}, [data, chartTime, info.state, isFetching])

	const changeProps = getChartColor(data, chartTime, quote)

	if (info.state === 'upcomingipo') {
		return <UnavailableIpo info={info} />
	}

	return (
		<div className="border-t border-b border-gray-200 lg:border-0 py-0.5 xs:py-1 sm:py-3 sm:px-2 lg:py-0 lg:px-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0">
			<div className="flex flex-row justify-between space-x-1 items-center py-1 sm:pt-0.5">
				<Controls chartTime={chartTime} setChartTime={setChartTime} />
				{data && data.length > 0 && (
					<PriceChange
						chartData={data}
						chartTime={chartTime}
						info={info}
					/>
				)}
			</div>
			<div className="h-[240px] sm:h-[300px] overflow-x-auto hide-scroll">
				{message && (
					<div className="pt-1.5 h-full">
						<Unavailable message={message} />
					</div>
				)}
				{isFetching ? (
					<LoadingLight />
				) : (
					data &&
					data.length && (
						<Chart
							key={Date.now()}
							chartData={data}
							chartTime={chartTime}
							info={info}
							quote={quote}
							changeProps={changeProps}
						/>
					)
				)}
			</div>
		</div>
	)
}
