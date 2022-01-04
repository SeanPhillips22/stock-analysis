import { validateUrlBit } from 'functions/validation'
import { PathType } from 'types/Path'

/**
 * This function splits a URL path into individual bits
 * @param url a url path, without the hostname (/stocks/aapl/financials/)
 * @returns
 */
export function splitUrl(url: string): PathType {
	const split = url.split('/')
	const one = validateUrlBit(split[1])
	const two = validateUrlBit(split[2])
	const three = validateUrlBit(split[3])
	const four = validateUrlBit(split[4])
	const five = validateUrlBit(split[5])

	return {
		one,
		two,
		three,
		four,
		five
	}
}
