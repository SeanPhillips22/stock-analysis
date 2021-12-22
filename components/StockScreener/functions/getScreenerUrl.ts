export function getScreenerUrl(type: string) {
	if (type === 'ipo') return 'iposcreener'
	if (type === 'etf') return 'etfscreener'
	return 'screener'
}
