import { getData } from 'functions/apis/API'
import {
	isTradingHours,
	isTradingHoursOpen
} from 'functions/datetime/isTradingHours'
import { useQuery } from 'react-query'
import { Info } from 'types/Info'
import { Quote } from 'types/Quote'

async function queryQuote({ queryKey }: { queryKey: (string | number)[] }) {
	const symbol = queryKey[1]
	const type = queryKey[2]
	if (typeof symbol === 'undefined') {
		return null
	}

	return await getData(`p?s=${symbol}&t=${type}`)
}

export function useQuote(info: Info) {
	const tradingHours = info.isOTC ? isTradingHoursOpen() : isTradingHours()

	const { data } = useQuery(['q', info.symbol, info.type], queryQuote, {
		refetchInterval: tradingHours ? 5000 : false,
		refetchOnWindowFocus: tradingHours ? true : false,
		initialData: info.quote,
		initialDataUpdatedAt: info.quote.lf
			? info.quote.lf + 5000
			: Date.now() - 60000,
		enabled: info.state !== 'upcomingipo' && !info.archived,
		notifyOnChangeProps: 'tracked',
		retry: false
	})

	return data as Quote
}
