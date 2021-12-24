export type ChartDataPoint = {
	t: string
	c: number
	o?: number
}

export type ChartDataPayload = {
	updated: number
	data: ChartDataPoint[]
}
