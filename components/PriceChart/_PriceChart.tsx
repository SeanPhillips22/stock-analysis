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
import { InitialData } from 'types/Charts'

type Props = {
	info: Info
	initial: InitialData
}

export function PriceChart({ info, initial }: Props) {
	const [chartTime, setChartTime] = useState('1D')
	const [message, setMessage] = useState('')
	const [initialFetch, setInitialFetch] = useState(true)

	const quote = useQuote(info)
	const { data, isFetching } = useChart(info, chartTime, initial)

	// Handle cases when the chart is unavailable
	useEffect(() => {
		setMessage('')
		if (info.state === 'upcomingipo') return

		// If the 1D data fails on the first request, try the 1Y chart instead
		if (!isFetching && initialFetch && (!data || !data.length)) {
			setChartTime('1Y')
			setInitialFetch(false)
		}

		// If it is not the initial 1D request but fails, show an error message
		if (!isFetching && !initialFetch && (!data || !data.length)) {
			setMessage(`No ${translateTime(chartTime)} chart data available`)
		}
	}, [data, chartTime, info.state, isFetching, initialFetch])

	const changeProps = getChartColor(data, chartTime, quote)

	if (info.state === 'upcomingipo') {
		return <UnavailableIpo info={info} />
	}

	// Display the chart
	function DisplayChart() {
		return (
			<Chart
				key={Date.now()}
				chartData={data}
				chartTime={chartTime}
				info={info}
				quote={quote}
				changeProps={changeProps}
			/>
		)
	}

	// Decide whether to show the chart, spinner or error message
	function ChartOrSpinner() {
		if (isFetching) {
			if (initialFetch && data && data.length) return <DisplayChart />
			else return <LoadingLight />
		}

		if (data && data.length) return <DisplayChart />
		else
			return (
				<div className="pt-1.5 h-full">
					<Unavailable message="No data available" />
				</div>
			)
	}

	return (
		<div className="border-t border-b border-gray-200 lg:border-0 py-0.5 xs:py-1 sm:py-3 sm:px-2 lg:py-0 lg:px-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0">
			<div className="flex flex-row justify-between space-x-1 items-center py-1 sm:pt-0.5">
				<Controls
					chartTime={chartTime}
					setChartTime={setChartTime}
					setInitialFetch={setInitialFetch}
				/>
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
				<ChartOrSpinner />
			</div>
		</div>
	)
}
