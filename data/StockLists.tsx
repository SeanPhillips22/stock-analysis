import { TableDynamic, TableFixed } from 'components/StockTable/TableTypes'
import { PageConfig } from 'types/PageConfig'

type StockList = {
	page: PageConfig
	fixed: TableFixed
	query: TableDynamic
	etfQuery?: TableDynamic
	relatedLists?: { name: string; url: string }[]
}

export function getStockList(id: string) {
	// Get the stock list
	const list = StockLists[id] || null

	// If list ID does not exist, throw an error
	if (!list) {
		throw new Error(`StockList ${id} not found`)
	}

	// Set some default data points
	let main = list.query.main || 'marketCap'
	let columns =
		list.query.columns ||
		(main === 'marketCap'
			? ['rank', 's', 'n', 'marketCap', 'price', 'change']
			: ['rank', 's', 'n', main, 'price', 'change', 'marketCap'])

	// Create an empty object to populate
	let config: any = {}

	// Return the configs for the stock list
	config.page = {
		path: `/list/${id}/`,
		metaTitle: list.page.metaTitle,
		metaDescription: list.page.metaDescription || null,
		pageDescription: list.page.pageDescription || null,
		disclaimer: list.page.disclaimer || null,
		pageTitle: list.page.pageTitle || list.page.metaTitle,
		tableTitleObject: list.page.tableTitleObject || ' Stocks',
		headingType: 'div',
		noindex: list.page.noindex || null
	}

	config.fixed = {
		defaultSort: list.fixed?.defaultSort || [{ id: main, desc: true }],
		fixedColumns: list.fixed?.fixedColumns || ['rank', 's', main]
	}

	config.query = {
		index: list.query.index || 'allstocks',
		main: main,
		count: list.query.count || null,
		sort: list.query.sort || [{ id: main, desc: true }],
		sortDirection: list.query.sortDirection || 'desc',
		columns: columns,
		filters: list.query.filters || []
	}

	// If the stock list has an ETF list, add the configs for it
	if (list.etfQuery) {
		config.etfQuery = {
			index: list.etfQuery?.index || 'etf',
			main: list.etfQuery?.main || 'aum',
			count: list.etfQuery?.count || null,
			sort: list.etfQuery?.sort || [{ id: list.etfQuery?.main || 'aum', desc: true }],
			sortDirection: list.etfQuery?.sortDirection || 'desc',
			columns: list.etfQuery?.columns || ['rank', 's', 'n', 'price', 'change', 'aum'],
			filters: list.etfQuery?.filters || list.query.filters || []
		}
	}

	// If related lists are set, add them
	if (list.relatedLists) {
		config.relatedLists = list.relatedLists
	}

	return config as StockList
}

type StockListConfig = {
	[key: string]: {
		page: Partial<PageConfig>
		fixed?: TableFixed
		query: Partial<TableDynamic>
		etfQuery?: Partial<TableDynamic>
		relatedLists?: { name: string; url: string }[]
	}
}

