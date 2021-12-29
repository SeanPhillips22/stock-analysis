import { FilterId, SortObject } from '../screener.types'

type Single = {
	id: FilterId
	value: string
}

export type PresetFilter = {
	name: string
	filters: Single[]
	sort?: SortObject
}

export const PresetFiltersStocks: PresetFilter[] = [
	{
		name: 'Top Gainers (1Y)',
		filters: [
			{ id: 'm', value: 'over-100M' },
			{ id: 'p', value: 'over-1' },
			{ id: 'ch1y', value: 'over-0' }
		],
		sort: { id: 'ch1y', desc: false }
	},
	{
		name: 'Dividend Growth',
		filters: [
			{ id: 'm', value: 'over-1B' },
			{ id: 'dy', value: 'over-0.5' },
			{ id: 'dg', value: 'over-5' },
			{ id: 'pr', value: 'under-60' },
			{ id: 'revenueGrowth', value: 'over-3' }
		],
		sort: { id: 'm', desc: false }
	},
	{
		name: 'Monthly Dividends',
		filters: [
			{ id: 'payoutFrequency', value: 'Monthly' },
			{ id: 'dy', value: 'notzero' }
		],
		sort: { id: 'm', desc: false }
	},
	{
		name: 'Strong Cash Flow',
		filters: [
			{ id: 'm', value: 'over-300M' },
			{ id: 'ocf', value: 'over-100M' },
			{ id: 'fcf', value: 'over-50M' },
			{ id: 'fcfMargin', value: 'over-10' },
			{ id: 'fcfGrowth', value: 'over-10' }
		],
		sort: { id: 'm', desc: false }
	},
	{
		name: 'IPO This Year',
		filters: [
			{ id: 'ipoDate', value: 'this-year' },
			{ id: 'spac', value: 'No' }
		],
		sort: { id: 'm', desc: false }
	},
	{
		name: 'IPO Last Year',
		filters: [
			{ id: 'ipoDate', value: 'last-year' },
			{ id: 'spac', value: 'No' }
		],
		sort: { id: 'm', desc: false }
	}
]

export const PresetFiltersIpos: PresetFilter[] = [
	{
		name: 'Exclude SPACs',
		filters: [{ id: 'spac', value: 'No' }]
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
			{ id: 'dy', value: 'over-0.5' },
			{ id: 'dg', value: 'over-5' },
			{ id: 'pr', value: 'under-80' }
		],
		sort: { id: 'aum', desc: false }
	},
	{
		name: 'Monthly Dividends',
		filters: [
			{ id: 'payoutFrequency', value: 'Monthly' },
			{ id: 'dy', value: 'notzero' }
		],
		sort: { id: 'aum', desc: false }
	}
]
