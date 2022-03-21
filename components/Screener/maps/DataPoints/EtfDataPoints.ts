import { FilterProps } from 'components/Screener/screener.types'
import { stringNullFix, numberNullFix } from 'components/Screener/functions/sort/sortFunctions'

export const EtfDataPoints: FilterProps[] = [
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
		name: 'Assets',
		id: 'aum',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 100B',
				value: 'over-100B'
			},
			{
				name: 'Over 10B',
				value: 'over-10B'
			},
			{
				name: 'Over 1B',
				value: 'over-1B'
			},
			{
				name: 'Over 100M',
				value: 'over-100M'
			},
			{
				name: 'Over 10M',
				value: 'over-10M'
			},
			{
				name: 'Over 1M',
				value: 'over-1M'
			},
			{
				name: 'Not Zero',
				value: 'notzero'
			}
		],
		format: 'marketcap',
		tooltipTitle: 'Assets Under Management',
		tooltipText: 'Assets under management (AUM) is the total value of all assets held by the exchange-traded fund.'
	},
	{
		name: 'Stock Price',
		id: 'price',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 100',
				value: 'over-100'
			},
			{
				name: 'Over 10',
				value: 'over-10'
			},
			{
				name: 'Over 5',
				value: 'over-5'
			},
			{
				name: 'Over 1',
				value: 'over-1'
			},
			{
				name: 'From 100-500',
				value: 'between-100-500'
			},
			{
				name: 'From 50-100',
				value: 'between-50-100'
			},
			{
				name: 'From 20-50',
				value: 'between-20-50'
			},
			{
				name: 'From 10-20',
				value: 'between-10-20'
			},
			{
				name: 'Under 20',
				value: 'under-20'
			},
			{
				name: 'Under 10',
				value: 'under-10'
			},
			{
				name: 'Under 5',
				value: 'under-5'
			},
			{
				name: 'Under 1',
				value: 'under-1'
			}
		],
		columnName: 'Price',
		format: 'amount',
		tooltipText: 'The stock price is the current price of a single share, in US dollars.'
	},
	{
		name: 'Price Change 1D',
		id: 'change',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			}
		],
		columnName: '% Change',
		format: 'changePcColor',
		tooltipTitle: 'Price Change (1D)',
		tooltipText: 'The percentage change in the stock price on the current or latest trading day.'
	},
	{
		name: 'Volume',
		id: 'volume',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 10M',
				value: 'over-10M'
			},
			{
				name: 'Over 1M',
				value: 'over-1M'
			},
			{
				name: 'Over 100K',
				value: 'over-100K'
			},
			{
				name: 'Over 10K',
				value: 'over-10K'
			},
			{
				name: 'Over 1K',
				value: 'over-1K'
			},
			{
				name: 'Not Zero',
				value: 'notzero'
			},
			{
				name: 'Under 1K',
				value: 'under-1K'
			},
			{
				name: 'Under 10K',
				value: 'under-10K'
			},
			{
				name: 'Under 100K',
				value: 'under-100K'
			},
			{
				name: 'Under 1M',
				value: 'under-1M'
			},
			{
				name: 'Under 10M',
				value: 'under-10M'
			},
			{
				name: 'Under 100M',
				value: 'under-100M'
			}
		],
		format: 'format0dec',
		tooltipTitle: 'Current Volume',
		tooltipText: 'The number of shares traded during the current or latest trading day.'
	},
	{
		name: 'Expense Ratio',
		id: 'expenseRatio',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 2%',
				value: 'over-2'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'Under 1%',
				value: 'under-1'
			},
			{
				name: 'Under 0.5%',
				value: 'under-0.5'
			},
			{
				name: 'Under 0.3%',
				value: 'under-0.3'
			},
			{
				name: 'Under 0.2%',
				value: 'under-0.2'
			},
			{
				name: 'Under 0.1%',
				value: 'under-0.1'
			},
			{
				name: 'Under 0.05%',
				value: 'under-0.05'
			}
		],
		format: 'format2dec',
		tooltipText:
			"Expense ratio is the percentage of the fund's assets that are charged as expenses by the company that issues the fund. The lower the expense ratio, the better."
	},
	{
		name: 'Asset Class',
		id: 'assetClass',
		category: ['Popular'],
		filterType: 'multiselect',
		options: [
			{
				name: 'Alternative',
				value: 'Alternative'
			},
			{
				name: 'Commodity',
				value: 'Commodity'
			},
			{
				name: 'Currency',
				value: 'Currency'
			},
			{
				name: 'Equity',
				value: 'Equity'
			},
			{
				name: 'Fixed Income',
				value: 'Fixed Income'
			},
			{
				name: 'Portfolio-Multi Asset',
				value: 'Portfolio-Multi Asset'
			}
		],
		format: 'string',
		sortType: stringNullFix,
		tooltipText:
			'Assets class is the type of asset that the fund primarily holds. For example, ETFs with the "Equity" asset class mostly hold stocks.'
	},
	{
		name: 'Holdings',
		id: 'holdings',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 5000',
				value: 'over-5000'
			},
			{
				name: 'Over 1000',
				value: 'over-1000'
			},
			{
				name: 'Over 500',
				value: 'over-500'
			},
			{
				name: 'Over 100',
				value: 'over-100'
			},
			{
				name: 'Over 10',
				value: 'over-10'
			},
			{
				name: 'Over 5',
				value: 'over-5'
			},
			{
				name: 'Over 1',
				value: 'over-1'
			},
			{
				name: 'From 500-1000',
				value: 'between-500-1000'
			},
			{
				name: 'From 100-500',
				value: 'between-100-500'
			},
			{
				name: 'From 50-100',
				value: 'between-50-100'
			},
			{
				name: 'From 20-50',
				value: 'between-20-50'
			},
			{
				name: 'From 10-20',
				value: 'between-10-20'
			},
			{
				name: 'Under 20',
				value: 'under-20'
			},
			{
				name: 'Under 10',
				value: 'under-10'
			},
			{
				name: 'Under 5',
				value: 'under-5'
			},
			{
				name: 'Under 1',
				value: 'under-1'
			}
		],
		format: 'format0dec',
		sortInverted: 'true',
		tooltipTitle: 'ETF Holdings',
		tooltipText: 'The number of individual securities that the fund holds.'
	},
	{
		name: 'Sector',
		id: 'etfSector',
		category: ['Popular', 'Company'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'padleft',
		sortType: stringNullFix,
		tooltipTitle: 'ETF Sector',
		tooltipText: 'The sector or category that the ETF primarily invests in.'
	},
	{
		name: 'Issuer',
		id: 'issuer',
		category: ['Popular'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'string',
		sortType: stringNullFix,
		tooltipTitle: 'ETF Issuer',
		tooltipText: 'The company or organization that manages the exchange-traded fund.'
	},
	{
		name: 'Index',
		id: 'etfIndex',
		category: ['Popular'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'string',
		sortType: stringNullFix,
		tooltipTitle: 'ETF Index',
		tooltipText:
			'Many ETFs are designed to track the performance of an index. Examples include the S&P500 or the Nasdaq-100.'
	},
	{
		name: 'Inception Date',
		id: 'inceptionDate',
		category: ['Popular'],
		filterType: 'date',
		options: [
			{
				name: 'Past Month',
				value: 'under-1M'
			},
			{
				name: 'Past 3 Months',
				value: 'under-3M'
			},
			{
				name: 'Past 6 Months',
				value: 'under-6M'
			},
			{
				name: 'Past 12 Months',
				value: 'under-12M',
				div: true
			},
			{
				name: 'This Year',
				value: 'this-year'
			},
			{
				name: 'Last Year',
				value: 'last-year',
				div: true
			},
			{
				name: 'Within 3 Years',
				value: 'under-3Y'
			},
			{
				name: 'Within 5 Years',
				value: 'under-5Y'
			},
			{
				name: 'Within 10 Years',
				value: 'under-10Y'
			},
			{
				name: 'Within 20 Years',
				value: 'under-20Y',
				div: true
			},
			{
				name: 'Over 1 Years Ago',
				value: 'over-1Y'
			},
			{
				name: 'Over 3 Years Ago',
				value: 'over-3Y'
			},
			{
				name: 'Over 5 Years Ago',
				value: 'over-5Y'
			},
			{
				name: 'Over 10 Years Ago',
				value: 'over-10Y'
			},
			{
				name: 'Over 20 Years Ago',
				value: 'over-20Y'
			}
		],
		format: 'date',
		tooltipText:
			'The inception date is the date that the exchange-traded fund (ETF) was launched and able to be traded on a stock exchange.'
	},
	{
		name: 'PE Ratio',
		id: 'etfPeRatio',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 50',
				value: 'over-50'
			},
			{
				name: 'From 30-50',
				value: 'between-30-50'
			},
			{
				name: 'From 20-30',
				value: 'between-20-30'
			},
			{
				name: 'From 15-20',
				value: 'between-15-20'
			},
			{
				name: 'From 10-15',
				value: 'between-10-15'
			},
			{
				name: 'Under 20',
				value: 'under-20'
			},
			{
				name: 'Under 10',
				value: 'under-10'
			},
			{
				name: 'Under 5',
				value: 'under-5'
			}
		],
		format: 'format2dec',
		sortType: numberNullFix,
		tooltipText: 'The average price-to-earnings (PE) ratio of the assets held by the fund.'
	},
	{
		name: 'Beta (1Y)',
		id: 'beta',
		category: ['Performance'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 4',
				value: 'over-4'
			},
			{
				name: 'Over 3',
				value: 'over-3'
			},
			{
				name: 'Over 2',
				value: 'over-2'
			},
			{
				name: 'Over 1',
				value: 'over-1'
			},
			{
				name: 'Under 1',
				value: 'under-1'
			},
			{
				name: 'Under 0.8',
				value: 'under-0.8'
			},
			{
				name: 'Under 0.5',
				value: 'under-0.5'
			},
			{
				name: 'Under 0.2',
				value: 'under-0.2'
			},
			{
				name: 'Under 0',
				value: 'under-0'
			},
			{
				name: 'Under -0.2',
				value: 'under-X0.2'
			},
			{
				name: 'Under -0.5',
				value: 'under-X0.5'
			},
			{
				name: 'Under -0.8',
				value: 'under-X0.8'
			},
			{
				name: 'Under -1',
				value: 'under-X1'
			},
			{
				name: 'Under -1.5',
				value: 'under-X1.5'
			},
			{
				name: 'Under -2',
				value: 'under-X2'
			},
			{
				name: 'Under -3',
				value: 'under-X3'
			}
		],
		columnName: 'Beta',
		format: 'format2dec',
		tooltipText:
			'Beta measures the price volatility of a stock in comparison to the overall stock market. A value over 1 indicates higher volatility, while a value under 1 indicates lower volatility.'
	},
	{
		name: 'Dividend ($)',
		id: 'dps',
		category: ['Dividends'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 10',
				value: 'over-10'
			},
			{
				name: 'Over 5',
				value: 'over-5'
			},
			{
				name: 'Over 3',
				value: 'over-3'
			},
			{
				name: 'Over 2',
				value: 'over-2'
			},
			{
				name: 'Over 1',
				value: 'over-1'
			},
			{
				name: 'Not Zero',
				value: 'notzero'
			}
		],
		columnName: 'Dividend',
		format: 'format2dec',
		tooltipTitle: 'Dividend Per Share',
		tooltipText: 'Total amount paid to each outstanding share in dividends during the last 12 months.'
	},
	{
		name: 'Dividend Yield',
		id: 'dividendYield',
		category: ['Popular', 'Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 3%',
				value: 'over-3'
			},
			{
				name: 'Over 2%',
				value: 'over-2'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: '2-3%',
				value: 'between-2-3'
			},
			{
				name: '1-2%',
				value: 'between-1-2'
			},
			{
				name: '0-1%',
				value: 'between-0-1'
			},
			{
				name: 'Not Zero',
				value: 'notzero'
			}
		],
		columnName: 'Yield (%)',
		format: 'percentage',
		tooltipText:
			'The dividend yield is how much a stock pays in dividends each year, as a percentage of the stock price.',
		tooltipFormula: 'Dividend Yield = (Annual Dividends Per Share / Stock Price) * 100%'
	},
	{
		name: 'Div. Growth',
		id: 'dividendGrowth',
		category: ['Dividends'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 3%',
				value: 'over-3'
			},
			{
				name: 'Over 2%',
				value: 'over-2'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'Over Zero',
				value: 'over-0'
			}
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
			{
				name: 'Over 100%',
				value: 'over-100'
			},
			{
				name: 'Under 100%',
				value: 'under-100'
			},
			{
				name: 'Under 90%',
				value: 'under-90'
			},
			{
				name: 'Under 80%',
				value: 'under-80'
			},
			{
				name: 'Under 70%',
				value: 'under-70'
			},
			{
				name: 'Under 60%',
				value: 'under-60'
			},
			{
				name: 'Under 50%',
				value: 'under-50'
			},
			{
				name: 'Under 40%',
				value: 'under-40'
			},
			{
				name: 'Under 30%',
				value: 'under-30'
			},
			{
				name: 'Under 20%',
				value: 'under-20'
			},
			{
				name: 'Under 10%',
				value: 'under-10'
			}
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
			{
				name: 'Weekly',
				value: 'Weekly'
			},
			{
				name: 'Monthly',
				value: 'Monthly'
			},
			{
				name: 'Quarterly',
				value: 'Quarterly'
			},
			{
				name: 'Semi-Annual',
				value: 'Semi-Annual'
			},
			{
				name: 'Annual',
				value: 'Annual'
			}
		],
		format: 'align',
		tooltipTitle: 'Payout Frequency',
		tooltipText:
			'Payout frequency is the schedule at which the dividends are paid. For example, a "Quarterly" payout ratio implies that dividends are paid every three months.'
	},
	{
		name: 'Ex-Div Date',
		id: 'exDivDate',
		category: ['Dividends'],
		filterType: 'date',
		options: [
			{
				name: 'Today',
				value: 'today'
			},
			{
				name: 'Yesterday',
				value: 'yesterday'
			},
			{
				name: 'Past Week',
				value: 'under-7D'
			},
			{
				name: 'Past Month',
				value: 'under-1M'
			},
			{
				name: 'Past 3 Months',
				value: 'under-3M'
			},
			{
				name: 'Past 6 Months',
				value: 'under-6M'
			},
			{
				name: 'Past 12 Months',
				value: 'under-12M',
				div: true
			}
		],
		format: 'date',
		tooltipTitle: 'Ex-Dividend Date',
		tooltipText: 'Only those who own shares before the ex-dividend date will receive the payment.'
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['Popular'],
		filterType: 'stringmatch',
		options: [
			{
				name: 'BATS',
				value: 'BATS'
			},
			{
				name: 'NASDAQ',
				value: 'NASDAQ'
			},
			{
				name: 'NYSEARCA',
				value: 'NYSEARCA'
			}
		],
		tooltipTitle: 'Stock Exchange',
		tooltipText: 'The stock exchange that the ETF shares are listed on.'
	},
	{
		name: 'Region',
		id: 'etfRegion',
		category: ['Popular'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'string',
		sortType: stringNullFix,
		tooltipTitle: 'ETF Region',
		tooltipText: 'The geographic region that the ETF primarily invests in.'
	},
	{
		name: 'Shares Out',
		id: 'sharesOut',
		category: ['Popular'],
		filterType: 'numeric',
		options: [
			{
				name: 'Over 1B',
				value: 'over-1B'
			},
			{
				name: 'Over 100M',
				value: 'over-100M'
			},
			{
				name: 'Over 50M',
				value: 'over-50M'
			},
			{
				name: 'Over 10M',
				value: 'over-10M'
			},
			{
				name: 'Over 1M',
				value: 'over-1M'
			},
			{
				name: 'Not Zero',
				value: 'notzero'
			},
			{
				name: 'Under 1M',
				value: 'under-1M'
			},
			{
				name: 'Under 10M',
				value: 'under-10M'
			},
			{
				name: 'Under 50M',
				value: 'under-50M'
			},
			{
				name: 'Under 100M',
				value: 'under-100M'
			}
		],
		format: 'abbreviate',
		tooltipTitle: 'Shares Outstanding',
		tooltipText: 'The total number of outstanding ETF shares that been issued.'
	},
	{
		name: 'Price Change 1M',
		id: 'ch1m',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			}
		],
		columnName: 'Chg. 1M',
		format: 'changePcColor',
		tooltipTitle: '1-Month Price Change',
		tooltipText: 'The percentage change in the stock price compared to 1 month ago.'
	},
	{
		name: 'Price Change 6M',
		id: 'ch6m',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 50%',
				value: 'over-50'
			},
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			},
			{
				name: 'Under -50%',
				value: 'under-X50'
			}
		],
		columnName: 'Chg. 6M',
		format: 'changePcColor',
		tooltipTitle: '6-Month Price Change',
		tooltipText: 'The percentage change in the stock price compared to 6 months ago.'
	},
	{
		name: 'Price Change YTD',
		id: 'chYTD',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 50%',
				value: 'over-50'
			},
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			},
			{
				name: 'Under -50%',
				value: 'under-X50'
			}
		],
		columnName: 'Chg. YTD',
		format: 'changePcColor',
		tooltipTitle: 'Year-to-Date Price Change',
		tooltipText: 'The percentage change in the stock price since January 1st of the current year.'
	},
	{
		name: 'Price Change 1Y',
		id: 'ch1y',
		category: ['Popular', 'Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 50%',
				value: 'over-50'
			},
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			},
			{
				name: 'Under -50%',
				value: 'under-X50'
			}
		],
		columnName: 'Chg. 1Y',
		format: 'changePcColor',
		tooltipTitle: '1-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 1 year ago.'
	},
	{
		name: 'Price Change 3Y',
		id: 'ch3y',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 200%',
				value: 'over-200'
			},
			{
				name: 'Over 100%',
				value: 'over-100'
			},
			{
				name: 'Over 50%',
				value: 'over-50'
			},
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			},
			{
				name: 'Under -50%',
				value: 'under-X50'
			},
			{
				name: 'Under -90%',
				value: 'under-X90'
			}
		],
		columnName: 'Chg. 3Y',
		format: 'changePcColor',
		tooltipTitle: '3-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 3 years ago.'
	},
	{
		name: 'Price Change 5Y',
		id: 'ch5y',
		category: ['Performance'],
		filterType: 'numeric',
		numberType: 'percentage',
		options: [
			{
				name: 'Over 300%',
				value: 'over-300'
			},
			{
				name: 'Over 200%',
				value: 'over-200'
			},
			{
				name: 'Over 100%',
				value: 'over-100'
			},
			{
				name: 'Over 50%',
				value: 'over-50'
			},
			{
				name: 'Over 20%',
				value: 'over-20'
			},
			{
				name: 'Over 10%',
				value: 'over-10'
			},
			{
				name: 'Over 5%',
				value: 'over-5'
			},
			{
				name: 'Over 1%',
				value: 'over-1'
			},
			{
				name: 'From 0-1%',
				value: 'between-0-1'
			},
			{
				name: 'From -1-0%',
				value: 'between-X1-0'
			},
			{
				name: 'Under -1%',
				value: 'under-X1'
			},
			{
				name: 'Under -5%',
				value: 'under-X5'
			},
			{
				name: 'Under -10%',
				value: 'under-X10'
			},
			{
				name: 'Under -20%',
				value: 'under-X20'
			},
			{
				name: 'Under -50%',
				value: 'under-X50'
			},
			{
				name: 'Under -90%',
				value: 'under-X90'
			}
		],
		columnName: 'Chg. 5Y',
		format: 'changePcColor',
		tooltipTitle: '5-Year Price Change',
		tooltipText: 'The percentage change in the stock price compared to 5 years ago.'
	}
]