export const StockLists: StockListConfig = {
	'biggest-us-companies': {
		page: {
			metaTitle: '500 Biggest U.S. Companies by Market Cap',
			metaDescription:
				'A list of the 500 biggest U.S. companies ranked by market cap, updated daily. This list includes public companies based in the United States of America',
			pageTitle: 'Biggest U.S. Companies by Market Cap',
			pageDescription:
				'A list of the 500 biggest U.S. companies ranked by market capitalization, updated daily. The list includes companies based in the United States of America that can be traded on the stock exchange. It does not include private companies.',
			tableTitleObject: 'Companies'
		},
		query: {
			index: 'stocks',
			count: 500,
			filters: ['country-is-United%States']
		}
	},
	'top-rated-dividend-stocks': {
		page: {
			metaTitle: 'List of Dividend Stocks Rated as "Buy" or "Strong Buy"',
			metaDescription:
				'A list of dividend-paying stocks that have an average rating of "buy" or "strong buy" according to stock analysts.',
			pageDescription:
				'This list shows the top rated dividend stocks according to stock analysts. Each stock on the list has an average "buy" or "strong buy" rating from at least 20 analysts. Each stock also has a dividend yield of at least 2% and a payout ratio under 60%, which indicates that the dividend is sustainable.',
			pageTitle: 'Top-Rated Dividend Stocks'
		},
		query: {
			index: 'stocks',
			columns: ['s', 'n', 'dividendYield', 'price', 'change', 'marketCap'],
			filters: [
				'dividendYield-over-2',
				'analystRatings-is-Buy!Strong%Buy',
				'analystCount-over-20',
				'payoutRatio-under-60'
			]
		}
	},
	'monthly-dividend-stocks': {
		page: {
			metaTitle: 'List of Stocks That Pay Monthly Dividends',
			metaDescription: 'A list of dividend stocks that pay their shareholder each and every month.',
			pageDescription:
				'This list includes all the stocks that pay dividends every month and are listed on the NASDAQ, NYSE or NYSE American in the U.S.',
			pageTitle: 'Stocks That Pay Monthly Dividends',
			tableTitleObject: 'Monthly Payers'
		},
		query: {
			index: 'stocks',
			columns: ['s', 'n', 'dividendYield', 'price', 'change', 'marketCap'],
			filters: ['payoutFrequency-is-monthly']
		}
	},
	'most-employees': {
		page: {
			metaTitle: 'List of The Biggest Companies by Number of Employees',
			metaDescription:
				'A list of the biggest U.S. companies ranked by the total number of employees. This list is updated daily.',
			pageDescription:
				'These are the biggest U.S. companies ranked by the total number of employees, updated daily. These are companies based in the United States of America and listed on the stock exchange.',
			pageTitle: 'Biggest U.S. Companies by Employee Count',
			tableTitleObject: 'Companies'
		},
		query: {
			index: 'stocks',
			main: 'employees',
			count: 500,
			filters: ['country-is-United%States']
		}
	},
	'highest-revenue': {
		page: {
			metaTitle: 'The Biggest U.S.Companies by Revenue or Sales',
			metaDescription:
				'A list of the biggest U.S. companies ranked by the total sales or revenue in the past twelve months.',
			pageDescription:
				'These are the biggest U.S. companies ranked by total revenue or sales over the past 12 months. It includes companies based in the United States of America that can be publicly traded on the stock exchange.',
			pageTitle: 'Biggest U.S. Companies by Revenue',
			tableTitleObject: 'Companies'
		},
		query: {
			index: 'stocks',
			main: 'revenue',
			count: 500,
			filters: ['country-is-United%States']
		}
	},
	'oldest-companies': {
		page: {
			metaTitle: '100 Oldest Publicly Traded Companies',
			metaDescription:
				'A list of the top 100 oldest publicly traded companies, sorted by the year they were founded.',
			pageTitle: 'Oldest Publicly Traded Companies',
			tableTitleObject: 'Companies',
			noindex: true
		},
		query: {
			main: 'founded',
			count: 100,
			sort: [{ id: 'founded', desc: false }],
			sortDirection: 'asc',
			columns: ['rank', 's', 'n', 'founded', 'price', 'change', 'marketCap']
		}
	},
	'car-company-stocks': {
		page: {
			metaTitle: 'A List of Car Company Stocks, Ranked by Market Cap',
			metaDescription: 'A list of the biggest car company and automaker stocks, ranked by market capitalization.',
			pageDescription:
				'This is a list of the biggest car company and automaker stocks, ranked by market capitalization.',
			disclaimer:
				'Includes stocks from companies listed on the NASDAQ, NYSE and NYSE American in the United States, as well as several non-US stocks that can be traded over-the-counter. Market cap and stock price are updated hourly during regular trading hours.',
			pageTitle: 'Biggest Car Company Stocks'
		},
		query: {
			filters: ['tags-includes-car=company']
		}
	},
	'pharmaceutical-stocks': {
		page: {
			metaTitle: 'The Biggest Pharmaceutical Stocks by Market Cap',
			metaDescription: 'A list of the biggest pharmaceutical and drug company stocks, ranked by market cap.',
			pageTitle: 'Biggest Pharmaceutical Stocks'
		},
		query: {
			filters: ['industry-is-pharmaceuticals']
		}
	},
	'semiconductor-stocks': {
		page: {
			metaTitle: 'The Biggest Semiconductor Stocks by Market Cap',
			metaDescription: 'A list of the biggest semiconductor and chip manufacturing stocks, ranked by market cap.',
			pageTitle: 'Biggest Semiconductor Stocks'
		},
		query: {
			filters: ['industry-contains-semiconductors']
		}
	},
	'biotech-stocks': {
		page: {
			metaTitle: 'The Biggest Biotech Stocks by Market Cap',
			metaDescription: 'A list of the biggest publicly traded biotechnology companies, ranked by market cap.',
			pageTitle: 'Biggest Biotech Stocks'
		},
		query: {
			count: 100,
			filters: ['industry-is-biotechnology']
		}
	},
	'bank-stocks': {
		page: {
			metaTitle: '100 Biggest Bank Stocks by Market Cap',
			pageTitle: 'Biggest Bank Stocks'
		},
		query: {
			count: 100,
			filters: ['industry-is-banks']
		}
	},
	'social-media-stocks': {
		page: {
			metaTitle: 'A List of Social Media Company Stocks by Market Cap',
			pageTitle: 'Biggest Social Media Stocks by Market Cap',
			pageDescription:
				'This list includes stocks of companies who own social networks or have a significant percentage of their operations involved with social media.'
		},
		query: {
			filters: ['tags-includes-social=media']
		},
		etfQuery: {
			filters: ['tags-includes-social=media']
		} //,
		// relatedLists: [{ name: 'Online Dating', url: '/list/online-dating/' }]
	},
	'gaming-stocks': {
		page: {
			metaTitle: 'A List of Gaming Company Stocks by Market Cap',
			pageTitle: 'Biggest Gaming Stocks by Market Cap',
			pageDescription:
				'The biggest gaming company stocks, ranked by market cap. This list includes stocks of companies who get a significant percentage of their revenue from gaming or gaming-related products.',
			etfTitle: 'Gaming ETFs'
		},
		query: {
			filters: ['tags-includes-gaming']
		},
		etfQuery: {
			filters: ['tags-includes-gaming']
		},
		relatedLists: [
			{ name: 'Mobile Games', url: '/list/mobile-games/' },
			{ name: 'E-Sports', url: '/list/esports/' },
			{ name: 'Online Gambling', url: '/list/online-gambling' }
		]
	},
	esports: {
		page: {
			metaTitle: 'A List of E-Sports Stocks',
			pageTitle: 'Biggest E-Sports Stocks',
			pageDescription:
				'E-Sports stands for "Electronic Sports." It is a term for competition in video games, often over the internet but also via in-person events. Below is a list of stocks of companies involved in e-sports.'
		},
		query: {
			filters: ['tags-includes-esports']
		},
		etfQuery: {
			filters: ['tags-includes-esports']
		}
	},
	'online-gambling': {
		page: {
			metaTitle: 'A List of Online Gambling Stocks',
			pageTitle: 'Biggest Online Gambling Stocks'
		},
		query: {
			filters: ['tags-includes-online=gambling']
		}
	},
	'mobile-games': {
		page: {
			metaTitle: 'A List of Mobile Game Stocks',
			pageTitle: 'Biggest Mobile Game Stocks'
		},
		query: {
			filters: ['tags-includes-mobile=games']
		}
	}
	// },
	// 'online-dating': {
	// 	page: {
	// 		metaTitle: 'A List of Online Dating Stocks',
	// 		pageTitle: 'Biggest Online Dating Stocks'
	// 	},
	// 	query: {
	// 		filters: ['tags-includes-online=dating']
	// 	},
	// 	relatedLists: [{ name: 'Social Media', url: '/list/social-media-stocks/' }]
	// }
}
