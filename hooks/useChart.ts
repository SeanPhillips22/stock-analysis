import { getData } from 'functions/apis/API'
import { isTradingHoursOpen } from 'functions/datetime/isTradingHours'
import { useQuery } from 'react-query'
import { Info } from 'types/Info'
import { getChartUrl } from 'components/PriceChart/PriceChart.functions'

async function queryChart(symbol: string, type: string, time: string) {
	if (!time) return
	if (typeof symbol === 'undefined') return

	let url = getChartUrl(symbol, type, time)
	return await getData(url)
}

export function useChart(info: Info, time: string) {
	const tradingHours = isTradingHoursOpen()

	const { data, isLoading } = useQuery(
		['c', info.symbol, info.type, time],
		() => queryChart(info.symbol, info.type, time),
		{
			refetchInterval: tradingHours ? 60000 : false,
			refetchOnWindowFocus: tradingHours ? true : false,
			enabled: info.state !== 'upcomingipo' && !info.archived,
			notifyOnChangeProps: 'tracked'
		}
	)

	return { data, isLoading }
}

// function that returns the number of seconds until the next minute starts
export function getSecondsUntilNextMinute() {
	const now = new Date()
	const seconds = now.getSeconds()
	const nextMinute = 60 - seconds
	return nextMinute * 1000
}
