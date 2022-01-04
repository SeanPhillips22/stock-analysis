import { PathType } from 'types/Path'

export function getAdsForPage(path: PathType) {
	// Front page
	if (!path.one) {
		return ['top_leaderboard', 'in-content_1_mobile']
	}

	// IPO pages
	if (path.one === 'ipos') {
		if (path.two === 'calendar') {
			return ['top_leaderboard', 'in-content_1_mobile']
		}
		if (path.two === 'statistics') {
			return ['top_leaderboard', 'sidebar_1']
		}
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2']
	}

	if (path.one === 'screener') {
		return ['top_leaderboard']
	}

	// News and Actions pages
	if (path.one === 'news' || path.one === 'actions') {
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2']
	}

	// Stocks and ETF pages
	if (path.one === 'stocks' || path.one === 'etf') {
		// Index pages
		if (!path.two) {
			return ['top_leaderboard', 'sidebar_1', 'sidebar_2']
		}

		// Overview, statistics and company pages
		if (
			!path.three ||
			path.three === 'statistics' ||
			path.three === 'company'
		) {
			return ['top_leaderboard', 'sidebar_1', 'in-content_1_mobile']
		}

		// Dividend pages
		if (path.three === 'dividend') {
			return [
				'top_leaderboard',
				'sidebar_1',
				'sidebar_2',
				'in-content_1_mobile'
			]
		}

		// Holdings pages
		if (path.three === 'holdings') {
			return ['top_leaderboard', 'sidebar_1', 'sidebar_2']
		}
	}

	// Trending page
	if (path.one === 'trending') {
		return ['top_leaderboard', 'sidebar_1']
	}

	// Mostly article pages
	if (path.one !== 'stocks' && path.one !== 'etf') {
		return ['top_leaderboard', 'sidebar_1', 'sidebar_2']
	}

	// Default
	return ['top_leaderboard']
}
