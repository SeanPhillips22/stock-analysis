import { FilterProps } from 'components/Screener/screener.types'
import { dateSort, priceSort } from 'components/Screener/functions/sort/sortFunctions'

export const IpoDataPoints: FilterProps[] = [
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
		],
		format: 'marketcap',
		tooltipTitle: 'Market Capitalization',
		tooltipText: "Market capitalization, or market cap, is the total value of all of a company's outstanding shares.",
		tooltipFormula: 'Market Cap = Shares Outstanding * Stock Price'
	},
	{
		name: 'Industry',
		id: 'industry',
		category: ['General'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		tooltipText:
			'The industry that the company is in, according to the Global Industry Classification Standard (GICS).'
	},
	{
		name: 'Sector',
		id: 'sector',
		category: ['General'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		format: 'padleft',
		tooltipText: 'The sector that the company is in, according to the Global Industry Classification Standard (GICS).'
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
		],
		format: 'date',
		sortType: dateSort,
		tooltipText:
			"The date of the company's Initial Public Offering (IPO), or when it originally starts trading on the stock exchange."
	},
	{
		name: 'Filing Date',
		id: 'filingDate',
		category: ['General'],
		filterType: 'date',
		options: [
			{ name: 'Past Week', value: 'past-7D' },
			{ name: 'Past Month', value: 'past-30D' },
			{ name: 'Past Year', value: 'past-1Y' }
		],
		format: 'date',
		sortType: dateSort,
		tooltipText:
			'The date when the company initially filed their S-1 documents to the SEC to initiate the initial public offering (IPO) process.'
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
		],
		format: 'align',
		sortType: priceSort,
		tooltipText:
			'The price of the shares during the IPO process. It usually starts as a range, but ends with a final number the day before or day of the IPO.'
	},
	{
		name: 'IPO Deal Size',
		id: 'ds',
		category: ['General'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 500M', value: 'over-500M' },
			{ name: 'Over 200M', value: 'over-200M' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 50M', value: 'over-50M' },
			{ name: 'Over 20M', value: 'over-20M' },
			{ name: 'Over 10M', value: 'over-10M' }
		],
		format: 'abbreviate',
		tooltipTitle: 'IPO Deal Size',
		tooltipText:
			'The total amount of money that will be raised during the IPO, calculated by multiplying the shares offered by the average IPO price per share.',
		tooltipFormula: 'IPO Deal Size = Shares Offered * IPO Price'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Revenue (ttm)',
		tooltipText:
			'Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.'
	},
	{
		name: 'Country',
		id: 'country',
		category: ['General'],
		filterType: 'multiselect',
		variable: true,
		options: [],
		tooltipText: 'The country that the company is from and/or has its primary headquarters.'
	},
	{
		name: 'Exchange',
		id: 'exchange',
		category: ['General'],
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
		],
		format: 'format0dec',
		tooltipText: "The company's last reported total number of employees."
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
		],
		format: 'align',
		tooltipText: 'The year that the company was originally founded in.'
	},
	{
		name: 'Is SPAC',
		id: 'isSpac',
		category: ['General'],
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
		name: 'Total Assets',
		id: 'assets',
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		],
		columnName: 'Assets',
		format: 'abbreviate',
		tooltipText:
			'Total assets is the sum of all current and non-current assets on the balance sheet. Assets are everything that the company owns.'
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
		category: ['Balance Sheet'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Not Zero', value: 'notzero' }
		],
		format: 'abbreviate',
		tooltipText:
			'Total debt is the total amount of liabilities categorized as "debt" on the balance sheet. It includes both current and long-term (non-current) debt.',
		tooltipFormula: 'Total Debt = Current Debt + Long-Term Debt'
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
		],
		columnName: 'Liabilities',
		format: 'abbreviate',
		tooltipText:
			'Total liabilities is the sum of all current and non-current liabilities on the balance sheet. Liabilities are everything that the company owes to others.'
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
		],
		columnName: 'Equity',
		format: 'abbreviate',
		tooltipTitle: "Shareholders' Equity",
		tooltipText:
			'Shareholders’ equity is also called book value or net worth. It can be seen as the amount of money held by investors inside the company. It is calculated by subtracting all liabilities from all assets.',
		tooltipFormula: "Shareholders' Equity = Total Assets - Total Liabilities"
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
		],
		format: 'abbreviate',
		tooltipText:
			'Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.',
		tooltipFormula: 'Gross Profit = Revenue - Cost of Revenue'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Operating Income',
		tooltipText:
			'Operating income is the amount of profit in a company after paying for all the expenses related to its core operations.',
		tooltipFormula: 'Operating Income = Revenue - Cost of Revenue - Operating Expenses'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		tooltipFormula: 'Net Income = Revenue - All Expenses'
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
		],
		format: 'format2dec',
		tooltipTitle: 'EPS (Diluted)',
		tooltipText:
			"Earnings per share (EPS) is the portion of a company's profit that is allocated to each individual stock. EPS is calculated by dividing net income by shares outstanding.",
		tooltipFormula: 'EPS = Net Income / Shares Outstanding'
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
		],
		format: 'abbreviate',
		tooltipText:
			'EBIT stands for "Earnings Before Interest and Taxes" and is a commonly used measure of earnings or profits. It is similar to operating income.',
		tooltipFormula: 'EBIT = Net Income + Interest + Taxes'
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
		],
		format: 'abbreviate',
		tooltipText:
			'EBITDA stands for "Earnings Before Interest, Taxes, Depreciation and Amortization." It is a commonly used measure of profitability.',
		tooltipFormula: 'EBITDA = Net Income + Interest + Taxes + Depreciation and Amortization'
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
		],
		columnName: 'Gross Mrg.',
		format: 'percentage',
		tooltipText:
			'Gross margin is the percentage of revenue left as gross profits, after subtracting cost of goods sold from the revenue.',
		tooltipFormula: 'Gross Margin = (Gross Profit / Revenue) * 100%'
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
		],
		columnName: 'Oper. Mrg.',
		format: 'percentage',
		tooltipText:
			'Operating margin is the percentage of revenue left as operating income, after subtracting cost of revenue and all operating expenses from the revenue.',
		tooltipFormula: 'Operating Margin = (Operating Income / Revenue) * 100%'
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
		],
		columnName: 'Profit Mrg.',
		format: 'percentage',
		tooltipText:
			'Profit margin is the percentage of revenue left as net income, or profits, after subtracting all costs and expenses from the revenue.',
		tooltipFormula: 'Profit Margin = (Net Income / Revenue) * 100%'
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
		],
		columnName: 'EBITDA Mrg.',
		format: 'percentage',
		tooltipText:
			'EBITDA margin is the percentage of revenue left as EBITDA, after subtracting all expenses except interest, taxes, depreciation and amortization from revenue.',
		tooltipFormula: 'EBITDA Margin = (EBITDA / Revenue) * 100%'
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
		],
		columnName: 'EBIT Mrg.',
		format: 'percentage',
		tooltipText:
			'EBIT Margin is a profitability ratio that measures the percentage of revenue left as EBIT (Earnings Before Interest and Taxes).',
		tooltipFormula: 'EBIT Margin = (EBIT / Revenue) * 100%'
	},
	{
		name: 'Op. Cash Flow',
		id: 'operatingCF',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 1B', value: 'over-1B' },
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		],
		format: 'abbreviate',
		tooltipTitle: 'Operating Cash Flow',
		tooltipText:
			'Operating cash flow, also called cash flow from operating activities, measures the amount of cash that a company generates from normal business activities. It is the amount of cash left after all cash income has been received, and all cash expenses have been paid.'
	},
	{
		name: 'Inv. Cash Flow',
		id: 'investingCF',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		],
		columnName: 'Investing CF',
		format: 'abbreviate',
		tooltipTitle: 'Investing Cash Flow',
		tooltipText:
			'Investing cash flow, also called cash flow from investing activities, is the cash used to buy and sell investments and long-term assets. Capital expenditures are included in this category.'
	},
	{
		name: 'Fin. Cash Flow',
		id: 'financingCF',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		],
		columnName: 'Financing CF',
		format: 'abbreviate',
		tooltipTitle: 'Financing Cash Flow',
		tooltipText:
			'Financing cash flow, also called cash flow from financing activities, is the cash that flows to and from owners, investors, and creditors (like banks). It includes changes in debt and equity, along with dividends and share buybacks.'
	},
	{
		name: 'Net Cash Flow',
		id: 'netCF',
		category: ['Cash Flow'],
		filterType: 'numeric',
		options: [
			{ name: 'Over 100M', value: 'over-100M' },
			{ name: 'Over 10M', value: 'over-10M' },
			{ name: 'Over 1M', value: 'over-1M' },
			{ name: 'Over Zero', value: 'over-0' },
			{ name: 'Under Zero', value: 'under-0' }
		],
		columnName: 'Net CF',
		format: 'abbreviate',
		tooltipText:
			'Net cash flow is the sum of operating, investing and financing cash flows. It is equal to the changes in cash and cash equivalents on the balance sheet.'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Capital Expenditures',
		tooltipText:
			'Capital Expenditures (CapEx) is the cash spent on acquiring long-term assets that will be used to run the business. It is often called "payments for property, plants and equipment."'
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
		],
		format: 'abbreviate',
		tooltipText:
			'Free cash flow is the cash remaining after the company spends on everything required to maintain and grow the business. It is calculated by subtracting capital expenditures from operating cash flow.',
		tooltipFormula: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures'
	},
	{
		name: 'FCF / Share',
		id: 'fcfPerShare',
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
		],
		format: 'format2dec',
		tooltipTitle: 'Free Cash Flow Per Share',
		tooltipText: 'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.',
		tooltipFormula: 'FCF Per Share = Free Cash Flow / Shares Outstanding'
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
		],
		columnName: 'FCF Mrg.',
		format: 'percentage',
		tooltipTitle: 'Free Cash Flow Margin',
		tooltipText:
			'FCF margin is the percentage of revenue left as free cash flow. FCF is calculated by subtracting capital expenditures (CapEx) from the operating cash flow (OCF). Both CapEx and OCF are shown on the cash flow statement.',
		tooltipFormula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%'
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
		],
		format: 'abbreviate',
		tooltipTitle: 'Shares Outstanding',
		tooltipText: "The total amount of outstanding common stock currently held by all of the company's shareholders."
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
		],
		tooltipText: 'The total amount of shares that are being offered for sale during the IPO.'
	}
]
