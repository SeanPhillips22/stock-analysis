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
	return path.one ? NO_ADS.includes(path.one) : false
}

export function isDev() {
	return process.env.NODE_ENV === 'development'
}
