// All possible data points
export type DataId =
	/**
	 * Symbol and name always included
	 */
	| 's' // Symbol
	| 'n' // Name
	/**
	 * Quotes - regular trading hours
	 */
	| 'price' // Stock Price
	| 'chg' // Stock Price Change
	| 'change' // Price Change 1D
	| 'volume' // Volume
	| 'close' // Previous Close
	/**
	 * Quotes - premarket
	 */
	| 'premarketPrice' // Pre-Market Price
	| 'premarketChange' // Pre-Market Change
	| 'premarketChangePercent' // Pre-Market Percentage Change
	/**
	 * IPO Details
	 */
	| 'ipoDate' // IPO Date
	| 'ipoStatus' // IPO Date
	| 'filingDate' // Filing Date
	| 'filingDateFB' // Filing Date (with n/a fallback)
	| 'withdrawnDate' // Withdrawn Date
	| 'withdrawnDateFB' // Withdrawn Date (with n/a fallback)
	| 'ipp' // IPO Price
	| 'ippc' // IPO Price
	| 'ipr' // IPO Return
	| 'ds' // IPO Deal Size
	| 'fop' // First open price
	| 'iprfo' // Return from first open price
	| 'sharesOffered' // Shares Offered
	| 'ipoPriceRange' // IPO Price Range
	/**
	 *
	 */
	| 'marketCap' // Market Cap
	| 'enterpriseValue' // Enterprise Value
	| 'industry' // Industry
	| 'peRatio' // PE Ratio
	| 'peForward' // Forward PE
	| 'exchange' // Exchange
	| 'dividendYield' // Dividend Yield
	| 'sector' // Sector
	| 'ch1w' // Price Change 1W
	| 'ch1m' // Price Change 1M
	| 'ch6m' // Price Change 6M
	| 'chYTD' // Price Change YTD
	| 'ch1y' // Price Change 1Y
	| 'ch3y' // Price Change 3Y
	| 'ch5y' // Price Change 5Y
	/**
	 * Forecasts
	 */
	| 'analystRatings' // Analyst Rating
	| 'analystCount' // Analyst Count
	| 'priceTarget' // Price Target
	| 'priceTargetChange' // Price Target (%)
	| 'epsThisQuarter' // EPS growth this quarter
	| 'epsNextQuarter' // EPS growth next quarter
	| 'epsThisYear' // EPS growth this year
	| 'epsNextYear' // EPS growth next year
	| 'revenueThisQuarter' // Revenue growth this quarter
	| 'revenueNextQuarter' // Revenue growth next quarter
	| 'revenueThisYear' // Revenue growth this year
	| 'revenueNextYear' // Revenue growth next year
	| 'eps5y' // EPS growth 5Y
	| 'revenue5y' // Revenue growth 5Y
	| 'country' // Country
	| 'employees' // Employees
	| 'founded' // Founded
	| 'inIndex' // In index (S&P500 or Nasdaq 100)
	| 'revenue' // Revenue
	| 'revenueGrowth' // Revenue Growth
	| 'revenueGrowthQ' // Revenue Growth (Quarterly)
	| 'grossProfit' // Gross Profit
	| 'grossProfitGrowth' // Gross Profit Growth
	| 'operatingIncome' // Op. Income
	| 'operatingIncomeGrowth' // Op. Income Growth
	| 'netIncome' // Net Income
	| 'netIncomeGrowth' // Net Inc. Growth
	| 'eps' // EPS
	| 'epsGrowth' // EPS Growth
	| 'ebit' // EBIT
	| 'ebitda' // EBITDA
	| 'operatingCF' // Op. Cash Flow
	| 'investingCF' // Investing Cash Flow
	| 'financingCF' // Cash Flow From Financing
	| 'netCF' // Net Cash Flow
	| 'capex' // Capital expenditures
	| 'fcf' // Free Cash Flow
	| 'fcfGrowth' // FCF Growth
	| 'fcfPerShare' // FCF / Share
	| 'assets' // Assets
	| 'cash' // Total Cash
	| 'liabilities' // Liabilities
	| 'debt' // Total Debt
	| 'netCash' // Net Cash / Debt
	| 'netCashGrowth' // Net Cash Growth
	| 'netCashByMarketCap' // Net Cash / Market Cap
	| 'grossMargin' // Gross Margin
	| 'operatingMargin' // Operating Margin
	| 'profitMargin' // Profit Margin
	| 'fcfMargin' // FCF Margin
	| 'ebitdaMargin' // EBITDA Margin
	| 'ebitMargin' // EBIT Margin
	| 'psRatio' // PS Ratio
	| 'pbRatio' // PB Ratio
	| 'pFcfRatio' // P/FCF Ratio
	| 'pegRatio' // PEG Ratio
	| 'evSales' // EV/Sales
	| 'evEarnings' // EV/Earnings
	| 'evEbitda' // EV/EBITDA
	| 'evEbit' // EV/EBIT
	| 'evFcf' // EV/FCF
	| 'earningsYield' // Earnings Yield
	| 'fcfYield' // FCF Yield
	| 'dps' // Dividend ($)
	| 'dividendGrowth' // Div. Growth
	| 'payoutRatio' // Payout Ratio
	| 'payoutFrequency' // Payout Frequency
	| 'buybackYield' // Buyback Yield
	| 'totalReturn' // Total Return
	| 'averageVolume' // Average Volume
	| 'beta' // Beta (1Y)
	| 'shortFloat' // Short % Float
	| 'shortShares' // Short % Shares
	| 'shortRatio' // Short Ratio
	| 'sharesOut' // Shares Out
	| 'float' // Float
	| 'sharesYoY' // Shares Ch. (YoY)
	| 'sharesQoQ' // Shares Ch. (QoQ)
	| 'sharesInsiders' // Shares Insiders
	| 'sharesInstitutions' // Shares Institut.
	| 'earningsDate' // Earnings Date
	| 'exDivDate' // Ex-Div Date
	| 'nextDivDate' // Next Ex-Div
	| 'roe' // Return on Equity
	| 'roa' // Return on Assets
	| 'roic' // Return on Capital
	| 'roe5y' // Return on Equity (5-year average)
	| 'roa5y' // Return on Assets (5-year average)
	| 'roic5y' // Return on Capital (5-year average)
	| 'revPerEmployee' // Rev / Employee
	| 'profitPerEmployee' // Prof. / Employee
	| 'assetTurnover' // Asset Turnover
	| 'inventoryTurnover' // Inv. Turnover
	| 'currentRatio' // Current Ratio
	| 'quickRatio' // Quick Ratio
	| 'debtEquity' // Debt / Equity
	| 'debtEbitda' // Debt / EBITDA
	| 'debtFcf' // Debt / FCF
	| 'taxRate' // Eff. Tax Rate
	| 'taxByRevenue' // Tax / Revenue
	| 'equity' // Shareh. Equity
	| 'workingCapital' // Working Capital
	| 'lastSplitType' // Last Stock Split
	| 'lastSplitDate' // Last Split Date
	| 'views' // Pageviews via Google Analytics
	| 'isSpac' // Is SPAC
	| 'zScore' // Altman Z-Score
	| 'fScore' // Piotroski F-Score
	| 'aum' // ETF assets
	| 'etfPeRatio' // ETF PE Ratio
	| 'assetClass' // ETF Asset Class
	| 'expenseRatio' // ETF Expense Ratio
	| 'holdings' // ETF Holdings
	| 'inceptionDate' // ETF Inception Date
	| 'etfSector' // ETF Sector
	| 'etfRegion' // ETF Geographic Region
	| 'issuer' // ETF Geographic Region
	| 'etfIndex' // Index tracked by the ETF
	| 'rank' // The number of the table row
	| 'tags' // Tags applied to the stock or ETF
