import { timeParse } from 'd3-time-format'
import * as React from 'react'
import { IOHLCData } from './iOHLCData'
import { getChartData } from 'functions/apis/callBackEnd'

import { Unavailable } from 'components/Unavailable'

const parseDate = timeParse('%Y-%m-%d')
const parseDate1D5D = timeParse('%b %d, %Y %H:%M')

const errorHandling = (error: any, setLoading: any) => {
	console.error(
		'Error: There was an error loading the data for the chart |',
		error
	)
	setLoading(false)
}

const parseData = () => {
	return (d: any) => {
		const date = parseDate(d.date)
		if (date === null) {
			d.date = new Date(Number(d.date))
		} else {
			d.date = new Date(date)
		}

		for (const key in d) {
			if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
				d[key] = +d[key]
			}
		}

		return d as IOHLCData
	}
}
const parseData1D5D = () => {
	return (d: any) => {
		const date = parseDate1D5D(d.date)

		if (date === null) {
			d.date = new Date(Number(d.date))
		} else {
			d.date = new Date(date)
		}

		for (const key in d) {
			if (key !== 'date' && Object.prototype.hasOwnProperty.call(d, key)) {
				d[key] = +d[key]
			}
		}

		return d as IOHLCData
	}
}

function fixDataHeaders(obj: any) {
	const newObj = {
		open: obj.o,
		close: obj.c,
		high: obj.h,
		low: obj.l,
		volume: obj.v,
		date: obj.t,
		ma1: obj.ma1,
		ma2: obj.ma2
	}
	return newObj
}

function fixDataHeaders1D5D(obj: any) {
	return {
		date: obj.t,
		close: obj.c,
		high: obj.h,
		low: obj.l,
		open: obj.o,
		volume: obj.v
	}
}

interface WithOHLCDataProps {
	readonly data: IOHLCData[]
	readonly period: string | null
	readonly time: string | null
	readonly type: string | null
	readonly stockSymbol: string
	readonly stockType: string
	readonly loading: boolean
	readonly setLoading: (arg: boolean) => void
	readonly setData: (arg: IOHLCData[]) => void
}

interface WithOHLCState {
	data?: IOHLCData[]
	abort: AbortController | undefined
}

export function withOHLCData() {
	return <TProps extends WithOHLCDataProps>(
		OriginalComponent: React.ComponentClass<TProps>
	) => {
		return class WithOHLCData extends React.Component<
			Omit<TProps, 'data'>,
			WithOHLCState
		> {
			public constructor(props: Omit<TProps, 'data'>) {
				super(props)
				this.state = {
					data: undefined,
					abort: undefined
				}
			}
			public componentDidMount() {
				let { abort } = this.state
				abort = new AbortController()
				this.setState({ abort })
			}

			public componentDidUpdate(prevProps: any) {
				if (prevProps.loading != this.props.loading) {
					return
				}

				let { data, abort } = this.state
				let loading = this.props.setLoading

				const newProps: any = this.props

				// Case where data is undefined because a component is already loaded.

				// Case where user is switching from MAX to 1D/5D

				if (
					(prevProps.time == '1D' || prevProps.time == '5D') &&
					newProps.time != '1D' &&
					newProps.time != '5D'
				) {
					loading(true)
					getChartData(
						abort,
						newProps.stockSymbol,
						newProps.stockType,
						newProps.period,
						'MAX',
						undefined
					)
						.then(res => {
							const forDateParse = res.map(fixDataHeaders)
							data = forDateParse.map(parseData())

							this.setState({ data })
							setTimeout(function () {
								loading(false)
							}, 0)

							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch(error => {
							errorHandling(error, this.props.setLoading)
							if (typeof data != undefined) {
								data = undefined
								this.setState({ data })
							}
						})
					// Case where user is switching from 1D/5D to MAX
				} else if (
					prevProps.time != '1D' &&
					prevProps.time != '5D' &&
					(newProps.time == '1D' || newProps.time == '5D') &&
					data != undefined
				) {
					loading(true)

					getChartData(
						abort,
						newProps.stockSymbol,
						newProps.stockType,
						undefined,
						newProps.time,
						undefined
					)
						.then(res => {
							const forDateParse = res.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D())
							this.setState({ data })

							setTimeout(function () {
								loading(false)
							}, 0)
						})
						.catch(error => {
							errorHandling(error, this.props.setLoading)
							if (typeof data != undefined) {
								data = undefined
								this.setState({ data })
							}
						})
				}
				// Case where using is switching between 1D and 5D
				else if (
					(newProps.time == '1D' &&
						prevProps.time != '1D' &&
						data != undefined) ||
					(newProps.time == '5D' &&
						prevProps.time != '5D' &&
						data != undefined)
				) {
					loading(true)

					getChartData(
						abort,
						newProps.stockSymbol,
						newProps.stockType,
						undefined,
						newProps.time,
						'candles'
					)
						.then(res => {
							setTimeout(function () {
								loading(false)
							}, 0)
							const forDateParse = res.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D())
							this.setState({ data })
							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch(error => {
							errorHandling(error, this.props.setLoading)
							if (typeof data != undefined) {
								data = undefined
								this.setState({ data })
							}
						})
				}
				//Case where Symbol or period or type has changed.
				else if (
					prevProps.period != newProps.period ||
					prevProps.stockSymbol != newProps.stockSymbol ||
					prevProps.stockType != newProps.stockType
				) {
					if (newProps.time == '1D' || newProps.time == '5D') {
						loading(true)
						getChartData(
							abort,
							newProps.stockSymbol,
							newProps.stockType,
							undefined,
							newProps.time,
							undefined
						)
							.then(res => {
								const forDateParse = res.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
							})
							.catch(error => {
								errorHandling(error, this.props.setLoading)
								if (typeof data != undefined) {
									data = undefined
									this.setState({ data })
								}
							})
					} else {
						loading(true)
						getChartData(
							abort,
							newProps.stockSymbol,
							newProps.stockType,
							newProps.period,
							newProps.time,
							undefined
						)
							.then(res => {
								const forDateParse = res.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
								if (typeof data != 'undefined') {
									this.props.setData(data)
								}
							})
							.catch(error => {
								errorHandling(error, this.props.setLoading)
								if (typeof data != undefined) {
									data = undefined
									this.setState({ data })
								}
							})
					}
				} else if (data == undefined) {
					if (newProps.time == '1D' || newProps.time == '5D') {
						loading(true)
						getChartData(
							abort,
							newProps.stockSymbol,
							newProps.stockType,
							undefined,
							newProps.time,
							undefined
						)
							.then(res => {
								const forDateParse = res.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
							})
							.catch(error => {
								errorHandling(error, this.props.setLoading)
							})
					} else {
						loading(true)
						getChartData(
							abort,
							newProps.stockSymbol,
							newProps.stockType,
							newProps.period,
							'MAX',
							undefined
						)
							.then(res => {
								const forDateParse = res.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
								if (typeof data != 'undefined') {
									this.props.setData(data)
								}
							})
							.catch(error => {
								errorHandling(error, this.props.setLoading)
							})
					}
				}
			}
			public componentWillUnmount() {
				if (typeof this.state.abort != 'undefined') {
					this.state.abort.abort()
				}
			}

			public render() {
				const { data } = this.state

				if (typeof data == 'undefined') {
					return (
						<Unavailable message="Unable to load the data for this chart." />
					)
				}

				return (
					<OriginalComponent
						{...(this.props as TProps)}
						data={data}
						height={900}
					/>
				)
			}
		}
	}
}
