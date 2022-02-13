import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { ChartDataPoint } from 'types/Charts'

type Props = {
	data: ChartDataPoint[]
	time: string
	symbol: string
	close: string
	change: number
}

export default function Chart({ data, time, symbol, close, change }: Props) {
	const ref = useRef() as React.MutableRefObject<HTMLDivElement>
	
	useEffect(() => {
		console.log(data)

		const chart = createChart(ref.current, { width: 650, height: 300 })
		const lineSeries = chart.addLineSeries()
		lineSeries.setData([
			{ time: '2019-04-11', value: 80.01 },
			{ time: '2019-04-12', value: 96.63 },
			{ time: '2019-04-13', value: 76.64 },
			{ time: '2019-04-14', value: 81.89 },
			{ time: '2019-04-15', value: 74.43 },
			{ time: '2019-04-16', value: 80.01 },
			{ time: '2019-04-17', value: 96.63 },
			{ time: '2019-04-18', value: 76.64 },
			{ time: '2019-04-19', value: 81.89 },
			{ time: '2019-04-20', value: 74.43 }
		])
		return () => {
			chart.remove()
		}
	}, [data])

	return (
		<>
			<div ref={ref} />
		</>
	)
}
