import { DataId } from 'types/DataId'
import { SortObject } from '../screener.types'

export type PresetFilter = {
	name: string
	filters: {
		id: DataId
		value: string
	}[]
	sort?: SortObject
}

export const PresetFiltersStocks: PresetFilter[] = [
	{
		name: 'Top Gainers (1D)',
		filters: [
			{ id: 'marketCap', value: 'over-10M' },
			{ id: 'price', value: 'over-1' },
			{ id: 'volume', value: 'over-10K' },
			{ id: 'change', value: 'over-0' }
		],
		sort: { id: 'change', desc: false }
	},
	{
		name: 'Top Gainers (1Y)',
		filters: [
			{ id: 'marketCap', value: 'over-100M' },
			{ id: 'price', value: 'over-1' },
			{ id: 'ch1y', value: 'over-0' }
		],
		sort: { id: 'ch1y', desc: false }
	},
	{
		name: 'Dividend Growth',
		filters: [
			{ id: 'marketCap', value: 'over-1B' },
			{ id: 'dividendYield', value: 'over-0.5' },
			{ id: 'dividendGrowth', value: 'over-5' },
			{ id: 'payoutRatio', value: 'under-60' },
			{ id: 'revenueGrowth', value: 'over-3' }
		],
		sort: { id: 'marketCap', desc: false }
	},
	{
		name: 'Monthly Dividends',
		filters: [
			{ id: 'payoutFrequency', value: 'Monthly' },
			{ id: 'dividendYield', value: 'notzero' }
		],
		sort: { id: 'marketCap', desc: false }
	},
	{
		name: 'Strong Cash Flow',
		filters: [
			{ id: 'marketCap', value: 'over-300M' },
			{ id: 'operatingCF', value: 'over-100M' },
			{ id: 'fcf', value: 'over-50M' },
			{ id: 'fcfMargin', value: 'over-10' },
			{ id: 'fcfGrowth', value: 'over-10' }
		],
		sort: { id: 'marketCap', desc: false }
	},
	{
		name: 'IPO This Year',
		filters: [
			{ id: 'ipoDate', value: 'this-year' },
			{ id: 'isSpac', value: 'No' }
		],
		sort: { id: 'marketCap', desc: false }
	},
	{
		name: 'IPO Last Year',
		filters: [
			{ id: 'ipoDate', value: 'last-year' },
			{ id: 'isSpac', value: 'No' }
		],
		sort: { id: 'marketCap', desc: false }
	}
]

export const PresetFiltersIpos: PresetFilter[] = [
	{
		name: 'Exclude SPACs',
		filters: [{ id: 'isSpac', value: 'No' }]
	},
	{
		name: 'Has Revenue',
		filters: [{ id: 'revenue', value: 'over-0' }],
		sort: { id: 'revenue', desc: false }
	},
	{
		name: 'Profitable',
		filters: [
			{ id: 'revenue', value: 'over-0' },
			{ id: 'netIncome', value: 'over-0' }
		],
		sort: { id: 'netIncome', desc: false }
	},
	{
		name: 'FCF Positive',
		filters: [
			{ id: 'revenue', value: 'over-0' },
			{ id: 'fcf', value: 'over-0' }
		],
		sort: { id: 'fcf', desc: false }
	}
]

export const PresetFiltersETFs: PresetFilter[] = [
	{
		name: 'Dividend Growth',
		filters: [
			{ id: 'dividendYield', value: 'over-0.5' },
			{ id: 'dividendGrowth', value: 'over-5' },
			{ id: 'payoutRatio', value: 'under-80' }
		],
		sort: { id: 'aum', desc: false }
	},
	{
		name: 'Monthly Dividends',
		filters: [
			{ id: 'payoutFrequency', value: 'Monthly' },
			{ id: 'dividendYield', value: 'notzero' }
		],
		sort: { id: 'aum', desc: false }
	}
]
