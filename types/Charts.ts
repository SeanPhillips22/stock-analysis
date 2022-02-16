export type ChartDataPoint = {
	t: string
	c?: number
	o?: number
}

export type InitialData = {
	data: ChartDataPoint[]
	expiration: number | undefined
}
