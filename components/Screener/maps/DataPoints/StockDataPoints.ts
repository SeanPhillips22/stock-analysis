import { FilterProps } from 'components/Screener/screener.types'
import { dateSort } from 'components/Screener/functions/sort/sortFunctions'

export const StockDataPoints: FilterProps[] = [
	{
		name: 'Symbol',
		id: 's',
		format: 'linkSymbol',
		options: [],
		filterType: 'none'
	},
	{
		name: 'Name',
		id: 'n',
		format: 'string',
		options: [],
		filterType: 'none'
	},
	{
		name: 'Market Cap',
		id: 'marketCap',
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
		],
		format: 'marketcap',
		tooltipTitle: 'Market Capitalization',
		tooltipText: "Market capitalization, or market cap, is the total value of all of a company's outstanding shares.",
		tooltipFormula: 'Market Cap = Shares Outstanding * Stock Price'
	},
	{
		name: 'Enterprise Value',
		id: 'enterpriseValue',
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
		],
		format: 'abbreviate',
		tooltipText:
			"Enterprise value measures the total value of a company's outstanding shares, adjusted for debt and cash levels.",
		tooltipFormula: 'Enterprise Value = Market Cap + Total Debt - Cash & Equivalents'
	},
	{
		name: 'Industry',
		id: 'industry',
		category: ['Popular', 'Company'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		tooltipText:
			'The industry that the company is in, according to the Global Industry Classification Standard (GICS).'
	},
	{
		name: 'Stock Price',
		id: 'price',
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
		],
		format: 'amount',
		tooltipText: 'The stock price is the current price of a single share, in US dollars.',
		columnName: 'Price'
	},
	{
		name: 'Forward PE',
		id: 'peForward',
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
		],
		format: 'format2dec',
		tooltipText:
			'The forward price-to-earnings (P/E) ratio is like the PE ratio, except that it uses the estimated earnings over the next year instead of historical earnings.',
		tooltipFormula: 'Forward PE = Stock Price / Forward EPS (1Y)'
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['Company'],
		filterType: 'multiselect',
		options: [
			{ name: 'NASDAQ', value: 'NASDAQ' },
			{ name: 'NYSE', value: 'NYSE' },
			{ name: 'NYSE AMERICAN', value: 'NYSEAMERICAN' }
		],
		tooltipTitle: 'Stock Exchange',
		tooltipText: 'The stock exchange that the stock is listed on.'
	},
	{
		name: 'Dividend Yield',
		id: 'dividendYield',
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
		],
		format: 'percentage',
		tooltipText:
			'The dividend yield is how much a stock pays in dividends each year, as a percentage of the stock price.',
		tooltipFormula: 'Dividend Yield = (Annual Dividends Per Share / Stock Price) * 100%',
		columnName: 'Yield (%)'
	},
	{
		name: 'Sector',
		id: 'sector',
		category: ['Popular', 'Company'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'padleft',
		tooltipText: 'The sector that the company is in, according to the Global Industry Classification Standard (GICS).'
	},
	{
		name: 'Price Change 1D',
		id: 'change',
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
		],
		columnName: '% Change',
		format: 'changePcColor',
		tooltipTitle: 'Price Change (1D)',
		tooltipText: 'The percentage change in the stock price on the current or latest trading day.'
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
		],
		format: 'changePcColor',
		tooltipTitle: '1-Month Price Change',
		tooltipText: 'The percentage change in the stock price compared to 1 month ago.',
		columnName: 'Chg. 1M'
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
		],
		format: 'changePcColor',
		tooltipTitle: '6-Month Price Change',
		tooltipText: 'The percentage change in the stock price compared to 6 months ago.',
		columnName: 'Chg. 6M'
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
		],
		format: 'changePcColor',
		tooltipTitle: 'Year-to-Date Price Change',
		tooltipText: 'The percentage change in the stock price since January 1st of the current year.',
		columnName: 'Chg. YTD'
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
		],
		format: 'changePcColor',
		tooltipTitle: '1-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 1 year ago.',
		columnName: 'Chg. 1Y'
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
		],
		format: 'changePcColor',
		tooltipTitle: '3-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 3 years ago.',
		columnName: 'Chg. 3Y'
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
		],
		format: 'changePcColor',
		tooltipTitle: '5-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 5 years ago.',
		columnName: 'Chg. 5Y'
	},
	{
		name: 'Volume',
		id: 'volume',
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
		],
		format: 'format0dec',
		tooltipTitle: 'Current Volume',
		tooltipText: 'The number of shares traded during the current or latest trading day.'
	},
	{
		name: 'PE Ratio',
		id: 'peRatio',
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
		],
		format: 'format2dec',
		tooltipText:
			'The price-to-earnings (P/E) ratio is a valuation metric that shows how expensive a stock is relative to earnings.',
		tooltipFormula: 'PE Ratio = Stock Price / Earnings Per Share'
	},
	{
		name: 'Analyst Rating',
		id: 'analystRatings',
		category: ['Popular'],
		filterType: 'multiselect',
		options: [
			{ name: 'Strong Buy', value: 'Strong Buy' },
			{ name: 'Buy', value: 'Buy' },
			{ name: 'Hold', value: 'Hold' },
			{ name: 'Sell', value: 'Sell' },
			{ name: 'Strong Sell', value: 'Strong Sell' }
		],
		format: 'align',
		tooltipText: 'The average rating of analysts for the stock.',
		columnName: 'Analyst Ratings'
	},
	{
		name: 'Analyst Count',
		id: 'analystCount',
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
		],
		format: 'align',
		tooltipText: 'The number of analysts that have given a rating and price target for the stock.',
		columnName: 'Count'
	},
	{
		name: 'Price Target',
		id: 'priceTarget',
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
		],
		format: 'amount',
		tooltipText: 'The average 12-month price target given to the stock by stock analysts.',
		columnName: 'Target'
	},
	{
		name: 'Price Target (%)',
		id: 'priceTargetChange',
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
		],
		format: 'changePcColor',
		tooltipTitle: 'Price Target Difference',
		tooltipText: 'The difference between the average 12-month analyst price target and the current stock price.',
		columnName: 'Target (%)'
	},
	{
		name: 'Previous Close',
		id: 'close',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 10', value: 'under-10' }
		],
		columnName: 'Prev. Close',
		format: 'format2dec',
		tooltipText:
			'The closing price of the previous trading day. This is used to calculate the change in price on the current trading day.'
	},
	{
		name: 'Premarket Price',
		id: 'premarketPrice',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Over 2', value: 'over-2' },
			{ name: 'Over 1', value: 'over-1' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 10', value: 'under-10' }
		],
		columnName: 'Premkt. Price',
		format: 'format2dec',
		tooltipText: 'The price of the stock during premarket trading hours, from 4:00 am until 9:30 am Eastern Time.'
	},
	{
		name: 'Premkt. % Change',
		id: 'premarketChangePercent',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 20%', value: 'over-20' },
			{ name: 'Over 10%', value: 'over-10' },
			{ name: 'Over 5%', value: 'over-5' },
			{ name: 'Over 1%', value: 'over-1' },
			{ name: 'Over 0%', value: 'over-0' },
			{ name: 'Under 0%', value: 'under-0' },
			{ name: 'Under -1%', value: 'under-X1' },
			{ name: 'Under -5%', value: 'under-X5' },
			{ name: 'Under -10%', value: 'under-X10' },
			{ name: 'Under -20%', value: 'under-X20' }
		],
		columnName: 'Premkt. % Chg.',
		format: 'changePcColor',
		tooltipTitle: 'Premarket % Change',
		tooltipText: 'The percentage change in the price of the stock during premarket trading hours.'
	},
	{
		name: 'Country',
		id: 'country',
		category: ['Company'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		tooltipText: 'The country that the company is from and/or has its primary headquarters.'
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
		],
		format: 'format0dec',
		tooltipText: "The company's last reported total number of employees."
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
		],
		format: 'align',
		tooltipText: 'The year that the company was originally founded in.'
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
		],
		format: 'date',
		sortType: dateSort,
		tooltipText:
			"The date of the company's Initial Public Offering (IPO), or when it originally started trading on the stock exchange."
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Revenue (ttm)',
		tooltipText:
			'Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.'
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
		],
		format: 'percentage',
		tooltipTitle: 'Revenue Growth (YoY)',
		tooltipText:
			"Revenue growth is how much a company's trailing 12-month (ttm) revenue has increased compared to the previous 12-month period, expressed as a percentage.",
		tooltipFormula: 'Revenue Growth = ((Current Revenue / Previous Revenue) - 1) * 100%',
		columnName: 'Rev. Growth (1Y)'
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
		],
		format: 'percentage',
		tooltipTitle: 'Revenue Growth (Quarterly)',
		tooltipText:
			"Quarterly revenue growth is how much a company's revenue increased in the last quarter compared to the same quarter a year earlier."
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
		],
		format: 'abbreviate',
		tooltipText:
			'Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.',
		tooltipFormula: 'Gross Profit = Revenue - Cost of Revenue'
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
		],
		format: 'percentage',
		tooltipTitle: 'Gross Profit Growth (YoY)',
		tooltipText:
			"Gross profit growth is how much a company's trailing 12-month (ttm) gross profit has increased or decreased compared to the previous 12-month period.",
		columnName: 'Gross P. Growth'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Operating Income',
		tooltipText:
			'Operating income is the amount of profit in a company after paying for all the expenses related to its core operations.',
		tooltipFormula: 'Operating Income = Revenue - Cost of Revenue - Operating Expenses'
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
		],
		format: 'percentage',
		tooltipTitle: 'Operating Income Growth (YoY)',
		tooltipText:
			"Operating income growth is how much a company's trailing 12-month (ttm) operating income has increased or decreased compared to the previous 12-month period.",
		columnName: 'OpInc. Growth'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		tooltipFormula: 'Net Income = Revenue - All Expenses'
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
		],
		format: 'percentage',
		tooltipTitle: 'Net Income Growth (YoY)',
		tooltipText:
			"Net income growth is how much a company's trailing 12-month (ttm) earnings have increased or decreased compared to the 12-month period a year ago.",
		tooltipFormula: 'Net Income Growth = ((Current Net Income / Previous Net Income) - 1) * 100%',
		columnName: 'Net Income Growth'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EPS (Diluted)',
		tooltipText:
			"Earnings per share (EPS) is the portion of a company's profit that is allocated to each individual stock. EPS is calculated by dividing net income by shares outstanding.",
		tooltipFormula: 'EPS = Net Income / Shares Outstanding'
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
		],
		format: 'percentage',
		tooltipTitle: 'EPS Growth (YoY)',
		tooltipText:
			"EPS growth is how much a company's trailing 12-month earnings per share have changed compared to the 12-month period a year ago.",
		tooltipFormula: 'EPS Growth = ((Current EPS / Previous EPS) - 1) * 100%'
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
		],
		format: 'abbreviate',
		tooltipText:
			'EBIT stands for "Earnings Before Interest and Taxes" and is a commonly used measure of earnings or profits. It is similar to operating income.',
		tooltipFormula: 'EBIT = Net Income + Interest + Taxes'
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
		],
		format: 'abbreviate',
		tooltipText:
			'EBITDA stands for "Earnings Before Interest, Taxes, Depreciation and Amortization." It is a commonly used measure of profitability.',
		tooltipFormula: 'EBITDA = Net Income + Interest + Taxes + Depreciation and Amortization'
	},
	{
		name: 'Op. Cash Flow',
		id: 'operatingCF',
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Operating Cash Flow',
		tooltipText:
			'Operating cash flow, also called cash flow from operating activities, measures the amount of cash that a company generates from normal business activities. It is the amount of cash left after all cash income has been received, and all cash expenses have been paid.'
	},
	{
		name: 'Inv. Cash Flow',
		id: 'investingCF',
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Investing Cash Flow',
		tooltipText:
			'Investing cash flow, also called cash flow from investing activities, is the cash used to buy and sell investments and long-term assets. Capital expenditures are included in this category.',
		columnName: 'Investing CF'
	},
	{
		name: 'Fin. Cash Flow',
		id: 'financingCF',
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Financing Cash Flow',
		tooltipText:
			'Financing cash flow, also called cash flow from financing activities, is the cash that flows to and from owners, investors, and creditors (like banks). It includes changes in debt and equity, along with dividends and share buybacks.',
		columnName: 'Financing CF'
	},
	{
		name: 'Net Cash Flow',
		id: 'netCF',
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
		],
		format: 'abbreviate',
		tooltipText:
			'Net cash flow is the sum of operating, investing and financing cash flows. It is equal to the changes in cash and cash equivalents on the balance sheet.',
		columnName: 'Net CF'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Capital Expenditures',
		tooltipText:
			'Capital Expenditures (CapEx) is the cash spent on acquiring long-term assets that will be used to run the business. It is often called "payments for property, plants and equipment."'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Free cash flow is the cash remaining after the company spends on everything required to maintain and grow the business. It is calculated by subtracting capital expenditures from operating cash flow.',
		tooltipFormula: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures'
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
		],
		format: 'percentage',
		tooltipTitle: 'FCF Growth (YoY)',
		tooltipText:
			"Free Cash Flow (FCF) growth is how much the company's trailing 12-month (ttm) free cash flow has increased or decreased compared to the 12-month period a year ago.",
		tooltipFormula: 'FCF Growth = ((Current FCF / Previous FCF) - 1) * 100%'
	},
	{
		name: 'FCF / Share',
		id: 'fcfPerShare',
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
		],
		format: 'format2dec',
		tooltipTitle: 'Free Cash Flow Per Share',
		tooltipText: 'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.',
		tooltipFormula: 'FCF Per Share = Free Cash Flow / Shares Outstanding'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Cash & Cash Equivalents',
		tooltipText:
			'Cash and cash equivalents is the sum of "Cash & Equivalents" and "Short-Term Investments." This is the amount of money that a company has quick access to, assuming that the cash equivalents and short-term investments can be sold at a short notice.',
		tooltipFormula: 'Cash & Cash Equivalents = Cash & Equivalents + Short-Term Investments'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Total debt is the total amount of liabilities categorized as "debt" on the balance sheet. It includes both current and long-term (non-current) debt.',
		tooltipFormula: 'Total Debt = Current Debt + Long-Term Debt'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Net Cash / Debt is an indicator of the financial position of a company. It is calculated by taking the total amount of cash and cash equivalents and subtracting the total debt.',
		tooltipFormula: 'Net Cash / Debt = Total Cash - Total Debt'
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
		],
		format: 'percentage',
		tooltipTitle: 'Net Cash / Debt Growth (YoY)',
		tooltipText: 'Net cash/debt growth is the change in net cash position of the company in one year.'
	},
	{
		name: 'Cash/Market Cap',
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
		],
		format: 'percentage',
		tooltipTitle: 'Net Cash / Market Cap',
		tooltipText:
			"Net cash by market cap is the percentage of a company's net cash relative to its total market capitalization.",
		tooltipFormula: 'Net Cash / Market Cap = (Total Cash - Total Debt) / Market Cap',
		columnName: 'Cash / M. Cap'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Total assets is the sum of all current and non-current assets on the balance sheet. Assets are everything that the company owns.',
		columnName: 'Assets'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Total liabilities is the sum of all current and non-current liabilities on the balance sheet. Liabilities are everything that the company owes to others.',
		columnName: 'Liabilities'
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
		],
		format: 'percentage',
		tooltipText:
			'Gross margin is the percentage of revenue left as gross profits, after subtracting cost of goods sold from the revenue.',
		tooltipFormula: 'Gross Margin = (Gross Profit / Revenue) * 100%',
		columnName: 'Gross Mrg.'
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
		],
		format: 'percentage',
		tooltipText:
			'Operating margin is the percentage of revenue left as operating income, after subtracting cost of revenue and all operating expenses from the revenue.',
		tooltipFormula: 'Operating Margin = (Operating Income / Revenue) * 100%',
		columnName: 'Oper. Mrg.'
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
		],
		format: 'percentage',
		tooltipText:
			'Profit margin is the percentage of revenue left as net income, or profits, after subtracting all costs and expenses from the revenue.',
		tooltipFormula: 'Profit Margin = (Net Income / Revenue) * 100%',
		columnName: 'Profit Mrg.'
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
		],
		format: 'percentage',
		tooltipTitle: 'Free Cash Flow Margin',
		tooltipText:
			'FCF margin is the percentage of revenue left as free cash flow. FCF is calculated by subtracting capital expenditures (CapEx) from the operating cash flow (OCF). Both CapEx and OCF are shown on the cash flow statement.',
		tooltipFormula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%',
		columnName: 'FCF Mrg.'
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
		],
		format: 'percentage',
		tooltipText:
			'EBITDA margin is the percentage of revenue left as EBITDA, after subtracting all expenses except interest, taxes, depreciation and amortization from revenue.',
		tooltipFormula: 'EBITDA Margin = (EBITDA / Revenue) * 100%',
		columnName: 'EBITDA Mrg.'
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
		],
		format: 'percentage',
		tooltipText:
			'EBIT Margin is a profitability ratio that measures the percentage of revenue left as EBIT (Earnings Before Interest and Taxes).',
		tooltipFormula: 'EBIT Margin = (EBIT / Revenue) * 100%',
		columnName: 'EBIT Mrg.'
	},
	{
		name: 'PS Ratio',
		id: 'psRatio',
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
		],
		format: 'format2dec',
		tooltipText:
			'The price-to-sales (P/S) ratio is a commonly used valuation metric. It shows how expensive a stock is compared to revenue.',
		tooltipFormula: 'PS Ratio = Market Cap / Revenue',
		columnName: 'P/S'
	},
	{
		name: 'PB Ratio',
		id: 'pbRatio',
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
		],
		format: 'format2dec',
		tooltipText:
			"The price-to-book (P/B) ratio measures a stock's price relative to book value. Book value is also called Shareholders' equity.",
		tooltipFormula: "PB Ratio = Market Cap / Shareholders' Equity",
		columnName: 'P/B'
	},
	{
		name: 'P/FCF Ratio',
		id: 'pFcfRatio',
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
		],
		format: 'format2dec',
		tooltipText:
			'The price to free cash flow (P/FCF) ratio is similar to the P/E ratio, except it uses free cash flow instead of accounting earnings.',
		tooltipFormula: 'P/FCF Ratio = Market Cap / Free Cash Flow',
		columnName: 'P/FCF'
	},
	{
		name: 'PEG Ratio',
		id: 'pegRatio',
		category: ['Valuation'],
		filterType: 'numeric',
		options: [
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' },
			{ name: 'Under 2', value: 'under-2' },
			{ name: 'Under 1', value: 'under-1' },
			{ name: 'Under 0.5', value: 'under-0.5' },
			{ name: 'Not Zero', value: 'notzero' }
		],
		format: 'format2dec',
		tooltipText:
			"The price/earnings to growth (PEG) ratio is calculated by dividing a company's PE ratio by its expected earnings growth.",
		tooltipFormula: 'PEG Ratio = PE Ratio / Expected Earnings Growth'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EV/Sales Ratio',
		tooltipText:
			"The enterprise value to sales (EV/Sales) ratio is similar to the price-to-sales ratio, but the price is adjusted for the company's debt and cash levels.",
		tooltipFormula: 'EV/Sales Ratio = Enterprise Value / Revenue'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EV/Earnings Ratio',
		tooltipText:
			"The enterprise value to earnings (EV/Earnings) ratio measures valuation, but the price is adjusted for the company's levels of cash and debt.",
		tooltipFormula: 'EV/Earnings Ratio = Enterprise Value / Net Income'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EV/EBITDA Ratio',
		tooltipText:
			"The EV/EBITDA ratio measures a company's valuation relative to its EBITDA, or Earnings Before Interest, Taxes, Depreciation, and Amortization.",
		tooltipFormula: 'EV/EBITDA Ratio = Enterprise Value / EBITDA'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EV/EBIT Ratio',
		tooltipText:
			"The EV/EBIT is a valuation metric that measures a company's price relative to EBIT, or Earnings Before Interest and Taxes.",
		tooltipFormula: 'EV/EBIT Ratio = Enterprise Value / EBIT'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EV/FCF Ratio',
		tooltipText:
			"The enterprise value to free cash flow (EV/FCF) ratio is similar to the price to free cash flow ratio, except the price is adjusted for the company's cash and debt.",
		tooltipFormula: 'EV/FCF Ratio = Enterprise Value / Free Cash Flow'
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
		],
		format: 'percentage',
		tooltipText:
			"The earnings yield is a valuation metric that measures a company's profits relative to stock price, expressed as a percentage yield. It is the inverse of the P/E ratio.",
		tooltipFormula: 'Earnings Yield = (Earnings Per Share / Stock Price) * 100%',
		columnName: 'Earn. Yield'
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
		],
		format: 'percentage',
		tooltipText:
			"The free cash flow (FCF) yield measures a company's free cash flow relative to its price, shown as a percentage. It is the inverse of the P/FCF ratio.",
		tooltipFormula: 'FCF Yield = (Free Cash Flow / Market Cap) * 100%'
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
		],
		format: 'format2dec',
		tooltipTitle: 'Dividend Per Share',
		tooltipText: 'Total amount paid to each outstanding share in dividends during the last 12 months.',
		columnName: 'Dividend'
	},
	{
		name: 'Div. Growth',
		id: 'dividendGrowth',
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
		],
		format: 'percentage',
		tooltipTitle: 'Dividend Growth (1Y)',
		tooltipText: 'The percentage change in dividends paid per share, compared to one year ago.',
		tooltipFormula: 'Dividend Growth = ((Current Dividend / Previous Dividend) - 1) * 100%'
	},
	{
		name: 'Payout Ratio',
		id: 'payoutRatio',
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
		],
		format: 'percentage',
		tooltipText:
			"The payout ratio is the percentage of a company's profits that are paid out as dividends. A high ratio implies that the dividend payments may not be sustainable.",
		tooltipFormula: 'Payout Ratio = (Dividends Per Share / Earnings Per Share) * 100%'
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
		],
		format: 'align',
		tooltipTitle: 'Payout Frequency',
		tooltipText:
			'Payout frequency is the schedule at which the dividends are paid. For example, a "Quarterly" payout ratio implies that dividends are paid every three months.'
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
		],
		format: 'percentage',
		tooltipTitle: 'Buyback Yield / Dilution',
		tooltipText:
			'The buyback yield measures how much cash the company is returning to investors via share buybacks. A positive number indicates that the company is buying back shares. A negative number implies that the company is issuing shares and causing ownership dilution for shareholders.',
		tooltipFormula: 'Buyback Yield = - (Share Repurchase or Issuance / Market Cap) * 100%'
	},
	{
		name: 'Shareholder Yield',
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
		],
		format: 'percentage',
		tooltipTitle: 'Total Shareholder Yield',
		tooltipText:
			'The total shareholder yield is how much the company is returning to shareholders via dividends and share buybacks combined. It is calculated by adding up the dividend yield and buyback yield',
		tooltipFormula: 'Shareholder Yield = Dividend Yield + Buyback Yield',
		columnName: 'Shareh. Yield'
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
		],
		format: 'format0dec',
		tooltipTitle: 'Average Volume (30 Days)',
		tooltipText: 'The 30-day average of the number of shares traded in a single day.',
		columnName: 'Av. Volume'
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
		],
		format: 'format2dec',
		tooltipText:
			'Beta measures the price volatility of a stock in comparison to the overall stock market. A value over 1 indicates higher volatility, while a value under 1 indicates lower volatility.',
		columnName: 'Beta'
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
		],
		format: 'percentage',
		tooltipTitle: 'Short % of Float',
		tooltipText: "The percentage of the stock's public float that has been sold short.",
		columnName: 'Short/Float'
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
		],
		format: 'percentage',
		tooltipTitle: 'Short % of Shares Out',
		tooltipText: 'The percentage of the shares outstanding that have been sold short.',
		columnName: 'Short/Shares'
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
		],
		format: 'format2dec',
		tooltipTitle: 'Short Ratio (days to cover)',
		tooltipText:
			"Short ratio is the ratio of shorted shares relative to the stock's average daily trading volume. It estimates how many trading days it would take for all short sellers to cover their position.",
		columnName: 'Sh. Ratio'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Shares Outstanding',
		tooltipText: "The total amount of outstanding common stock currently held by all of the company's shareholders."
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
		],
		format: 'abbreviate',
		tooltipText:
			'Float is the amount of shares that are considered available for trading. It subtracts closely held shares by insiders and restricted stock from the total number of shares outstanding.'
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
		],
		format: 'percentage',
		tooltipTitle: 'Shares Change (YoY)',
		tooltipText: 'The change in the number of shares outstanding compared to one year ago.',
		columnName: 'Shares Change (YoY)'
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
		],
		format: 'percentage',
		tooltipTitle: 'Shares Change (QoQ)',
		tooltipText:
			'The change in the number of shares outstanding, comparing the most recent quarter to the previous quarter.',
		columnName: 'Shares Change (QoQ)'
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
		],
		format: 'percentage',
		tooltipTitle: 'Owned by Insiders (%)',
		tooltipText:
			"The percentage of shares outstanding that are held by the company's insiders, such as company executives and major shareholders.",
		columnName: 'Owned Insiders'
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
		],
		format: 'percentage',
		tooltipTitle: 'Owned by Institutions (%)',
		tooltipText:
			'The percentage of shares outstanding held by institutions, such as fund companies, pensions and others.',
		columnName: 'Owned Institutions'
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
			{ name: 'Past 7D', value: 'past-7D' },
			{ name: 'Past 30D', value: 'past-30D' },
			{ name: 'This Month', value: 'this-month' }
		],
		format: 'date',
		tooltipText:
			"The earnings date is the day that the company is estimated to release its quarterly earnings. Check the company's investor relations page to confirm the date."
	},
	{
		name: 'Is SPAC',
		id: 'isSpac',
		category: ['Company'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Exclude SPACs', value: 'No' },
			{ name: 'Show Only SPACs', value: 'Yes' }
		],
		format: 'string',
		tooltipTitle: 'Is SPAC / Blank Check',
		tooltipText:
			'Whether the stock is a Special Purpose Acquisition Company (SPAC), also known as a blank check company. This means that the business has no operations but plans to merge with a private company to take it public.'
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
		],
		format: 'date',
		tooltipTitle: 'Ex-Dividend Date',
		tooltipText: 'Only shareholders that buy the stock before the ex-dividend date will receive the dividend payment.'
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
		],
		format: 'date',
		tooltipTitle: 'Next Ex-Dividend Date',
		tooltipText:
			"The date of the stock's next ex-dividend date. Only shareholders that buy the stock before this date will receive the next dividend payment."
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
		],
		format: 'percentage',
		tooltipTitle: 'Return on Equity (ROE)',
		tooltipText:
			'Return on equity (ROE) is a profitability metric that shows how efficient a company is at using its equity (or "net" assets) to generate profits. It is calculated by dividing net income by the average shareholders\' equity over the past 12 months.',
		tooltipFormula: "ROE = (Net Income / Avg. Shareholders' Equity) * 100%",
		columnName: 'ROE'
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
		],
		format: 'percentage',
		tooltipTitle: 'Return on Assets (ROA)',
		tooltipText:
			'Return on assets (ROA) is a metric that measures how much profit a company is able to generate using its assets. It is calculated by dividing net income by the average total assets over the past 12 months.',
		tooltipFormula: 'ROA = (Net Income / Avg. Total Assets) * 100%',
		columnName: 'ROA'
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
		],
		format: 'percentage',
		tooltipTitle: 'Return on Capital (ROIC)',
		tooltipText:
			'Return on invested capital (ROIC) measures how effective a company is at investing its capital in order to increase profits. It is calculated by dividing the NOPAT (Net Operating Income After Tax) by the average invested capital in the previous year.',
		tooltipFormula: 'ROIC = (NOPAT / Average Invested Capital) * 100%',
		columnName: 'ROIC'
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
		],
		format: 'format0dec',
		tooltipTitle: 'Revenue Per Employee',
		tooltipText: 'The amount of revenue that the company generates per each employee.',
		tooltipFormula: 'Revenue Per Employee = Revenue / Employee Count'
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
		],
		format: 'format0dec',
		tooltipTitle: 'Profits Per Employee',
		tooltipText: 'The amount of net income generated per each employee.',
		tooltipFormula: 'Profits Per Employee = Net Income / Employee Count',
		columnName: 'Prof / Employee'
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
		],
		format: 'format2dec',
		tooltipText:
			"The asset turnover ratio measures the amount of sales relative to a company's assets. It indicates how efficiently the company uses its assets to generate revenue.",
		tooltipFormula: 'Asset Turnover Ratio = Revenue / Average Assets',
		columnName: 'Asset Turn.'
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
		],
		format: 'format2dec',
		tooltipTitle: 'Inventory Turnover',
		tooltipText:
			'The inventory turnover ratio measures how many times inventory has been sold and replaced during a time period.',
		tooltipFormula: 'Inventory Turnover Ratio = Cost of Revenue / Average Inventory',
		columnName: 'Inv. Turn.'
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
		],
		format: 'format2dec',
		tooltipText:
			"The current ratio is used to measure a company's short-term liquidity. A low number can indicate that a company will have trouble paying its upcoming liabilities.",
		tooltipFormula: 'Current Ratio = Current Assets / Current Liabilities'
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
		],
		format: 'format2dec',
		tooltipText:
			"The quick ratio measure a company's short-term liquidity. A low number indicates that the company may have trouble paying its upcoming financial obligations.",
		tooltipFormula: 'Quick Ratio = (Cash + Short-Term Investments + Accounts Receivable) / Current Liabilities'
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
		],
		format: 'format2dec',
		tooltipTitle: 'Debt / Equity Ratio',
		tooltipText:
			"The debt-to-equity ratio measures a company's debt levels relative to its shareholders' equity or book value. A high ratio implies that a company has a lot of debt.",
		tooltipFormula: "Debt / Equity Ratio = Total Debt / Shareholders' Equity"
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
		],
		format: 'format2dec',
		tooltipTitle: 'Debt / EBITDA Ratio',
		tooltipText:
			"The debt-to-EBITDA ratio is a company's debt levels relative to its trailing twelve-month EBITDA. A high ratio implies that debt is high relative to the company's earnings.",
		tooltipFormula: 'Debt / EBITDA Ratio = Total Debt / EBITDA (ttm)'
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
		],
		format: 'format2dec',
		tooltipTitle: 'Debt / FCF Ratio',
		tooltipText:
			"The debt-to-FCF ratio measures the debt levels relative to a company's free cash flow over the previous twelve months. If the ratio is high, it means that the company will need to spend a lot of the cash it generates on paying back debt.",
		tooltipFormula: 'Debt / FCF Ratio = Total Debt / Free Cash Flow (ttm)'
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
		],
		format: 'percentage',
		tooltipTitle: 'Effective Tax Rate',
		tooltipText: 'The effective tax rate is the percentage of taxable income paid in corporate income tax.',
		tooltipFormula: 'Effective Tax Rate = (Income Tax / Pretax Income) * 100%',
		columnName: 'Tax Rate'
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
		],
		format: 'percentage',
		tooltipTitle: 'Taxes / Revenue (%)',
		tooltipText: "Tax / revenue is the percentage of the company's revenue paid as corporate income tax.",
		tooltipFormula: 'Taxes / Revenue = (Income Tax / Revenue) * 100%'
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
		],
		format: 'abbreviate',
		tooltipTitle: "Shareholders' Equity",
		tooltipText:
			'Shareholders’ equity is also called book value or net worth. It can be seen as the amount of money held by investors inside the company. It is calculated by subtracting all liabilities from all assets.',
		tooltipFormula: "Shareholders' Equity = Total Assets - Total Liabilities",
		columnName: 'Equity'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Working capital is the amount of money available to a business to conduct its day-to-day operations. It is calculated by subtracting total current liabilities from total current assets.',
		tooltipFormula: 'Working Capital = Current Assets - Current Liabilities'
	},
	{
		name: 'Last Stock Split',
		id: 'lastSplitType',
		category: ['Other'],
		filterType: 'stringmatch',
		options: [
			{ name: 'Forward', value: 'Forward' },
			{ name: 'Reverse', value: 'Reverse' },
			{ name: 'Never', value: 'Never' }
		],
		format: 'align',
		columnName: 'Last Split'
	},
	{
		name: 'Last Split Date',
		id: 'lastSplitDate',
		category: ['Other'],
		filterType: 'date',
		options: [
			{ name: 'This Year', value: 'this-year' },
			{ name: 'Last Year', value: 'last-year' },
			{ name: 'Within 3 Years', value: 'under-3Y' },
			{ name: 'Within 5 Years', value: 'under-5Y' },
			{ name: 'Within 10 Years', value: 'under-10Y' }
		],
		format: 'date',
		tooltipText: 'The date when the company last performed a stock split.',
		columnName: 'Split Date'
	},
	{
		name: 'Altman Z-Score',
		id: 'zScore',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 10', value: 'over-10' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' },
			{ name: 'Under 1', value: 'under-1' }
		],
		format: 'format2dec',
		tooltipText:
			'The Altman Z-Score is a number based on a formula that can be used to predict the likelihood that a company will go into bankruptcy within two years.',
		columnName: 'Z-Score'
	},
	{
		name: 'Piotroski F-Score',
		id: 'fScore',
		category: ['Other'],
		filterType: 'numeric',
		options: [
			{ name: 'Exactly 9', value: 'exactly-9' },
			{ name: 'Exactly 8', value: 'exactly-8' },
			{ name: 'Over 7', value: 'over-7' },
			{ name: 'Over 5', value: 'over-5' },
			{ name: 'Under 5', value: 'under-5' },
			{ name: 'Under 3', value: 'under-3' }
		],
		format: 'format0dec',
		tooltipText:
			"The Piotroski F-Score is a score between 0 and 9 that determine the strength of a company's financial position. The higher, the better.",
		columnName: 'F-Score'
	},
	{
		name: 'In Index',
		id: 'inIndex',
		category: ['Popular'],
		filterType: 'arraymatch',
		options: [
			{ name: 'S&P500', value: 'S&P500' },
			{ name: 'Nasdaq 100', value: 'NASDAQ100' }
		],
		format: 'array',
		tooltipText: 'Whether the stock is part of a certain index or not.'
	}
]
