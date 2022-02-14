import { useState, useEffect, useMemo } from 'react'
import { Controls } from './PriceChartControls'
import { PriceChange } from './PriceChange'
import { Info } from 'types/Info'
import {
	getPriceChange,
	translateTime,
	UnavailableIpo
} from './PriceChart.functions'
import { Unavailable } from 'components/Unavailable'
import { useChart } from 'hooks/useChart'
import { useQuote } from 'hooks/useQuote'
import { LoadingLight } from 'components/Loading/LoadingLight'
import { InitialData } from 'types/Charts'
import { DisplayChart } from './DisplayChart'

type Props = {
	info: Info
	initial: InitialData
}

export function PriceChart({ info, initial }: Props) {
	const [chartTime, setChartTime] = useState('1D')
	const [message, setMessage] = useState('')
	const [initialFetch, setInitialFetch] = useState(true)
	const [spinner, setSpinner] = useState(false)

	const quote = useQuote(info)
	const { data, isFetching } = useChart(info, chartTime, initial)

	// Handle cases when the chart is unavailable
	// if 1D fails, try 1Y chart data instead
	// if fails completely, show unavailable message
	useEffect(() => {
		setMessage('')
		if (info.state === 'upcomingipo') return

		// If the 1D data fails on the first request, try the 1Y chart instead
		// also consider it a fail if there is only one data point
		if (!isFetching && initialFetch && (!data || !data.length)) {
			setChartTime('1Y')
			setInitialFetch(false)
		}

		// If it is not the initial 1D request but fails, show an error message
		if (!isFetching && !initialFetch && (!data || !data.length)) {
			setMessage(`No ${translateTime(chartTime)} chart data available`)
		}
	}, [data, chartTime, info.state, isFetching, initialFetch])

	// Decide whether to show spinner, chart or unavailable message
	// no spinner on first load if initialData was passed to the chart
	useEffect(() => {
		if (isFetching) {
			if (initialFetch && data && data.length) setSpinner(false)
			else setSpinner(true)
		} else if (data && data.length) {
			setSpinner(false)
		}
	}, [data, initialFetch, isFetching])

	const change = useMemo(() => {
		if (chartTime === '1D') return quote.cdr
		else return getPriceChange(data)
	}, [data, quote.cdr, chartTime])

	if (info.state === 'upcomingipo') {
		return <UnavailableIpo info={info} />
	}

	console.log(chartTime)

	return (
		<div className="mb-4 border-t border-b border-gray-200 py-0.5 xs:py-1 sm:py-3 sm:px-2 lg:mb-0 lg:border-0 lg:border-l lg:border-gray-300 lg:py-0 lg:px-0 lg:pl-3">
			<div className="flex flex-row items-center justify-between space-x-1 py-1 sm:pt-0.5">
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
						show={!spinner}
					/>
				)}
			</div>
			<div className="hide-scroll h-[240px] overflow-x-auto sm:h-[300px]">
				{message && (
					<div className="h-full pt-1.5">
						<Unavailable message={message} />
					</div>
				)}
				{spinner ? (
					<LoadingLight />
				) : data?.length ? (
					<DisplayChart
						data={data}
						time={chartTime}
						symbol={info.symbol}
						close={quote.cl}
						change={change}
					/>
				) : (
					<div className="h-full pt-1.5">
						<Unavailable message="No data available" />
					</div>
				)}
			</div>
		</div>
	)
}
