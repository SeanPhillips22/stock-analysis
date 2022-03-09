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

/**
 * Format the date that shows in the crosshair when hovering over the chart
 * @param t
 * @param time
 * @returns
 */
export function formatPriceChartTime(t: number, time: string) {
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

/**
 * Format the date to be displayed in the ticks of the x-axis of the chart
 * @param t timestamp in seconds, needs to be multiplied by 1000
 * @param time the time range selected (1D, 1M, etc)
 * @param tickType
 * @returns
 */
export function formatPriceChartTicks(t: number, time: string, tickType: any) {
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
		return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate()
	} else {
		if (tickType == 2) {
			return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate()
		}
		return monthNames[date.getUTCMonth()]
	}
}

/**
 * Set the color
 */
export function setPriceChartColor(change: number) {
	if (change > 0)
		return [
			'rgba(4, 120, 87, 0.56)',
			'rgba(4, 120, 87, 0.04)',
			'rgba(4, 120, 87, 1)'
		]

	if (change < 0)
		return [
			'rgba(220, 38, 38, 0.56)',
			'rgba(220, 38, 38, 0.04)',
			'rgba(220, 38, 38, 1)'
		]

	return [
		'rgba(33, 150, 243, 0.56)',
		'rgba(33, 150, 243, 0.04)',
		'rgba(33, 150, 243, 1)'
	]
}
