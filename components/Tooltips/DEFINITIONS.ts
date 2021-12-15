type MapItem = {
	id: string
	title: string
	tooltip: string
	formula?: string
}

export type MapProps = MapItem[]

export const DEFINITIONS: MapProps = [
	{
		id: 'sharesout',
		title: 'Implied Shares Outstanding',
		tooltip:
			"The total number of outstanding shares. If the company has more than one type of stock, then this number assumes that all types are converted into the current share class. This number is used to accurately calculate the company's market cap."
	}
]
