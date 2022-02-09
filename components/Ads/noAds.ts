import { PathType } from 'types/Path'

const NO_ADS = [
	'about',
	'login',
	'pro',
	'contact',
	'privacy-policy',
	'terms-of-use',
	'apis',
	'subscribe'
]

export function noAds(path: PathType) {
	if (process.env.NODE_ENV === 'development') return true
	if (path.one === 'stocks' && path.two === 't') return true // exclude ads on T, for benchmarking purposes
	return path.one ? NO_ADS.includes(path.one) : false
}
