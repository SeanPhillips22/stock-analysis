/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { createChart, PriceLineOptions, LineStyle } from 'lightweight-charts'
import { ChartDataPoint } from 'types/Charts'
import {
	formatPriceChartTicks,
	formatPriceChartTime,
	setPriceChartColor
} from './PriceChartNew.functions'

type Props = {
	data: ChartDataPoint[]
	time: string
	symbol: string
	close: string
	change: number
}

export default function OverviewStockChart({
	data,
	time,
	symbol,
	close,
	change
}: Props) {
	const ref = useRef() as React.MutableRefObject<HTMLDivElement>

	useEffect(() => {
		let height = window?.innerWidth < 600 ? 240 : 300

		const chart = createChart(ref.current, {
			width: 650,
			height: height,
			layout: {
				fontFamily:
					"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
				fontSize: 13
			},
			localization: {
				// timeFormatter controls the crosshair date format.
				timeFormatter: (t: any) => formatPriceChartTime(t, time)
			},

			rightPriceScale: {
				borderColor: 'rgba(197, 203, 206, 1)'
			},

			grid: {
				horzLines: {
					color: '#EBECF0'
				},
				vertLines: {
					visible: false
				}
			},
			//This object is for date formatting. Setting a month array is faster than having the Date object conjure it up.
			timeScale: {
				...((time == '1D' ||
					time == '5D' ||
					time == '1M' ||
					time == 'YTD') && {
					// Use TickType to determine whether its hour, day, month or year on the timescale itself
					tickMarkFormatter: (t: any, tickType: any) =>
						formatPriceChartTicks(t, time, tickType)
				}),
				borderColor: 'rgba(197, 203, 206, 1)',
				timeVisible: true,
				fixLeftEdge: true,
				fixRightEdge: true
			},
			handleScroll: false,
			handleScale: false
		})

		// Set the color based on the price change
		// Positive is green, negative is red, zero is blue
		let [topColor, bottomColor, lineColor] = setPriceChartColor(change)

		const max = Math.max(
			...data.map(d => {
				return d.c
			})
		)

		const min = Math.min(
			...data.map(d => {
				return d.c
			})
		)
		const areaSeries = chart.addAreaSeries({
			// Remove this section if you don't want the price line to appear,
			autoscaleInfoProvider: () => ({
				priceRange: {
					minValue: Number(close) < min ? Number(close) : min,
					maxValue: Number(close) > max ? Number(close) : max
				}
			}),
			topColor,
			bottomColor,
			lineColor,
			lineWidth: 2
		})

		//@ts-ignore Remove plOptions and pl if not planning have previous Close
		const plOptions: PriceLineOptions = time === '1D' && {
			price: Number(close),
			axisLabelVisible: true,
			title: 'Previous close',
			color: 'rgb(100, 100, 100)',
			lineStyle: LineStyle.SparseDotted
		}
		const pl = areaSeries.createPriceLine(plOptions)

		areaSeries.applyOptions({
			priceLineVisible: false
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

		//@ts-ignore
		areaSeries.setData(format)

		chart.timeScale().fitContent()
		// This object makes the chart responsive
		if (typeof window?.ResizeObserver !== undefined) {
			new ResizeObserver(entries => {
				if (entries.length === 0 || entries[0].target !== ref.current) {
					return
				}
				const newRect = entries[0].contentRect
				let newHeight = window?.innerWidth < 600 ? 240 : 300
				chart.applyOptions({ height: newHeight, width: newRect.width })
				chart.timeScale().fitContent()
			}).observe(ref.current)
		}

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
