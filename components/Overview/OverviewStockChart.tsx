/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import {
	createChart,
	PriceLineOptions,
	LineStyle,
	LineData,
	WhitespaceData
} from 'lightweight-charts'
import styles from './OverViewStockChart.module.css'
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
	const toolTip = useRef() as React.MutableRefObject<HTMLDivElement>
	const [tWidth, settWidth] = useState('300px')
	const [tHeight, settHeight] = useState('690px')
	const [showTooltip, setShowTooltip] = useState('none')
	const [price, setPrice] = useState('500')
	const [priceDate, setPriceDate] = useState('1999-20')
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]

	useEffect(() => {
		const chart = createChart(ref.current, {
			width: 650,
			height: 300,
			layout: {
				fontFamily:
					"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
				fontSize: 13
			},
			localization: {
				// timeFormatter controls the crosshair date format.
				timeFormatter: (t: any) => {
					const date = new Date(t * 1000)

					if (time == '1D' || time == '5D') {
						let hours = date.getUTCHours()
						let minutes: any = date.getUTCMinutes()
						let ampm = hours >= 12 ? 'pm' : 'am'
						hours = hours % 12 ? hours : 12
						minutes = minutes < 10 ? '0' + minutes : minutes
						return (
							monthNames[date.getUTCMonth()] +
							' ' +
							date.getUTCDate() +
							', ' +
							date.getUTCFullYear() +
							' ' +
							hours +
							':' +
							minutes +
							' ' +
							ampm
						)
					} else if (time == '1M' || time == 'YTD' || time == '1Y') {
						return (
							monthNames[date.getUTCMonth()] +
							' ' +
							date.getUTCDate() +
							', ' +
							date.getUTCFullYear()
						)
					} else {
						return (
							'Week Of ' +
							monthNames[date.getUTCMonth()] +
							' ' +
							date.getUTCDate() +
							', ' +
							date.getUTCFullYear()
						)
					}
				}
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
					tickMarkFormatter: (t: any, tickType: any) => {
						const date = new Date(t * 1000)

						if (time == '1D') {
							let hours = date.getUTCHours() //UTC must since date localizes the inputs based on your browser.
							let minutes: any = date.getUTCMinutes()
							let ampm = hours >= 12 ? 'pm' : 'am'
							hours = hours % 12 ? hours : 12
							minutes = minutes < 10 ? '0' + minutes : minutes
							return minutes != '00'
								? hours + ':' + minutes + ' ' + ampm
								: hours + ' ' + ampm
						} else if (time == '5D') {
							return (
								monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate()
							)
						} else {
							if (tickType == 2) {
								return (
									monthNames[date.getUTCMonth()] +
									' ' +
									date.getUTCDate()
								)
							}
							return monthNames[date.getUTCMonth()]
						}
					}
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
		let topColor = 'rgba(33, 150, 243, 0.56)'
		let bottomColor = 'rgba(33, 150, 243, 0.04)'
		let lineColor = 'rgba(33, 150, 243, 1)'
		if (change > 0) {
			topColor = 'rgba(4, 120, 87, 0.56)'
			bottomColor = 'rgba(4, 120, 87, 0.04)'
			lineColor = 'rgba(4, 120, 87, 1)'
		}
		if (change < 0) {
			topColor = 'rgba(220, 38, 38, 0.56)'
			bottomColor = 'rgba(220, 38, 38, 0.04)'
			lineColor = 'rgba(220, 38, 38, 1)'
		}

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
		//This object makes
		new ResizeObserver(entries => {
			if (entries.length === 0 || entries[0].target !== ref.current) {
				return
			}
			const newRect = entries[0].contentRect
			chart.applyOptions({ height: newRect.height, width: newRect.width })
		}).observe(ref.current)

		let toolTipWidth = 100
		let toolTipHeight = 80
		let toolTipMargin = 15
		const w = ref.current.clientWidth
		const h = ref.current.clientHeight
		console.log(ref)
		//Tooltips are handled here, based on crosshairMove
		chart.subscribeCrosshairMove((param: any) => {
			if (
				param.time == undefined ||
				param.point.x < 0 ||
				param.point.x > w ||
				param.point.y < 0 ||
				param.point.y > h
			) {
				setShowTooltip('none')
				return
			}

			const width = ref.current.offsetLeft
			const height = ref.current.offsetTop
			let y = param.point.y

			let left = width + param.point.x + toolTipMargin
			if (left > width + w - toolTipWidth) {
				left = width + param.point.x - toolTipMargin - toolTipWidth
			}

			let top = y + height + toolTipMargin
			if (top > h + height - toolTipHeight) {
				top = height + y - toolTipHeight - toolTipMargin
			}

			const date = new Date(param.time * 1000)

			settWidth(left + 'px')
			settHeight(top + 'px')
			setShowTooltip('block')

			setPrice(
				Number(param.seriesPrices.get(areaSeries)).toFixed(2).toString()
			)
			setPriceDate(
				date.getUTCDate() +
					' ' +
					monthNames[date.getUTCMonth()] +
					' ' +
					date.getUTCFullYear().toString()
			)
		})

		return () => {
			chart.remove()
		}
	}, [data, close])

	return (
		<>
			<div ref={ref}>
				{showTooltip && (
					<div
						ref={toolTip}
						style={{ top: tHeight, left: tWidth, display: showTooltip }}
						className={styles.tooltip}
					>
						<div className={styles.name}>Apple Inc.</div>
						<div className={styles.price}>{price}</div>
						<div>{priceDate}</div>
					</div>
				)}
			</div>
		</>
	)
}
