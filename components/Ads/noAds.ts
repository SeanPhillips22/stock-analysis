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

export function noAds(path: string | null) {
	if (process.env.NODE_ENV === 'development') return true
	return path ? NO_ADS.includes(path) : false
}
