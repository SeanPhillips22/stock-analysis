import { getAdsForPage } from './getAdsForPage'
import { splitUrl } from 'functions/helpers/splitUrl'

declare global {
	interface Window {
		adngin: any
	}
}

/**
 * Start the header bidding auction for the Snigel ads
 * @param ads an array of ad names to show on the page
 */
export function startAdsAuction(url: string) {
	let path = splitUrl(url)
	let ads = getAdsForPage(path)

	// Check if a) there are ads to display and b) the loader is ready
	if (ads.length > 0 && window.adngin && window.adngin.adnginLoaderReady) {
		// Remove unnecessary ads on desktop/mobile
		if (window.innerWidth) {
			if (window.innerWidth >= 768) {
				ads = ads.filter(ad => ad !== 'in-content_1_mobile')
			} else {
				ads = ads.filter(
					ad => ad === 'in-content_1_mobile' || ad === 'top_leaderboard'
				)
			}
		}

		// Start the ads auction
		window.adngin.queue.push(function () {
			window.adngin.cmd.startAuction(ads)
		})
	}
}
