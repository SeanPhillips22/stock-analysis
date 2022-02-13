import { memo } from 'react'
import dynamic from 'next/dynamic'

type Props = {
	data: any
	time: string
	symbol: string
	close: string
	change: number
}

// A memoized wrapper around the chart cnomponent
function DisplayChartComponent({ data, time, symbol, close, change }: Props) {
	const Chart = dynamic(
		() => import('components/Overview/OverviewStockChart'),
		{
			loading: () => <p>Loading ...</p>,
			ssr: false
		}
	)

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
