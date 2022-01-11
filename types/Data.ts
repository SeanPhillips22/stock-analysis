// All possible data points
export type DataId =
	| 's' // Symbol
	| 'n' // Name
	| 'marketCap' // Market Cap
	| 'price' // Stock Price
	| 'change' // Price Change 1D
	| 'volume' // Volume
	| 'enterpriseValue' // Enterprise Value
	| 'industry' // Industry
	| 'peRatio' // PE Ratio
	| 'peForward' // Forward PE
	| 'exchange' // Exchange
	| 'dividendYield' // Dividend Yield
	| 'sector' // Sector
	| 'ch1m' // Price Change 1M
	| 'ch6m' // Price Change 6M
	| 'chYTD' // Price Change YTD
	| 'ch1y' // Price Change 1Y
	| 'ch3y' // Price Change 3Y
	| 'ch5y' // Price Change 5Y
	| 'analystRatings' // Analyst Rating
	| 'analystCount' // Analyst Count
	| 'priceTarget' // Price Target
	| 'priceTargetChange' // Price Target (%)
	| 'country' // Country
	| 'employees' // Employees
	| 'founded' // Founded
	| 'ipoDate' // IPO Date
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
	| 'liabilities' // Liabilities
	| 'ipoPriceRange' // IPO Price Range
	| 'isSpac' // Is SPAC
	| 'sharesOffered' // Shares Offered
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
