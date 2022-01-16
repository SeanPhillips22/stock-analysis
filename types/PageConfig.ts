export type PageConfig = {
	path: string
	title: string
	parentTitle?: string
	active?: string
	controls?: {
		range?: boolean
		results?: boolean
		filter?: boolean
		export?: boolean
		columns?: boolean
	}
	metaTitle: string
	metaDescription?: string
}
