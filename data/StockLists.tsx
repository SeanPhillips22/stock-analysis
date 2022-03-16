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
			defaultSort: [{ id: 'marketCap', desc: true }],
			controls: {
				filter: true,
				export: true,
				columns: true
			}
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
	'monthly-dividend-stocks': {
		page: {
			path: '/list/monthly-dividend-stocks/',
			metaTitle: 'List of Stocks That Pay Monthly Dividends',
			metaDescription:
				'A list of dividend stocks that pay their shareholder each and every month.',
			pageTitle: 'Stocks That Pay Monthly Dividends',
			tableTitleObject: 'Monthly Payers',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }],
			controls: {
				filter: true,
				export: true,
				columns: true
			}
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
	'biggest-car-companies': {
		page: {
			path: '/list/biggest-car-companies/',
			metaTitle: 'List of Biggest Car Companies by Market Cap',
			metaDescription:
				"A list of the world's biggest car companies and automakers, ranked by market cap.",
			pageTitle: 'Biggest Car Companies by Market Cap',
			tableTitleObject: 'Companies',
			headingType: 'div'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }],
			controls: {
				filter: true,
				export: true,
				columns: true
			}
		},
		query: {
			index: 'allstocks',
			main: 'marketCap',
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['rank', 's', 'n', 'price', 'change', 'marketCap'],
			filters: ['industry-isin-automobiles|auto%manufacturers']
		}
	}
}
