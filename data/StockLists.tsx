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
			metaTitle: 'Top 500 Biggest Companies Ranked by Market Cap',
			pageTitle: 'Largest Companies by Market Cap'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }],
			controls: {
				export: true,
				columns: true
			},
			other: {
				showNumberColumn: true
			},
			columnOrder: ['number', 's', 'n', 'marketCap', 'price', 'change']
		},
		query: {
			index: 'stocks',
			main: 'marketCap',
			count: 500,
			sort: [{ id: 'marketCap', desc: true }],
			sortDirection: 'desc',
			columns: ['s', 'n', 'marketCap', 'price', 'change']
		}
	},
	'monthly-dividend-stocks': {
		page: {
			path: '/list/monthly-dividend-stocks/',
			metaTitle: 'List of Stocks That Pay Monthly Dividends',
			pageTitle: 'Monthly Dividend Payers'
		},
		fixed: {
			defaultSort: [{ id: 'marketCap', desc: true }],
			controls: {
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
	}
}
