import { Info } from './Info'

export type Targets = {
	average: number // the average price target
	median: number // the median price target
	low: number // the lowest price target
	high: number // the highest price target
	updated: string // the last time the price target was updated
	chart: { t: string; c: number | null }[] // t: 2020-12-1 || the final item has null instead of price
}

export type Recommendations = {
	total: number // need to calculate on storage
	consensus: string // need to calculate on storage
	angle: number // the angle of the donut chart arrow, from 0-180
	score: number
	buy: number
	hold: number
	month: string // '2022-02-01',
	sell: number
	strongBuy: number
	strongSell: number
}

export type ForecastData = {
	targets: Targets
	recommendations: Recommendations[]
}

export type Forecast = {
	info: Info
	data: {
		targets: Targets
		recommendations: Recommendations[]
	}
}
