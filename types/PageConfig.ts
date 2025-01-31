export type PageConfig = {
	path: string
	metaTitle: string
	pageTitle?: string
	tableTitle?: string
	tableTitleObject?: string // If you want to show something other than "X Stocks"
	active?: string
	metaDescription?: string
	pageDescription?: string
	disclaimer?: string
	headingType?: 'h1' | 'div' // Set the table heading as h1
	noindex?: boolean
	etfTitle?: string
}
