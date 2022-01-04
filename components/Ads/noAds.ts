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

// TODO remove test page
const NO_ADS_RELAXED = [
	'login',
	'pro',
	'contact',
	'terms-of-use',
	'apis',
	'subscribe',
	'aapltest'
]

export function noAds(path: string | null) {
	return path ? NO_ADS.includes(path) : false
}

export function noAdsRelaxed(path: string | null) {
	return path ? NO_ADS_RELAXED.includes(path) : false
}
