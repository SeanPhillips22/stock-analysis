import React, { useEffect, useRef } from 'react'
import {
	createChart,
	PriceLineOptions,
	LineStyle,
	LineData,
	WhitespaceData
} from 'lightweight-charts'
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
				timeVisible: true,
				fixLeftEdge: true,
				fixRightEdge: true
			},
			handleScroll: false,
			handleScale: false
		})

		const areaSeries = chart.addAreaSeries({
			autoscaleInfoProvider: () => ({
				priceRange: {
					minValue: 170,
					maxValue: 176
				}
			}),
			topColor: 'rgba(33, 150, 243, 0.56)',
			bottomColor: 'rgba(33, 150, 243, 0.04)',
			lineColor: 'rgba(33, 150, 243, 1)',
			lineWidth: 2
		})
		console.log(close)
		//@ts-ignore
		const plOptions: PriceLineOptions = {
			price: 176,
			axisLabelVisible: false,
			title: 'Previous Close',
			color: 'rgb(100, 100, 100)',
			lineStyle: LineStyle.SparseDotted
		}

		const pl = areaSeries.createPriceLine(plOptions)

		/* pl.applyOptions({
			price: Number(close),
			axisLabelVisible: false
		})*/

		areaSeries.applyOptions({
			priceLineVisible: false,
			crosshairMarkerVisible: false
		})

		const format = data.map(item => {
			// Calculate offset to convert from UTC to Eastern Time
			// 5 hours (18000s) for EST, 4 hours (14400s) for EDT
			// https://en.wikipedia.org/wiki/Daylight_saving_time_in_the_United_States
			// 2022: March 13-November 6 should be 14400
			let offset = 18000

			return {
				time: Number(item.t) - offset,
				value: item.c
			}
		})
		console.log(format)
		//@ts-ignore
		areaSeries.setData(format)
		chart.timeScale().fitContent()

		return () => {
			chart.remove()
		}
	}, [data, close])

	return (
		<>
			<div ref={ref} />
		</>
	)
}
