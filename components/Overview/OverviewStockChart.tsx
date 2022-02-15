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

		const chart = createChart(ref.current, {
			width: 650,
			height: 300,
			layout: {
				fontFamily:
					"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
				fontSize: 13
			},
			rightPriceScale: {
				borderColor: 'rgba(197, 203, 206, 1)'
			},
			crosshair: {
				mode: 0
			},
			grid: {
				horzLines: {
					color: '#EBECF0'
				},
				vertLines: {
					visible: false
				}
			},
			timeScale: {
				borderColor: 'rgba(197, 203, 206, 1)',
				timeVisible: true
			},
			handleScroll: false,
			handleScale: false
		})

		const areaSeries = chart.addAreaSeries({
			topColor: 'rgba(33, 150, 243, 0.56)',
			bottomColor: 'rgba(33, 150, 243, 0.04)',
			lineColor: 'rgba(33, 150, 243, 1)',
			lineWidth: 2
		})

		const format = data.map(item => {
			return {
				time: Math.round(new Date(item.t).getTime() / 1000),
				value: item.c
			}
		})

		areaSeries.setData(format)
		chart.timeScale().fitContent()
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
