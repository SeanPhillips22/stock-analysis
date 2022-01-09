import { FilterProps } from 'components/StockScreener/screener.types'

export const FiltersMap: FilterProps[] = [
	{
		name: 'Market Cap',
		id: 'm',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 300M', value: 'over-300M' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Mega-Cap: 200B+', value: 'over-200B' },
			{ name: 'Large-Cap: 10-200B', value: 'between-10B-200B' },
			{ name: 'Mid-Cap: 10-20B', value: 'between-2B-10B' },
			{ name: 'Small-Cap: 300M-20B', value: 'between-300M-2B' },
			{ name: 'Micro-Cap: Under 300M', value: 'under-300M' }
		]
	},
	{
		name: 'Enterprise Value',
		id: 'ev',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1T', value: 'over-1T' },
			{ name: 'Over 500B', value: 'over-500B' },
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Stock Price',
		id: 'p',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1000', value: 'over-1000' },
			{ name: 'Over 500', value: 'over-500' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'From 500-1000', value: 'between-500-1000' },
			{ name: 'From 100-500', value: 'between-100-500' },
			{ name: 'From 50-100', value: 'between-50-100' },
			{ name: 'From 20-50', value: 'between-20-50' },
			{ name: 'From 10-20', value: 'between-10-20' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' }
		]
	},
	{
		name: 'PE Ratio',
		id: 'pe',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'From 30-50', value: 'between-30-50' },
			{ name: 'From 20-30', value: 'between-20-30' },
			{ name: 'From 15-20', value: 'between-15-20' },
			{ name: 'From 10-15', value: 'between-10-15' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' }
		]
	},
	{
		name: 'Forward PE',
		id: 'fpe',
		category: ['Popular', 'Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'From 30-50', value: 'between-30-50' },
			{ name: 'From 20-30', value: 'between-20-30' },
			{ name: 'From 15-20', value: 'between-15-20' },
			{ name: 'From 10-15', value: 'between-10-15' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' }
		]
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['Company'],
		filterType: 'stringmatch',
		options: [
			{ name: 'NASDAQ', value: 'NASDAQ' },
			{ name: 'NYSE', value: 'NYSE' },
			{ name: 'NYSE AMERICAN', value: 'NYSEAMERICAN' }
		]
	},
	{
		name: 'Dividend Yield',
		id: 'dy',
		category: ['Popular', 'Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: '3-5%', value: 'between-3-5' },
			{ name: '1-3%', value: 'between-1-3' },
			{ name: '0-1%', value: 'between-0-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Sector',
		id: 'se',
		category: ['Popular', 'Company'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Industry',
		id: 'i',
		category: ['Popular', 'Company'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Price Change 1D',
		id: 'c',
		category: ['Popular', 'Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 1M',
		id: 'ch1m',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 6M',
		id: 'ch6m',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change YTD',
		id: 'chYTD',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 1000%', value: 'over-1000' },
			{ name: 'Over 500%', value: 'over-500' },
			{ name: 'Over 300%', value: 'over-300' },
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 1Y',
		id: 'ch1y',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 1000%', value: 'over-1000' },
			{ name: 'Over 500%', value: 'over-500' },
			{ name: 'Over 300%', value: 'over-300' },
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 3Y',
		id: 'ch3y',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 1000%', value: 'over-1000' },
			{ name: 'Over 500%', value: 'over-500' },
			{ name: 'Over 300%', value: 'over-300' },
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' },
			{ name: 'Under -90%', value: 'under-X90' }
		]
	},
	{
		name: 'Price Change 5Y',
		id: 'ch5y',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 2000%', value: 'over-2000' },
			{ name: 'Over 1000%', value: 'over-1000' },
			{ name: 'Over 500%', value: 'over-500' },
			{ name: 'Over 300%', value: 'over-300' },
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' },
			{ name: 'Under -90%', value: 'under-X90' }
		]
	},
	{
		name: 'Volume',
		id: 'v',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over 10K', value: 'over-10K' },
			{ name: 'Over 1K', value: 'over-1K' },
			{ name: 'Over 0', value: 'over-0' },
			{ name: 'Under 1K', value: 'under-1K' },
			{ name: 'Under 10K', value: 'under-10K' },
			{ name: 'Under 100K', value: 'under-100K' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 100M', value: 'under-100M' }
		]
	},
	{
		name: 'Analyst Rating',
		id: 'ar',
		category: ['Popular'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Strong Buy', value: 'Strong Buy' },
			{ name: 'Buy', value: 'Buy' },
			{ name: 'Hold', value: 'Hold' },
			{ name: 'Sell', value: 'Sell' },
			{ name: 'Strong Sell', value: 'Strong Sell' }
		]
	},
	{
		name: 'Analyst Count',
		id: 'ac',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 40', value: 'over-40' },
			{ name: 'Over 30', value: 'over-30' },
			{ name: 'Over 20', value: 'over-20' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'From 1-5', value: 'between-1-5' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Price Target',
		id: 'pt',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1000', value: 'over-1000' },
			{ name: 'Over 500', value: 'over-500' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'From 500-1000', value: 'between-500-1000' },
			{ name: 'From 100-500', value: 'between-100-500' },
			{ name: 'From 50-100', value: 'between-50-100' },
			{ name: 'From 20-50', value: 'between-20-50' },
			{ name: 'From 10-20', value: 'between-10-20' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' }
		]
	},
	{
		name: 'Price Target (%)',
		id: 'ptc',
		category: ['Popular'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: '100%+ Above', value: 'over-100' },
			{ name: '50%+ Above', value: 'over-50' },
			{ name: '20%+ Above', value: 'over-20' },
			{ name: '10%+ Above', value: 'over-10' },
			{ name: '5%+ Above', value: 'over-5' },
			{ name: 'Above', value: 'over-0' },
			{ name: 'Below', value: 'under-0' },
			{ name: '-5%+ Below', value: 'under-X5' },
			{ name: '-10%+ Below', value: 'under-X10' },
			{ name: '-20%+ Below', value: 'under-X20' },
			{ name: '-50%+ Below', value: 'under-X50' },
			{ name: '-100%+ Below', value: 'under-X100' }
		]
	},
	{
		name: 'Country',
		id: 'country',
		category: ['Company'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Employees',
		id: 'employees',
		category: ['Company'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 500K', value: 'over-500K' },
			{ name: 'Over 300K', value: 'over-300K' },
			{ name: 'Over 200K', value: 'over-200K' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over 10K', value: 'over-10K' },
			{ name: 'Over 1K', value: 'over-1K' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 0', value: 'over-0' },
			{ name: 'Under 1K', value: 'under-1K' },
			{ name: 'Under 10K', value: 'under-10K' },
			{ name: 'Under 100K', value: 'under-100K' }
		]
	},
	{
		name: 'Founded',
		id: 'founded',
		category: ['Company'],
		filterType: 'date',
		options: [
			{ name: 'Over 100 Years Ago', value: 'over-100Y' },
			{ name: 'Over 50 Years Ago', value: 'over-50Y' },
			{ name: 'Over 20 Years Ago', value: 'over-20Y' },
			{ name: 'Over 10 Years Ago', value: 'over-10Y' },
			{ name: 'Over 5 Years Ago', value: 'over-5Y' },
			{ name: 'Over 3 Years Ago', value: 'over-3Y', div: true },
			{ name: 'Last Year', value: 'last-year' },
			{ name: 'This Year', value: 'this-year', div: true },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' },
			{ name: 'Within 20 Years', value: 'under-20Y' },
			{ name: 'Within 50 Years', value: 'under-50Y' },
			{ name: 'Within 100 Years', value: 'under-100Y' }
		]
	},
	{
		name: 'IPO Date',
		id: 'ipoDate',
		category: ['Company'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Yesterday', value: 'yesterday' },
			{ name: 'Past Week', value: 'under-7D' },
			{ name: 'Past Month', value: 'under-1M' },
			{ name: 'Past 3 Months', value: 'under-3M' },
			{ name: 'Past 6 Months', value: 'under-6M' },
			{ name: 'Past 12 Months', value: 'under-12M', div: true },
			{ name: 'This Year', value: 'this-year' },
			{ name: 'Last Year', value: 'last-year', div: true },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' },
			{ name: 'Within 20 Years', value: 'under-20Y', div: true },
			{ name: 'Over 1 Years Ago', value: 'over-1Y' },
			{ name: 'Over 3 Years Ago', value: 'over-3Y' },
			{ name: 'Over 5 Years Ago', value: 'over-5Y' },
			{ name: 'Over 10 Years Ago', value: 'over-10Y' },
			{ name: 'Over 20 Years Ago', value: 'over-20Y' }
		]
	},
	{
		name: 'Revenue',
		id: 'revenue',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Exactly Zero', value: 'exactly-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Revenue Growth',
		id: 'revenueGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Rev. Growth (Q)',
		id: 'revenueGrowthQ',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Gross Profit',
		id: 'grossProfit',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Gross Prof. Growth',
		id: 'grossProfitGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Op. Income',
		id: 'operatingIncome',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Op. Income Growth',
		id: 'operatingIncomeGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Net Income',
		id: 'netIncome',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Net Inc. Growth',
		id: 'netIncomeGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EPS',
		id: 'eps',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'EPS Growth',
		id: 'epsGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EBIT',
		id: 'ebit',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'EBITDA',
		id: 'ebitda',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Op. Cash Flow',
		id: 'ocf',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-X1M' },
			{ name: 'Under -10M', value: 'under-X10M' },
			{ name: 'Under -100M', value: 'under-X100M' },
			{ name: 'Under -1B', value: 'under-X1B' },
			{ name: 'Under -10B', value: 'under-X10B' }
		]
	},
	{
		name: 'Inv. Cash Flow',
		id: 'icf',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-X1M' },
			{ name: 'Under -10M', value: 'under-X10M' },
			{ name: 'Under -100M', value: 'under-X100M' },
			{ name: 'Under -1B', value: 'under-X1B' },
			{ name: 'Under -10B', value: 'under-X10B' }
		]
	},
	{
		name: 'Fin. Cash Flow',
		id: 'cff',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-X1M' },
			{ name: 'Under -10M', value: 'under-X10M' },
			{ name: 'Under -100M', value: 'under-X100M' },
			{ name: 'Under -1B', value: 'under-X1B' },
			{ name: 'Under -10B', value: 'under-X10B' }
		]
	},
	{
		name: 'Net Cash Flow',
		id: 'ncf',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-X1M' },
			{ name: 'Under -10M', value: 'under-X10M' },
			{ name: 'Under -100M', value: 'under-X100M' },
			{ name: 'Under -1B', value: 'under-X1B' },
			{ name: 'Under -10B', value: 'under-X10B' }
		]
	},
	{
		name: 'CapEx',
		id: 'capex',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Free Cash Flow',
		id: 'fcf',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-X1M' },
			{ name: 'Under -10M', value: 'under-X10M' },
			{ name: 'Under -100M', value: 'under-X100M' },
			{ name: 'Under -1B', value: 'under-X1B' },
			{ name: 'Under -10B', value: 'under-X10B' }
		]
	},
	{
		name: 'FCF Growth',
		id: 'fcfGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'FCF / Share',
		id: 'fcfps',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Total Cash',
		id: 'cash',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Total Debt',
		id: 'debt',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Net Cash / Debt',
		id: 'netCash',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' },
			{ name: 'Under -1M', value: 'under-1M' },
			{ name: 'Under -10M', value: 'under-10M' },
			{ name: 'Under -100M', value: 'under-100M' },
			{ name: 'Under -1B', value: 'under-1B' },
			{ name: 'Under -10B', value: 'under-10B' },
			{ name: 'Under -50B', value: 'under-50B' },
			{ name: 'Under -100B', value: 'under-100B' },
			{ name: 'Under -200B', value: 'under-200B' }
		]
	},
	{
		name: 'Net Cash Growth',
		id: 'netCashGrowth',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Cash / Market Cap',
		id: 'netCashByMarketCap',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' }
		]
	},
	{
		name: 'Total Assets',
		id: 'assets',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 500B', value: 'over-500B' },
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Total Liabilities',
		id: 'liabilities',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 500B', value: 'over-500B' },
			{ name: 'Over 200B', value: 'over-200B' },
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Gross Margin',
		id: 'grossMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Operating Margin',
		id: 'operatingMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Profit Margin',
		id: 'profitMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'FCF Margin',
		id: 'fcfMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EBITDA Margin',
		id: 'ebitdaMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EBIT Margin',
		id: 'ebitMargin',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'PS Ratio',
		id: 'ps',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 50', value: 'under-50' },
			{ name: 'Under 30', value: 'under-30' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'PB Ratio',
		id: 'pb',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'P/FCF Ratio',
		id: 'pfcf',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'PEG Ratio',
		id: 'peg',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'EV/Sales',
		id: 'evSales',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'EV/Earnings',
		id: 'evEarnings',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 50', value: 'under-50' },
			{ name: 'Under 30', value: 'under-30' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'EV/EBITDA',
		id: 'evEbitda',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 50', value: 'under-50' },
			{ name: 'Under 30', value: 'under-30' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'EV/EBIT',
		id: 'evEbit',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 50', value: 'under-50' },
			{ name: 'Under 30', value: 'under-30' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'EV/FCF',
		id: 'evFcf',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 50', value: 'under-50' },
			{ name: 'Under 30', value: 'under-30' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Earnings Yield',
		id: 'earningsYield',
		category: ['Valuation'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: '3-5%', value: 'between-3-5' },
			{ name: '1-3%', value: 'between-1-3' },
			{ name: '0-1%', value: 'between-0-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'FCF Yield',
		id: 'fcfYield',
		category: ['Valuation'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: '3-5%', value: 'between-3-5' },
			{ name: '1-3%', value: 'between-1-3' },
			{ name: '0-1%', value: 'between-0-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Dividend ($)',
		id: 'dps',
		category: ['Dividends'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Div. Growth',
		id: 'dg',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: '3-5%', value: 'between-3-5' },
			{ name: '1-3%', value: 'between-1-3' },
			{ name: '0-1%', value: 'between-0-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Payout Ratio',
		id: 'pr',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Under 100%', value: 'under-100' },
			{ name: 'Under 90%', value: 'under-90' },
			{ name: 'Under 80%', value: 'under-80' },
			{ name: 'Under 70%', value: 'under-70' },
			{ name: 'Under 60%', value: 'under-60' },
			{ name: 'Under 50%', value: 'under-50' },
			{ name: 'Under 40%', value: 'under-40' },
			{ name: 'Under 30%', value: 'under-30' },
			{ name: 'Under 20%', value: 'under-20' },
			{ name: 'Under 10%', value: 'under-10' }
		]
	},
	{
		name: 'Payout Freq.',
		id: 'payoutFrequency',
		category: ['Dividends'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Monthly', value: 'Monthly' },
			{ name: 'Quarterly', value: 'Quarterly' },
			{ name: 'Semi-Annual', value: 'Semi-Annual' },
			{ name: 'Annual', value: 'Annual' }
		]
	},
	{
		name: 'Buyback Yield',
		id: 'buybackYield',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Total Yield',
		id: 'totalReturn',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Average Volume',
		id: 'averageVolume',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over 10K', value: 'over-10K' },
			{ name: 'Over 1K', value: 'over-1K' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Beta (1Y)',
		id: 'beta',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1.5', value: 'over-1.5' },
			{ name: 'Over 1.2', value: 'over-1.2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 0.8', value: 'under-0.8' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Under 0.2', value: 'under-0.2' },
			{ name: 'Under 0', value: 'under-0' },
			{ name: 'Under -0.2', value: 'under-X0.2' },
			{ name: 'Under -0.5', value: 'under-X0.5' },
			{ name: 'Under -0.8', value: 'under-X0.8' },
			{ name: 'Under -1', value: 'under-X1' }
		]
	},
	{
		name: 'Short % Float',
		id: 'shortFloat',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 30%', value: 'over-30' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Short % Shares',
		id: 'shortShares',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 30%', value: 'over-30' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Short Ratio',
		id: 'shortRatio',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Shares Out',
		id: 'sharesOut',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 5B', value: 'over-5B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 50M', value: 'under-50M' },
			{ name: 'Under 100M', value: 'under-100M' },
			{ name: 'Under 1B', value: 'under-1B' },
			{ name: 'Under 5B', value: 'under-5B' }
		]
	},
	{
		name: 'Float',
		id: 'float',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 5B', value: 'over-5B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 50M', value: 'under-50M' },
			{ name: 'Under 100M', value: 'under-100M' },
			{ name: 'Under 1B', value: 'under-1B' },
			{ name: 'Under 5B', value: 'under-5B' }
		]
	},
	{
		name: 'Shares Ch. (YoY)',
		id: 'sharesYoY',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -2%', value: 'under-X2' },
			{ name: 'Under -3%', value: 'under-X3' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' }
		]
	},
	{
		name: 'Shares Ch. (QoQ)',
		id: 'sharesQoQ',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -2%', value: 'under-X2' },
			{ name: 'Under -3%', value: 'under-X3' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' }
		]
	},
	{
		name: 'Shares Insiders',
		id: 'sharesInsiders',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 30%', value: 'over-30' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Shares Institut.',
		id: 'sharesInstitutions',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 80%', value: 'over-80' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 30%', value: 'over-30' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Earnings Date',
		id: 'earningsDate',
		category: ['Company'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Tomorrow', value: 'tomorrow' },
			{ name: 'Yesterday', value: 'yesterday' },
			{ name: 'Next 7D', value: 'future-7D' },
			{ name: 'Next 30D', value: 'future-30D' },
			{ name: 'This Month', value: 'this-month' }
		]
	},
	{
		name: 'Is SPAC',
		id: 'spac',
		category: ['Company'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Exclude SPACs', value: 'No' },
			{ name: 'Show Only SPACs', value: 'Yes' }
		]
	},
	{
		name: 'Ex-Div Date',
		id: 'exDivDate',
		category: ['Dividends'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Yesterday', value: 'yesterday' },
			{ name: 'Past 7D', value: 'past-7D' },
			{ name: 'Past 30D', value: 'past-1M' },
			{ name: 'This Month', value: 'this-month' }
		]
	},
	{
		name: 'Next Ex-Div',
		id: 'nextDivDate',
		category: ['Dividends'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Tomorrow', value: 'tomorrow' },
			{ name: 'Next 7D', value: 'future-7D' },
			{ name: 'Next 30D', value: 'future-30D' },
			{ name: 'This Month', value: 'this-month' }
		]
	},
	{
		name: 'Return on Equity',
		id: 'roe',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Return on Assets',
		id: 'roa',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Return on Capital',
		id: 'roic',
		category: ['Other'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Rev / Employee',
		id: 'revPerEmployee',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 5M', value: 'over-5M' },
			{ name: 'Over 3M', value: 'over-3M' },
			{ name: 'Over 2M', value: 'over-2M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over 500K', value: 'over-500K' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Prof. / Employee',
		id: 'profitPerEmployee',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 5M', value: 'over-5M' },
			{ name: 'Over 3M', value: 'over-3M' },
			{ name: 'Over 2M', value: 'over-2M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over 500K', value: 'over-500K' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Asset Turnover',
		id: 'assetTurnover',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Inv. Turnover',
		id: 'inventoryTurnover',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 200', value: 'over-200' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'Over 20', value: 'over-20' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Current Ratio',
		id: 'currentRatio',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'Over 30', value: 'over-30' },
			{ name: 'Over 20', value: 'over-20' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Quick Ratio',
		id: 'quickRatio',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'Over 30', value: 'over-30' },
			{ name: 'Over 20', value: 'over-20' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over 0', value: 'over-0' }
		]
	},
	{
		name: 'Debt / Equity',
		id: 'debtEquity',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 10', value: 'under-10' }
		]
	},
	{
		name: 'Debt / EBITDA',
		id: 'debtEbitda',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 10', value: 'under-10' }
		]
	},
	{
		name: 'Debt / FCF',
		id: 'debtFcf',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 10', value: 'under-10' }
		]
	},
	{
		name: 'Eff. Tax Rate',
		id: 'taxRate',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 30%', value: 'over-30' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Between 0-1%', value: 'between-0-1' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under 1%', value: 'under-1' },
			{ name: 'Under 5%', value: 'under-5' },
			{ name: 'Under 10%', value: 'under-10' },
			{ name: 'Under 20%', value: 'under-20' },
			{ name: 'Under 30%', value: 'under-30' }
		]
	},
	{
		name: 'Tax / Revenue',
		id: 'taxByRevenue',
		category: ['Financials'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Between 0-1%', value: 'between-0-1' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under 1%', value: 'under-1' },
			{ name: 'Under 5%', value: 'under-5' },
			{ name: 'Under 10%', value: 'under-10' },
			{ name: 'Under 20%', value: 'under-20' }
		]
	},
	{
		name: 'Shareh. Equity',
		id: 'equity',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Working Capital',
		id: 'workingCapital',
		category: ['Financials'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 20B', value: 'over-20B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 5B', value: 'over-5B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 500M', value: 'over-500M' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Last Stock Split',
		id: 'ls',
		category: ['Other'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Forward', value: 'Forward' },
			{ name: 'Reverse', value: 'Reverse' },
			{ name: 'Never', value: 'Never' }
		]
	},
	{
		name: 'Last Split Date',
		id: 'splitDate',
		category: ['Other'],
		filterType: 'date',
		options: [
			{ name: 'This Year', value: 'this-year' },
			{ name: 'Last Year', value: 'last-year' },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' }
		]
	}
]

export const IPOFiltersMap: FilterProps[] = [
	{
		name: 'Market Cap',
		id: 'm',
		category: ['General'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 50B', value: 'over-50B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 300M', value: 'over-300M' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Mega-Cap: 200B+', value: 'over-200B' },
			{ name: 'Large-Cap: 10-200B', value: 'between-10B-200B' },
			{ name: 'Mid-Cap: 10-20B', value: 'between-2B-10B' },
			{ name: 'Small-Cap: 300M-20B', value: 'between-300M-2B' },
			{ name: 'Micro-Cap: Under 300M', value: 'under-300M' }
		]
	},
	{
		name: 'Sector',
		id: 'se',
		category: ['General'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'IPO Date',
		id: 'ipoDate',
		category: ['General'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Tomorrow', value: 'tomorrow' },
			{ name: 'This Week', value: 'This Week' },
			{ name: 'Next Week', value: 'Next Week' },
			{ name: 'Later', value: 'Later' },
			{ name: 'Unscheduled', value: 'Unscheduled' }
		]
	},
	{
		name: 'Revenue',
		id: 'revenue',
		category: ['Financials', 'Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Exactly Zero', value: 'exactly-0' }
		]
	},
	{
		name: 'Industry',
		id: 'i',
		category: ['General'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Country',
		id: 'country',
		category: ['General'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['General'],
		filterType: 'stringmatch',
		options: [
			{ name: 'NASDAQ', value: 'NASDAQ' },
			{ name: 'NYSE', value: 'NYSE' },
			{ name: 'NYSE AMERICAN', value: 'NYSEAMERICAN' }
		]
	},
	{
		name: 'Employees',
		id: 'employees',
		category: ['General'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over 10K', value: 'over-10K' },
			{ name: 'Over 1K', value: 'over-1K' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 0', value: 'over-0' },
			{ name: 'Under 1K', value: 'under-1K' },
			{ name: 'Under 10K', value: 'under-10K' },
			{ name: 'Under 100K', value: 'under-100K' }
		]
	},
	{
		name: 'Founded',
		id: 'founded',
		category: ['General'],
		filterType: 'date',
		options: [
			{ name: 'Over 20 Years', value: 'over-20Y' },
			{ name: 'Over 10 Years', value: 'over-10Y' },
			{ name: 'Over 5 Years', value: 'over-5Y' },
			{ name: 'Over 3 Years', value: 'over-3Y', div: true },
			{ name: 'Last Year', value: 'last-year' },
			{ name: 'This Year', value: 'this-year', div: true },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' },
			{ name: 'Within 20 Years', value: 'under-20Y' },
			{ name: 'Within 50 Years', value: 'under-50Y' },
			{ name: 'Within 100 Years', value: 'under-100Y' }
		]
	},
	{
		name: 'Is SPAC',
		id: 'spac',
		category: ['General'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Exclude SPACs', value: 'No' },
			{ name: 'Show Only SPACs', value: 'Yes' }
		]
	},
	{
		name: 'Total Assets',
		id: 'assets',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Total Cash',
		id: 'cash',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Total Debt',
		id: 'debt',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Total Liabilities',
		id: 'liabilities',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Shareh. Equity',
		id: 'equity',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Gross Profit',
		id: 'grossProfit',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Op. Income',
		id: 'operatingIncome',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Net Income',
		id: 'netIncome',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'EPS',
		id: 'eps',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'EBIT',
		id: 'ebit',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'EBITDA',
		id: 'ebitda',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Gross Margin',
		id: 'grossMargin',
		category: ['Income'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Operating Margin',
		id: 'operatingMargin',
		category: ['Income'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Profit Margin',
		id: 'profitMargin',
		category: ['Income'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EBITDA Margin',
		id: 'ebitdaMargin',
		category: ['Income'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'EBIT Margin',
		id: 'ebitMargin',
		category: ['Income'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Op. Cash Flow',
		id: 'ocf',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Inv. Cash Flow',
		id: 'icf',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Fin. Cash Flow',
		id: 'cff',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Net Cash Flow',
		id: 'ncf',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'CapEx',
		id: 'capex',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'Free Cash Flow',
		id: 'fcf',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'FCF / Share',
		id: 'fcfps',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		]
	},
	{
		name: 'FCF Margin',
		id: 'fcfMargin',
		category: ['Cash Flow'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'IPO Price',
		id: 'ipoPriceRange',
		category: ['General'],
		filterType: 'numericRange',
		options: [
			{ name: 'Under $5', value: 'under-5' },
			{ name: 'Under $10', value: 'under-10' },
			{ name: '$10 - $15', value: 'between-10-15' },
			{ name: '$15 - $20', value: 'between-15-20' },
			{ name: 'Over $20', value: 'over-20' }
		]
	},
	{
		name: 'Shares Out',
		id: 'sharesOut',
		category: ['Income'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 50M', value: 'under-50M' },
			{ name: 'Under 100M', value: 'under-100M' },
			{ name: 'Under 1B', value: 'under-1B' },
			{ name: 'Under 5B', value: 'under-5B' }
		]
	},
	{
		name: 'Shares Offered',
		id: 'sharesOffered',
		category: ['General'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 50M', value: 'under-50M' },
			{ name: 'Under 100M', value: 'under-100M' },
			{ name: 'Under 1B', value: 'under-1B' },
			{ name: 'Under 5B', value: 'under-5B' }
		]
	}
]

export const ETFFiltersMap: FilterProps[] = [
	{
		name: 'Stock Price',
		id: 'p',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'From 100-500', value: 'between-100-500' },
			{ name: 'From 50-100', value: 'between-50-100' },
			{ name: 'From 20-50', value: 'between-20-50' },
			{ name: 'From 10-20', value: 'between-10-20' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' }
		]
	},
	{
		name: 'Expense Ratio',
		id: 'expenseRatio',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Under 1%', value: 'under-1' },
			{ name: 'Under 0.5%', value: 'under-0.5' },
			{ name: 'Under 0.3%', value: 'under-0.3' },
			{ name: 'Under 0.2%', value: 'under-0.2' },
			{ name: 'Under 0.1%', value: 'under-0.1' },
			{ name: 'Under 0.05%', value: 'under-0.05' }
		]
	},
	{
		name: 'Holdings',
		id: 'holdings',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 5000', value: 'over-5000' },
			{ name: 'Over 1000', value: 'over-1000' },
			{ name: 'Over 500', value: 'over-500' },
			{ name: 'Over 100', value: 'over-100' },
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'From 500-1000', value: 'between-500-1000' },
			{ name: 'From 100-500', value: 'between-100-500' },
			{ name: 'From 50-100', value: 'between-50-100' },
			{ name: 'From 20-50', value: 'between-20-50' },
			{ name: 'From 10-20', value: 'between-10-20' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 1', value: 'under-1' }
		]
	},
	{
		name: 'Volume',
		id: 'v',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over 100K', value: 'over-100K' },
			{ name: 'Over 10K', value: 'over-10K' },
			{ name: 'Over 1K', value: 'over-1K' },
			{ name: 'Not Zero', value: 'notzero' },
			{ name: 'Under 1K', value: 'under-1K' },
			{ name: 'Under 10K', value: 'under-10K' },
			{ name: 'Under 100K', value: 'under-100K' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 100M', value: 'under-100M' }
		]
	},
	{
		name: 'Assets',
		id: 'aum',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100B', value: 'over-100B' },
			{ name: 'Over 10B', value: 'over-10B' },
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Asset Class',
		id: 'assetClass',
		category: ['Popular'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Alternative', value: 'Alternative' },
			{ name: 'Commodity', value: 'Commodity' },
			{ name: 'Currency', value: 'Currency' },
			{ name: 'Equity', value: 'Equity' },
			{ name: 'Fixed Income', value: 'Fixed Income' },
			{ name: 'Portfolio-Multi Asset', value: 'Portfolio-Multi Asset' }
		]
	},
	{
		name: 'Sector',
		id: 'etfSector',
		category: ['Popular', 'Company'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Issuer',
		id: 'issuer',
		category: ['Popular'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Index',
		id: 'etfIndex',
		category: ['Popular'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Inception Date',
		id: 'inceptionDate',
		category: ['Popular'],
		filterType: 'date',
		options: [
			{ name: 'Past Month', value: 'under-1M' },
			{ name: 'Past 3 Months', value: 'under-3M' },
			{ name: 'Past 6 Months', value: 'under-6M' },
			{ name: 'Past 12 Months', value: 'under-12M', div: true },
			{ name: 'This Year', value: 'this-year' },
			{ name: 'Last Year', value: 'last-year', div: true },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' },
			{ name: 'Within 20 Years', value: 'under-20Y', div: true },
			{ name: 'Over 1 Years Ago', value: 'over-1Y' },
			{ name: 'Over 3 Years Ago', value: 'over-3Y' },
			{ name: 'Over 5 Years Ago', value: 'over-5Y' },
			{ name: 'Over 10 Years Ago', value: 'over-10Y' },
			{ name: 'Over 20 Years Ago', value: 'over-20Y' }
		]
	},
	{
		name: 'PE Ratio',
		id: 'etfPeRatio',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 50', value: 'over-50' },
			{ name: 'From 30-50', value: 'between-30-50' },
			{ name: 'From 20-30', value: 'between-20-30' },
			{ name: 'From 15-20', value: 'between-15-20' },
			{ name: 'From 10-15', value: 'between-10-15' },
			{ name: 'Under 20', value: 'under-20' },
			{ name: 'Under 10', value: 'under-10' },
			{ name: 'Under 5', value: 'under-5' }
		]
	},
	{
		name: 'Beta (1Y)',
		id: 'beta',
		category: ['Performance'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 4', value: 'over-4' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 0.8', value: 'under-0.8' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Under 0.2', value: 'under-0.2' },
			{ name: 'Under 0', value: 'under-0' },
			{ name: 'Under -0.2', value: 'under-X0.2' },
			{ name: 'Under -0.5', value: 'under-X0.5' },
			{ name: 'Under -0.8', value: 'under-X0.8' },
			{ name: 'Under -1', value: 'under-X1' },
			{ name: 'Under -1.5', value: 'under-X1.5' },
			{ name: 'Under -2', value: 'under-X2' },
			{ name: 'Under -3', value: 'under-X3' }
		]
	},
	{
		name: 'Dividend ($)',
		id: 'dps',
		category: ['Dividends'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 3', value: 'over-3' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Dividend Yield',
		id: 'dy',
		category: ['Popular', 'Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: '2-3%', value: 'between-2-3' },
			{ name: '1-2%', value: 'between-1-2' },
			{ name: '0-1%', value: 'between-0-1' },
			{ name: 'Not Zero', value: 'notzero' }
		]
	},
	{
		name: 'Div. Growth',
		id: 'dg',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 3%', value: 'over-3' },
			{ name: 'Over 2%', value: 'over-2' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over Zero', value: 'over-0' }
		]
	},
	{
		name: 'Payout Ratio',
		id: 'pr',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Under 100%', value: 'under-100' },
			{ name: 'Under 90%', value: 'under-90' },
			{ name: 'Under 80%', value: 'under-80' },
			{ name: 'Under 70%', value: 'under-70' },
			{ name: 'Under 60%', value: 'under-60' },
			{ name: 'Under 50%', value: 'under-50' },
			{ name: 'Under 40%', value: 'under-40' },
			{ name: 'Under 30%', value: 'under-30' },
			{ name: 'Under 20%', value: 'under-20' },
			{ name: 'Under 10%', value: 'under-10' }
		]
	},
	{
		name: 'Payout Freq.',
		id: 'payoutFrequency',
		category: ['Dividends'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Weekly', value: 'Weekly' },
			{ name: 'Monthly', value: 'Monthly' },
			{ name: 'Quarterly', value: 'Quarterly' },
			{ name: 'Semi-Annual', value: 'Semi-Annual' },
			{ name: 'Annual', value: 'Annual' }
		]
	},
	{
		name: 'Ex-Div Date',
		id: 'exDivDate',
		category: ['Dividends'],
		filterType: 'date',
		options: [
			{ name: 'Today', value: 'today' },
			{ name: 'Yesterday', value: 'yesterday' },
			{ name: 'Past Week', value: 'under-7D' },
			{ name: 'Past Month', value: 'under-1M' },
			{ name: 'Past 3 Months', value: 'under-3M' },
			{ name: 'Past 6 Months', value: 'under-6M' },
			{ name: 'Past 12 Months', value: 'under-12M', div: true }
		]
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['Popular'],
		filterType: 'stringmatch',
		options: [
			{ name: 'BATS', value: 'BATS' },
			{ name: 'NASDAQ', value: 'NASDAQ' },
			{ name: 'NYSEARCA', value: 'NYSEARCA' }
		]
	},
	{
		name: 'Region',
		id: 'etfRegion',
		category: ['Popular'],
		filterType: 'stringmatch',
		variable: true,
		options: []
	},
	{
		name: 'Shares Out',
		id: 'sharesOut',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' },
			{ name: 'Under 1M', value: 'under-1M' },
			{ name: 'Under 10M', value: 'under-10M' },
			{ name: 'Under 50M', value: 'under-50M' },
			{ name: 'Under 100M', value: 'under-100M' }
		]
	},
	{
		name: 'Price Change 1D',
		id: 'c',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' }
		]
	},
	{
		name: 'Price Change 1M',
		id: 'ch1m',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' }
		]
	},
	{
		name: 'Price Change 6M',
		id: 'ch6m',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change YTD',
		id: 'chYTD',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 1Y',
		id: 'ch1y',
		category: ['Popular', 'Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' }
		]
	},
	{
		name: 'Price Change 3Y',
		id: 'ch3y',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' },
			{ name: 'Under -90%', value: 'under-X90' }
		]
	},
	{
		name: 'Price Change 5Y',
		id: 'ch5y',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{ name: 'Over 300%', value: 'over-300' },
			{ name: 'Over 200%', value: 'over-200' },
			{ name: 'Over 100%', value: 'over-100' },
			{ name: 'Over 50%', value: 'over-50' },
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'From 0-1%', value: 'between-0-1' },
			{ name: 'From -1-0%', value: 'between-X1-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' },
			{ name: 'Under -50%', value: 'under-X50' },
			{ name: 'Under -90%', value: 'under-X90' }
		]
	}
]
