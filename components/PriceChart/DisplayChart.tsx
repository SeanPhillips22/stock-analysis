import { memo } from 'react'
import { Chart } from './PriceChartChart'

type Props = {
	data: any
	time: string
	symbol: string
	close: string
	change: number
}

// A memoized wrapper around the chart component
function DisplayChartComponent({ data, time, symbol, close, change }: Props) {
	return (
		<Chart
			key={symbol + '-' + time}
			data={data}
			time={time}
			symbol={symbol}
			close={close}
			change={change}
		/>
	)
}

export const DisplayChart = memo(DisplayChartComponent)
