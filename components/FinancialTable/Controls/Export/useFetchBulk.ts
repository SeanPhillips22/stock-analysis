import { getData } from 'functions/apis/API'
import { useAuth } from 'hooks/useAuth'
const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null

/**
 * This hook returns a function that fetches all the financials for the stock
 * so that they can be exported into a single file
 */
export function useFetchBulk() {
	const { checked, isPro } = useAuth()

	async function fetchBulkFinancials(symbol: string | null) {
		if (!symbol) return null

		if (checked && isPro) {
			let url = `financials?s=${symbol}&f=${PRO_KEY}&bulk=1&type=income-statement&range=annual`
			let data = await getData(url)
			return data
		}
		return null
	}

	return fetchBulkFinancials
}
