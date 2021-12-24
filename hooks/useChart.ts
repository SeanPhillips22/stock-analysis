import { getData } from 'functions/apis/API'
import { isTradingHoursOpen } from 'functions/datetime/isTradingHours'
import { useQuery } from 'react-query'
import { ChartDataPayload } from 'types/Charts'
import { Info } from 'types/Info'
// import { Quote } from 'types/Quote'
import { getChartUrl } from 'components/PriceChart/PriceChart.functions'

async function queryQuote({ queryKey }: { queryKey: string[] }) {
	let symbol = queryKey[1]
	let type = queryKey[2]
	let time = queryKey[3]

	if (typeof symbol === 'undefined') {
		return null
	}

	let url = getChartUrl(symbol, type, time)
	return await getData(url)
}

export function useChart(info: Info, chart: ChartDataPayload, time: string) {
	const tradingHours = isTradingHoursOpen()

	const { data } = useQuery(['c', info.symbol, info.type, time], queryQuote, {
		refetchInterval: tradingHours ? 60000 : false,
		refetchOnWindowFocus: tradingHours ? true : false,
		initialData: chart.data,
		initialDataUpdatedAt: chart.updated,
		staleTime: 60 * 1000,
		enabled: info.state !== 'upcomingipo' && !info.archived
	})

	return data
}
