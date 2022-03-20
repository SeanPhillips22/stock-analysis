import { TableDynamic, TableFixed } from 'components/StockTable/TableTypes'
import { PageConfig } from 'types/PageConfig'

type StockList = {
	[key: string]: {
		page: PageConfig
		fixed: TableFixed
		query: TableDynamic
	}
}

export const StockLists: StockList = {
	'biggest-companies': {
		page: {
			path: '/list/biggest-companies/',
			metaTitle: '500 Biggest Companies Ranked by Market Cap',
			metaDescription:
				'A list of the 500 biggest companies ranked by market cap, updated daily. This list includes public companies that can be traded in the U.S.',
			pageTitle: 'Biggest Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			count: 500,
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'marketCap', 'price', 'change']
		}
	},
	'top-rated-dividend-stocks': {
		page: {
			path: '/list/top-rated-dividend-stocks/',
			metaTitle: 'List of Dividend Stocks Rated as "Buy" or "Strong Buy"',
			metaDescription:
				'A list of dividend-paying stocks that have an average rating of "buy" or "strong buy" according to stock analysts.',
			pageDescription:
				'This list shows the top rated dividend stocks according to stock analysts. Each stock on the list has an average "buy" or "strong buy" rating from at least 20 analysts. Each stock also has a dividend yield of at least 2% and a payout ratio under 60%, which indicates that the dividend is sustainable.',
			pageTitle: 'Top-Rated Dividend Stocks',
			tableTitleObject: 'Stocks',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'stocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
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
			path: '/list/monthly-dividend-stocks/',
			metaTitle: 'List of Stocks That Pay Monthly Dividends',
			metaDescription: 'A list of dividend stocks that pay their shareholder each and every month.',
			pageTitle: 'Stocks That Pay Monthly Dividends',
			tableTitleObject: 'Monthly Payers',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'stocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['s', 'n', 'dividendYield', 'price', 'change', 'marketCap'],
			filters: ['payoutFrequency-is-monthly']
		}
	},
	'most-employees': {
		page: {
			path: '/list/most-employees/',
			metaTitle: 'List of The Biggest Companies by Number of Employees',
			metaDescription:
				'A list of the biggest public companies ranked by the total number of employees. This list is updated daily.',
			pageTitle: 'Biggest Companies by Employee Count',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'employees', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'employees',
			count: 100,
			sort: [{ id: 'employees', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'employees', 'price', 'change', 'marketCap']
		}
	},
	'highest-revenue': {
		page: {
			path: '/list/highest-revenue/',
			metaTitle: 'The Biggest Companies by Revenue or Sales',
			metaDescription:
				'A list of the biggest public companies ranked by the total sales or revenue in the past twelve months.',
			pageTitle: 'Biggest Companies by Revenue',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'revenue', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'revenue',
			count: 100,
			sort: [{ id: 'revenue', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'revenue', 'price', 'change', 'marketCap']
		}
	},
	// 'highest-earnings': {
	// 	page: {
	// 		path: '/list/highest-revenue/',
	// 		metaTitle: 'The Biggest Companies by Revenue or Sales',
	// 		metaDescription:
	// 			'A list of the biggest public companies ranked by the total sales or revenue in the past twelve months.',
	// 		pageTitle: 'Biggest Companies by Revenue',
	// 		tableTitleObject: 'Companies',
	// 		headingType: 'div'
	// 	},
	// 	fixed: {
	// 		defaultSort: [{ id: 'revenue', desc: true }]
	// 	},
	// 	query: {
	// 		index: 'allstocks',
	// 		main: 'revenue',
	// 		count: 100,
	// 		sort: [{ id: 'revenue', desc: true }],
	// 		sortDirection: 'desc',
	// 		columns: ['rank', 's', 'n', 'revenue', 'price', 'change', 'marketCap']
	// 	}
	// },
	// 'oldest-companies': {
	// 	page: {
	// 		path: '/list/oldest-companies/',
	// 		metaTitle: '100 Oldest Publicly Traded Companies',
	// 		metaDescription:
	// 			'A list of the top 100 oldest publicly traded companies, sorted by the year they were founded.',
	// 		pageTitle: 'Oldest Publicly Traded Companies',
	// 		tableTitleObject: 'Companies',
	// 		headingType: 'div'
	// 	},
	// 	fixed: {
	// 		defaultSort: [{ id: 'founded', desc: true }]
	// 	},
	// 	query: {
	// 		index: 'allstocks',
	// 		main: 'founded',
	// 		count: 100,
	// 		sort: [{ id: 'founded', desc: false }],
	// 		sortDirection: 'asc',
	// 		columns: ['rank', 's', 'n', 'founded', 'price', 'change', 'marketCap']
	// 	}
	// },
	'biggest-car-companies': {
		page: {
			path: '/list/biggest-car-companies/',
			metaTitle: 'List of The Biggest Car Companies by Market Cap',
			metaDescription: "A list of the world's biggest car companies and automakers, ranked by market cap.",
			pageTitle: 'Biggest Car Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-isin-automobiles|auto%manufacturers']
		}
	},
	'biggest-pharmaceutical-companies': {
		page: {
			path: '/list/biggest-pharmaceutical-companies/',
			metaTitle: 'The Biggest Pharmaceutical Companies by Market Cap',
			metaDescription: "A list of the world's biggest pharmaceutical and drug companies, ranked by market cap.",
			pageTitle: 'Biggest Pharmaceutical Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-is-pharmaceuticals']
		}
	},
	'biggest-semiconductor-companies': {
		page: {
			path: '/list/biggest-semiconductor-companies/',
			metaTitle: 'The Biggest Semiconductor Companies by Market Cap',
			metaDescription:
				"A list of the world's biggest semiconductor and chip manufacturing companies, ranked by market cap.",
			pageTitle: 'Biggest Semiconductor Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-contains-semiconductors']
		}
	},
	'biggest-biotech-companies': {
		page: {
			path: '/list/biggest-biotech-companies/',
			metaTitle: 'The Biggest Biotechnology Companies by Market Cap',
			metaDescription: 'A list of the biggest publicly traded biotechnology companies, ranked by market cap.',
			pageTitle: 'Biggest Biotech Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			count: 100,
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-is-biotechnology']
		}
	},
	'biggest-banks': {
		page: {
			path: '/list/biggest-banks/',
			metaTitle: '100 Biggest Banks by Market Cap',
			pageTitle: 'Biggest Banks by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			count: 100,
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-is-banks']
		}
	},
	'biggest-social-media-companies': {
		page: {
			path: '/list/biggest-social-media-companies/',
			metaTitle: 'The Biggest Social Media Companies by Market Cap',
			pageTitle: 'Biggest Social Media Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }]
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			count: 100,
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['tags-includes-social=media']
		}
	}
}
