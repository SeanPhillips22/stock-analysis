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
					data: undefined,
				}
			}
			public componentDidCatch() {
				console.log('ERROR')
			}

			/* public componentDidMount() {
				if (this.props.time == '1D' || this.props.time == '5D') {
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${this.props.stockSymbol}&t=${this.props.stockType}&r=${this.props.time}`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							const data = forDateParse.map(
								parseData1D5D(this.props.time)
							)
							this.setState({ data })
							this.props.setLoading(false)
							this.props.setData(data)
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
				} else if (this != undefined) {
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${this.props.stockSymbol}&t=${this.props.stockType}&p=${this.props.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders)
							const data = forDateParse.map(parseData())
							this.setState({ data })
							this.props.setLoading(false)
							this.props.setData(data)
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
			*/

			public componentDidUpdate(prevProps: any, prevState: any) {
				let { data } = this.state
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
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&p=${newProps.period}&r=MAX`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders)
							data = forDateParse.map(parseData())

							this.setState({ data })
							setTimeout(function () {
								loading(false)
							}, 0)

							if (typeof data != 'undefined') {
								this.props.setData(data)
							}
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)
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
					loading(true)
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}`
					)
						.then((res) => {
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D(newProps.time))
							this.setState({ data })

							setTimeout(function () {
								loading(false)
							}, 0)
						})
						.catch((error) => {
							console.error(
								'Error: There was an error loading the data for the chart |',
								error
							)

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
					loading(true)
					Axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}&f=candles`
					)
						.then((res) => {
							setTimeout(function () {
								loading(false)
							}, 0)
							const forDateParse = res.data.map(fixDataHeaders1D5D)
							data = forDateParse.map(parseData1D5D(newProps.time))
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
				}
				//Case where Symbol or period or type has changed.
				else if (
					prevProps.period != newProps.period ||
					prevProps.stockSymbol != newProps.stockSymbol ||
					prevProps.stockType != newProps.stockType
				) {
					if (newProps.time == '1D' || newProps.time == '5D') {
						loading(true)
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D(newProps.time))
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
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
						loading(true)
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&p=${newProps.period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
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
				} else if (data == undefined) {
					if (newProps.time == '1D' || newProps.time == '5D') {
						loading(true)
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&r=${newProps.time}`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders1D5D)
								data = forDateParse.map(parseData1D5D(newProps.time))
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
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
						loading(true)
						Axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/chart?s=${newProps.stockSymbol}&t=${newProps.stockType}&p=${newProps.period}&r=MAX`
						)
							.then((res) => {
								const forDateParse = res.data.map(fixDataHeaders)
								data = forDateParse.map(parseData())
								this.setState({ data })

								setTimeout(function () {
									loading(false)
								}, 0)
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
