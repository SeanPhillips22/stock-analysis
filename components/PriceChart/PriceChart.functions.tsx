import { ChartDataPoint } from 'types/Charts'
import { Info } from 'types/Info'

// Make API url
export function getChartUrl(symbol: string, type: string, time: string) {
	const params = `s=${symbol}&t=${type}&r=${time}&m=1`

	let apiurl
	if (time === '5Y' || time === 'MAX') {
		apiurl = `chart?${params}&p=w`
	} else {
		apiurl = `chart?${params}`
	}

	return apiurl
}

// Turn the 1D/5D into a human-friendly string
export function translateTime(time: string): string {
	switch (time) {
		case '1D':
			return '1-day'
		case '5D':
			return '5-day'
		case '1M':
			return '1-month'
		case 'YTD':
			return 'year-to-date'
		case '1Y':
			return '1-year'
		case '5Y':
			return '5-year'
		case 'MAX':
			return 'all-time'
	}
	return ''
}

export function UnavailableIpo({ info }: { info: Info }) {
	let chartMsg = 'Data will show when the stock starts trading.'
	const ipoDate = info?.ipoInfo?.ipoDate
	const ipoDateType = info?.ipoInfo?.ipoDateType
	if (ipoDate) {
		if (ipoDateType) chartMsg = 'Data will show when the stock starts trading.'
		else if (ipoDate === 'postponed' || ipoDate === 'withdrawn') chartMsg = ''
		else if (ipoDate !== 'unknown' && info?.ipoInfo?.ipoDateFormatted)
			chartMsg = `Data will show when the stock starts trading on ${info.ipoInfo.ipoDateFormatted}.`
	}

	return (
		<div className="mb-4 flex h-[180px] w-full items-center justify-center rounded-sm border border-gray-200 sm:h-[240px] lg:mb-0 lg:h-full lg:border-0 lg:border-l lg:border-gray-300 lg:pl-3">
			<div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 px-4 text-gray-800 xs:px-10">
				<div className="text-xl font-medium xs:text-2xl lg:text-3xl">Chart not available yet</div>
				{chartMsg && <div className="mt-4 text-center text-base leading-6 xs:text-lg xs:leading-7">{chartMsg}</div>}
			</div>
		</div>
	)
}

export function getPriceChange(data?: ChartDataPoint[]) {
	if (!data) return 0
	const first = data[0]?.c
	const last = data[data.length - 1]?.c
	if (last != undefined) {
		return first ? last / first - 1 : 0
	}
	return 0
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Format the date that shows in the crosshair when hovering over the chart
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
		return monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
	} else {
		return 'Week Of ' + monthNames[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear()
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
		return minutes != '00' ? hours + ':' + minutes + ' ' + ampm : hours + ' ' + ampm
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
 * Set the color of the chart line and area
 */
export function setPriceChartColor(change: number) {
	if (change > 0) return ['rgba(4, 120, 87, 0.56)', 'rgba(4, 120, 87, 0.04)', 'rgba(4, 120, 87, 1)']

	if (change < 0) return ['rgba(220, 38, 38, 0.56)', 'rgba(220, 38, 38, 0.04)', 'rgba(220, 38, 38, 1)']

	return ['rgba(33, 150, 243, 0.56)', 'rgba(33, 150, 243, 0.04)', 'rgba(33, 150, 243, 1)']
}
