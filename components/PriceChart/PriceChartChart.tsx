/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from 'react'
import { createChart, PriceLineOptions, LineStyle } from 'lightweight-charts'
import { ChartDataPoint } from 'types/Charts'
import { formatPriceChartTicks, formatPriceChartTime, setPriceChartColor } from './PriceChart.functions'

type Props = {
	data: ChartDataPoint[]
	time: string
	close: string
	change: number
}

export default function PriceChart({ data, time, close, change }: Props) {
	const ref = useRef() as React.MutableRefObject<HTMLDivElement>

	useEffect(() => {
		const handleResize = () => {
			let width = ref.current.clientWidth
			let height = ref.current.clientHeight
			chart.applyOptions({ width, height })
			chart.timeScale().fitContent()
		}

		const chart = createChart(ref.current, {
			layout: {
				fontFamily:
					"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
				fontSize: 13,
				textColor: '#323232'
			},
			localization: {
				// timeFormatter controls the crosshair date format.
				timeFormatter: (t: any) => formatPriceChartTime(t, time)
			},

			rightPriceScale: {
				borderColor: '#DEDEDE'
			},

			grid: {
				horzLines: {
					color: '#EEE'
				},
				vertLines: {
					visible: false
				}
			},

			// This object is for date formatting. Setting a month array is faster than having the Date object conjure it up.
			timeScale: {
				...(['1D', '5D', '1M', 'YTD'].includes(time) && {
					// Use TickType to determine whether its hour, day, month or year on the timescale itself
					tickMarkFormatter: (t: any, tickType: any) => formatPriceChartTicks(t, time, tickType)
				}),
				borderColor: '#DEDEDE',
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

		// Configure the main data series of the chart
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

		// Configure the "Previous Close" line and label
		const lastPrice = data[data.length - 1]?.c
		let showPriceLineTitle =
			lastPrice && close && (lastPrice > Number(close) * 1.002 || lastPrice < Number(close) * 0.998)

		//@ts-ignore
		const plOptions: PriceLineOptions = time === '1D' && {
			price: Number(close),
			axisLabelVisible: showPriceLineTitle,
			title: 'Prev. close',
			color: 'rgb(100, 100, 100)',
			lineStyle: LineStyle.SparseDotted
		}
		const pl = time === '1D' && areaSeries.createPriceLine(plOptions)

		// Hide the line that shows the current price
		areaSeries.applyOptions({
			priceLineVisible: false
		})

		// Set the data for the chart
		const format = data.map(item => ({
			time: Number(item.t),
			value: item.c
		}))
		//@ts-ignore
		areaSeries.setData(format)

		chart.timeScale().fitContent()

		// Change the chart size when the window is resized
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			chart.remove()
		}
	}, [data, close])

	return <div className="h-[250px] sm:h-[300px]" ref={ref} />
}
