import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { navState } from 'state/navState'
import { getAdsForPage } from './getAdsForPage'
import { startAdsAuction } from './startAdsAuction'

export function useLoadAds() {
	const path = navState((state) => state.path)
	const router = useRouter()

	function loadAds() {
		startAdsAuction(getAdsForPage(path))
	}

	useEffect(() => {
		// Load ads when the route has changed
		router.events.on('routeChangeComplete', loadAds)

		return () => {
			router.events.off('routeChangeComplete', loadAds)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
