import { memo } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('components/PriceChart/PriceChartChart'), {
	ssr: false
})

type Props = {
	data: any
	time: string
	symbol: string
	close: string
	change: number
}

// A memoized wrapper around the chart cnomponent
function DisplayChartComponent({ data, time, symbol, close, change }: Props) {
	return (
		<Chart
			key={symbol + '-' + time}
			data={data}
			time={time}
			close={close}
			change={change}
		/>
	)
}

export const DisplayChart = memo(DisplayChartComponent)
