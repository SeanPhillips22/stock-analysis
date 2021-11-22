import { getData } from 'functions/API'
import { isTradingHours } from 'functions/datetime/isTradingHours'
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
	const tradingHours = isTradingHours()

	const { data } = useQuery(['q', info.symbol, info.type], queryQuote, {
		refetchInterval: tradingHours ? 5000 : false,
		refetchOnWindowFocus: tradingHours ? true : false,
		initialData: info.quote,
		initialDataUpdatedAt: Date.now() - 60000,
		enabled: info.state !== 'upcomingipo' && !info.archived,
	})

	return data as Quote
}
