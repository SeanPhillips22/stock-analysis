import { timeParse } from 'd3-time-format'
import * as React from 'react'
import { IOHLCData } from './iOHLCData'
import Axios from 'axios'
import { Unavailable } from 'components/Unavailable'

const parseDate = timeParse('%Y-%m-%d')
const parseDate1D5D = timeParse('%b %d, %Y %H:%M')

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

const parseData1D5D = (time: string | null) => {
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
		ma2: obj.ma2,
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
		volume: obj.v,
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
	period: string | null
	time: string | null
	type: string | null
	stockSymbol: string
	stockType: string
	saveData?: IOHLCData[]
}

export function withOHLCData(dataSet = 'DAILY') {
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
					period: props.period,
					time: props.time,
					stockSymbol: props.stockSymbol,
					stockType: props.stockType,
					type: props.type,
					data: undefined,
				}
				if (props.time == '1D' || props.time == '5D') {
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${props.stockSymbol}&t=${props.stockType}&r=${props.time}`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							const data = forDateParse.map(parseData1D5D(props.time))
							this.setState({ data })
							props.setLoading(false)
							props.setData(data)
							// props.setData(data)
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							this.props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
						})
				} else {
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${props.stockSymbol}&t=${props.stockType}&p=${props.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders)
							const data = forDateParse.map(parseData())
							this.setState({ data })
							props.setLoading(false)
							props.setData(data)
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
						})
				}
			}

			public componentDidUpdate(prevProps: any, prevState: any) {
				let { data } = this.state

				const newProps: WithOHLCState = this.props

				// Case where data is undefined because a component is already loaded.

				// Case where user is switching from MAX to 1D/5D
				if (
					(prevProps.time == '1D' || prevProps.time == '5D') &&
					newProps.time != '1D' &&
					newProps.time != '5D'
				) {
					this.props.setLoading(true)
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&p=${newProps.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders)
							data = forDateParse.map(parseData())
							this.props.setLoading(false)
							this.setState({ data })
							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							this.props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
						})
					// Case where user is switching from 1D/5D to MAX
				} else if (
					prevProps.time != '1D' &&
					prevProps.time != '5D' &&
					(newProps.time == '1D' || newProps.time == '5D') &&
					data != undefined
				) {
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D(newProps.time))
							this.setState({ data })
							this.props.setLoading(false)
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							this.props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
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
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}&f=candles`
					)
						.then((res) => {
							this.props.setLoading(true)
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D(newProps.time))
							this.setState({ data })
							this.props.setLoading(false)
							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							this.props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
						})
				}
				//Case where Symbol or period or type has changed.
				else if (
					prevProps.period != newProps.period ||
					prevProps.stockSymbol != newProps.stockSymbol ||
					prevProps.stockType != newProps.stockType
				) {
					this.props.setLoading(true)

					if (newProps.time == '1D' || newProps.time == '5D') {
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D(newProps.time))
								this.setState({ data })
								this.props.setLoading(false)
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								)
								this.props.setLoading(false)
								return (
									<Unavailable message="Unable to load the data for this chart." />
								)
							})
					} else {
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&p=${newProps.period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.setState({ data })
								this.props.setLoading(false)
								if (typeof data != 'undefined') {
									this.props.setData(data)
								}
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								)
								this.props.setLoading(false)
								return (
									<Unavailable message="Unable to load the data for this chart." />
								)
							})
					}
				}
				/*
				console.log(prevState)
				if (time == null && period == null) {
					console.log('yes')
				}

				if (
					period != newState.period ||
					stockSymbol != newState.stockSymbol
				) {
					this.props.setLoading(true)

					if (newState.time == '1D' || newState.time == '5D') {
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newState.stockSymbol}&t=${newState.stockType}&r=${newState.time}`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D(newState.time))

								if (period != newState.period) {
									period = newState.period
									this.setState({ period })
									this.setState({ data })
									saveData = []
									this.setState({ saveData })
								} else {
									stockSymbol = newState.stockSymbol
									this.setState({ stockSymbol })
									this.setState({ data })
									saveData = []
									this.setState({ saveData })
								}
								this.props.setLoading(false)
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								)
								this.props.setLoading(false)
								return (
									<Unavailable message="Unable to load the data for this chart." />
								)
							})
					} else {
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newState.stockSymbol}&t=${newState.stockType}&p=${newState.period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders)
								data = forDateParse.map(parseData())

								if (period != newState.period) {
									period = newState.period
									this.setState({ period })
									this.setState({ data })
								} else {
									stockSymbol = newState.stockSymbol
									this.setState({ stockSymbol })
									this.setState({ data })
								}
								this.props.setLoading(false)
								if (typeof data != 'undefined') {
									this.props.setData(data)
								}
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								)
								this.props.setLoading(false)
								return (
									<Unavailable message="Unable to load the data for this chart." />
								)
							})
					}
					// Case where someone is clicking '1D' or '5D'
				} else if (
					(newState.time == '1D' && time != '1D') ||
					(newState.time == '5D' && time != '5D')
				) {
					const time = newState.time
					this.setState({ time })
					this.props.setLoading(true)
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${this.props.stockSymbol}&t=${this.props.stockType}&r=${newState.time}&f=candles`
					)
						.then((res) => {
							this.props.setLoading(true)
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							if (!saveData) {
								saveData = data
								this.setState({ saveData })
							}
							data = forDateParse.map(parseData1D5D(newState.time))
							this.setState({ data })
							this.props.setLoading(false)
							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
							this.props.setLoading(false)
							return (
								<Unavailable message="Unable to load the data for this chart." />
							)
						})
					// Case where someone is already at '1D' or '5D' and is now clicking the other values.
				} else if (
					(time == '5D' || time == '1D') &&
					newState.time != '1D' &&
					newState.time != '5D'
				) {
					if (typeof saveData != 'undefined' && saveData.length > 0) {
						data = saveData
						time = newState.time
						this.setState({ time })
						this.setState({ data })
						if (typeof data != 'undefined') {
							this.props.setData(data)
						}
					} else {
						this.props.setLoading(true)
						time = newState.time
						this.setState({ time })
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${stockSymbol}&t=${stockType}&p=${period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.props.setLoading(false)
								this.setState({ data })
								if (typeof data != 'undefined') {
									this.props.setData(data)
								}
								saveData = data
								this.setState({ saveData })
							})
							.catch((error) => {
								console.error(
									'Error: There was an error loading the data for the chart |',
									error
								)
								this.props.setLoading(false)
								return (
									<Unavailable message="Unable to load the data for this chart." />
								)
							})
					}
				} */
			}

			public render() {
				const { data } = this.state

				if (data === undefined) {
					return <div></div>
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
