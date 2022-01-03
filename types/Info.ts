import { Quote } from 'types/Quote'

export interface Info {
	id: number
	symbol: string
	ticker: string
	name: string
	type: string
	nameFull: string
	exchange: string
	isOTC: boolean // Is it an over the counter stock (short for exchange === 'OTCMKTS')
	quote: Quote
	fiscalYear: string
	currency: string
	state: string
	daysSince?: number
	archived: boolean
	ipoInfo?: IpoInfo | null
	ipoDate: string | null
	notice?: string
	cik?: string
	exceptions: {
		hideTTM: boolean
		hideRatios: boolean
		hideChart: boolean
		overrideChart: boolean
	}
}

export interface IpoInfo {
	ipoDate: string
	ipoDateType: boolean | null
	ipoDateFormatted: string
	ipoPrice: string
	ipoPriceLow: string
	ipoPriceHigh: string
	ipoPriceNotice: string
	notice: string
	ipoExchange: string
}
