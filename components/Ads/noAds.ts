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
	return path.one ? NO_ADS.includes(path.one) : false
}
